# Book search: builds two section-level indexes from the finished site.
# search-index.json (site root) holds student pages; the student search loads only that file.
# chapters/instructor/search-instructor.json holds the Instructor Guide; only the instructor search loads it.
import json, re
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:  # the search index is optional; the rest of the book still builds
    BeautifulSoup = None

SKIP = {'search.html'}

def _clean(t):
    return re.sub(r'\s+', ' ', t).strip()

def _loc(soup, kind):
    c = soup.select('nav.crumbs li')
    parts = [_clean(li.get_text(' ')) for li in c[1:]]  # drop Home
    if not parts:
        return 'Instructor Guide' if kind == 'i' else 'Pathfinder Guidebook'
    return ' · '.join(parts)

def page_entries(path, rel, kind):
    html = path.read_text(encoding='utf-8')
    if 'http-equiv="refresh"' in html:
        return []
    soup = BeautifulSoup(html, 'html.parser')
    main = soup.find('main')
    if not main:
        return []
    h1 = main.find('h1') or soup.find('h1')
    title = _clean(h1.get_text(' ')) if h1 else _clean(soup.title.get_text()).split('|')[0].strip()
    loc = _loc(soup, kind)
    for t in main.select('script, style, nav, svg, button, form.isearch-sm, form.isearch, h1, .pagenav, .mm-actions, .sr-only, .skillbar, .lesson-kicker, .lesson-meta, .chapter-kicker'):
        t.decompose()
    out = []
    secs = main.find_all('section', id=True)
    if secs:
        first = []
        for el in main.children:
            if getattr(el, 'name', None) == 'section' and el.get('id'):
                break
            if getattr(el, 'get_text', None):
                first.append(el.get_text(' '))
        lead = _clean(' '.join(first))
        if lead:
            out.append(dict(u=rel, t=title, s='', l=loc, k=kind, x=lead[:4000]))
        for s in secs:
            if s.find_parent('section', id=True):
                continue  # nested sections are covered by their parent
            h = s.find(['h2', 'h3'])
            head = _clean(h.get_text(' ')) if h else ''
            txt = _clean(s.get_text(' '))
            if txt:
                out.append(dict(u=f'{rel}#{s["id"]}', t=title, s=head, l=loc, k=kind, x=txt[:6000]))
    else:
        txt = _clean(main.get_text(' '))
        if txt:
            out.append(dict(u=rel, t=title, s='', l=loc, k=kind, x=txt[:8000]))
    return out

def build_index(root):
    if BeautifulSoup is None:
        print('search index skipped: bs4 not installed')
        return
    stu, ins = [], []
    for p in sorted((root/'chapters').rglob('*.html')):
        if p.name in SKIP:
            continue
        rel = p.relative_to(root).as_posix()
        kind = 'i' if p.parent.name == 'instructor' else 's'
        (ins if kind == 'i' else stu).extend(page_entries(p, rel, kind))
    d = root/'chapters/instructor'
    old = d/'search-student.json'
    if old.exists(): old.unlink()
    (root/'search-index.json').write_text(json.dumps(stu, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    (d/'search-instructor.json').write_text(json.dumps(ins, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'search index: {len(stu)} student sections, {len(ins)} instructor sections')

ICON_SEARCH = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>'

def mini_form():
    """A quiet search box for the top of Instructor Guide pages."""
    return f'''    <form class="isearch-sm" action="search.html" method="get" role="search" aria-label="Search the book">
      <label for="isq-sm" class="sr-only">Search the book and this guide</label>
      <input id="isq-sm" name="q" type="search" placeholder="Search the book" autocomplete="off" spellcheck="false">
      <button type="submit">{ICON_SEARCH}<span class="sr-only">Search</span></button>
    </form>
'''

def form(value='', label='Search the whole book and this guide', ph='Try gradebook, SIFT, or Merit'):
    return f'''    <form class="isearch" action="search.html" method="get" role="search" aria-label="Search the book">
      <label for="isq">{label}</label>
      <div class="isearch-row">
        <input id="isq" name="q" type="search" value="{value}" placeholder="{ph}" autocomplete="off" spellcheck="false">
        <button type="submit">Search</button>
      </div>
    </form>
'''

def page_body():
    return form() + '''
    <fieldset class="isearch-filter">
      <legend>Show</legend>
      <label><input type="radio" name="isk" value="all" checked> Everything</label>
      <label><input type="radio" name="isk" value="s"> Student pages</label>
      <label><input type="radio" name="isk" value="i"> Instructor Guide</label>
    </fieldset>
    <p class="isearch-status" id="iss" role="status" aria-live="polite"></p>
    <ol class="isearch-results" id="isr" data-files="../../search-index.json,search-instructor.json" data-tags="1"></ol>
    <noscript><p>Search needs JavaScript. You can still browse the guide from the menu.</p></noscript>
'''

def student_body():
    return form(label='Search the book', ph='Try financial aid, SIFT, or Success Coach').replace('class="isearch"', 'class="isearch isearch-student"') + '''
    <p class="isearch-status" id="iss" role="status" aria-live="polite"></p>
    <ol class="isearch-results" id="isr" data-files="../../search-index.json" data-tags="0"></ol>
    <noscript><p>Search needs JavaScript. You can still find everything from Book Contents.</p></noscript>
'''

def bar_link(up):
    """The search button in the top bar on student pages, styled like Home and How to use."""
    icon = ICON_SEARCH.replace('width="16" height="16"', 'width="18" height="18"')
    return f'      <a class="bar-btn" href="{up}chapters/help/search.html">{icon}<span class="bar-lbl">Search</span></a>\n'
