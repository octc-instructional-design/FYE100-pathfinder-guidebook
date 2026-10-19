"""Offline exports of the Pathfinder Guidebook: an accessible EPUB 3 and a single HTML
file that Playwright prints to a tagged PDF. Reads the built site pages, so it always
matches what's live."""
import re, sys, html, zipfile, datetime, pathlib, importlib.util, copy
from bs4 import BeautifulSoup, NavigableString

HERE = pathlib.Path(__file__).parent
spec = importlib.util.spec_from_file_location('b', HERE / 'build2.py'); B = importlib.util.module_from_spec(spec); spec.loader.exec_module(B)
ROOT = B.ROOT
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else HERE / 'export'); OUT.mkdir(parents=True, exist_ok=True)
SITE = 'https://octc-instructional-design.github.io/FYE100-pathfinder-guidebook/'
TITLE = 'Pathfinder Guidebook: FYE 100 Strategies for College Success'
# Units, in reading order: How to Use This Book, the 12 modules, then the two student guides.
# The Instructor Guide stays online only.
STUDENT_GUIDES = ('merit', 'start')
UNITS = [dict(dir='chapters/help', key='help', head='How to Use This Book', kicker=None, src=None)]
for ch in B.CHAPTERS:
    UNITS.append(dict(dir=f"chapters/ch{ch['n']:02d}", key=f"ch{ch['n']:02d}", head=f"Module {ch['n']}: {ch['title']}",
                      kicker=f"Module {ch['n']}", src=ch, es=ch['es'], es_label='10 Essential Skills in this module', module=True))
for g in B.GUIDES:
    if g['slug'] in STUDENT_GUIDES:
        UNITS.append(dict(dir=f"chapters/{g['slug']}", key=g['slug'], head=g['title'], kicker='Guide', src=g, es=[], module=False))

# ---------------------------------------------------------------- page list
pages = []   # (key, unit index, relpath, title)
for u_i, u in enumerate(UNITS):
    d, k = u['dir'], u['key']
    pages.append((f'{k}-index', u_i, f'{d}/index.html', u['head']))
    for l in (u['src']['lessons'] if u['src'] else []):
        f, num, t = l[0], l[1], l[2]
        title = f'{num} {t}' if u.get('module') and num not in B.SPECIAL else t
        pages.append((f'{k}-{f[:-5]}', u_i, f'{d}/{f}', title))
KEY = {p[2]: p[0] for p in pages}

def clean_text(s):
    return re.sub(r'<[^>]+>', '', s).replace('&amp;', '&')

def resolve(frm, href):
    """Map an internal site link to (page key, fragment) or None."""
    base, _, frag = href.partition('#')
    if not base: return KEY[frm], frag
    p = (pathlib.PurePosixPath(frm).parent / base)
    parts = []
    for seg in p.parts:
        if seg == '..': parts.pop()
        elif seg != '.': parts.append(seg)
    rel = '/'.join(parts)
    if rel.endswith('/') or not rel.endswith('.html'): rel = rel.rstrip('/') + '/index.html'
    if rel in KEY: return KEY[rel], frag
    return None

def extract(relpath, mode):
    """Return cleaned <main> soup for one page. mode = 'epub' or 'pdf'."""
    soup = BeautifulSoup((ROOT / relpath).read_text(), 'html.parser')
    main = soup.find('main')
    main.name = 'section'; main.attrs = {}
    for sel in ['.skillbar.slim', 'nav.crumbs', 'nav.pagenav', '.jump-btn', '.start-row', '.rest', '.banner-art',
                '.mm-actions', '.mm-how', '.mm-err', '.mm-print-title', 'script', '.draft-flag', '.in-course']:
        for el in main.select(sel): el.decompose()
    for el in main.select('.sr-only'):
        if 'opens in a new tab' in el.get_text(): el.decompose()
    for svg in main.find_all('svg'): svg.decompose()   # all icons are decorative (aria-hidden)
    # the lesson list on openers keeps titles only
    for ol in main.select('ol.lessons'):
        items = []
        for li in ol.find_all('li', recursive=False):
            num = li.select_one('.lesson-num'); h = li.find('h3'); sub = li.find('p')
            n_ = num.get_text(strip=True) if num else ''
            items.append(f'<li><strong>{n_ + " " if n_[:1].isdigit() else n_ + ": "}{h.decode_contents()}</strong>'
                         + (f'<br/><span class="small">{sub.decode_contents()}</span>' if sub else '') + '</li>')
        ol.replace_with(BeautifulSoup('<ol class="lesson-list">' + ''.join(items) + '</ol>', 'html.parser'))
    for el in main.select('.lesson-meta, .progress'): el.decompose()
    # forms
    for form in main.select('form'):
        if mode == 'epub':
            note = soup.new_tag('div', attrs={'class': 'offline-note'})
            note.append(BeautifulSoup(
                f'<p><strong>This part is a fill-in form on the website.</strong> Online, it saves your answers and turns them into a PDF. '
                f'Open it at <a href="{SITE}{relpath}#form">{SITE}{relpath}</a>, or answer the questions above on paper.</p>', 'html.parser'))
            form.replace_with(note)
        else:
            form.name = 'div'; form.attrs = {'class': 'paper-form'}
            for t in form.find_all('textarea'):
                rows = int(t.get('rows', 4)); t.replace_with(BeautifulSoup(f'<div class="write" style="height:{rows*1.6:.1f}em"></div>', 'html.parser'))
            for i in form.find_all('input'):
                i.replace_with(BeautifulSoup('<div class="write" style="height:1.8em"></div>', 'html.parser'))
            for s in form.find_all('select'):
                opts = [o.get_text() for o in s.find_all('option') if o.get('value', 'x') != '']
                s.replace_with(BeautifulSoup('<p class="circle">Circle one: ' + ' &#160;/&#160; '.join(opts) + '</p>', 'html.parser'))
            for f in form.find_all(['fieldset']): f.name = 'div'; f['class'] = f.get('class', []) + ['fs']
            for lg in form.find_all('legend'): lg.name = 'p'; lg['class'] = ['legend']
            for lb in form.find_all('label'): lb.name = 'p'; lb.attrs = {'class': 'label'}
    # paragraphs that only make sense online
    for p in main.select('p.mm-paper'):
        if 'fill-in form' in p.get_text():
            p.string = ('Offline copy: the fill-in version of this form is on the website. Write your answers on paper '
                        'or in the space provided, then upload a photo or scan.' if mode == 'pdf' else
                        'The fill-in version of this form is on the website.')
    # links
    key = KEY[relpath]
    for a in main.find_all('a', href=True):
        h = a['href']
        a.attrs = {'href': h}
        if re.match(r'https?:|mailto:', h): continue
        r = resolve(relpath, h)
        if not r:
            a.unwrap(); continue
        k, frag = r
        if mode == 'epub':
            a['href'] = f'{k}.xhtml' + (f'#{frag}' if frag else '')
        else:
            a['href'] = '#' + (f'{k}--{frag}' if frag else k)
    # ids unique per page in the PDF
    if mode == 'pdf':
        for el in main.find_all(attrs={'id': True}): el['id'] = f"{key}--{el['id']}"
        for el in main.find_all(attrs={'aria-labelledby': True}): el['aria-labelledby'] = f"{key}--{el['aria-labelledby']}"
        for el in main.find_all(attrs={'aria-describedby': True}): del el['aria-describedby']
    # images
    for img in main.find_all('img'):
        src = img['src']; name = src.split('/')[-1]
        img['src'] = f'images/{name}'
        img.attrs.pop('width', None); img.attrs.pop('height', None)
    return main

def opener_head(u):
    src = u['src']
    out = (f'<header class="mod-head"><p class="mod-num">{u["kicker"]}</p><h1>{src["title"]}</h1>'
           f'<p class="tagline">{src["tagline"]}</p>')
    if u['es']:
        out += (f'<p class="es-h">{u["es_label"]}</p><ul class="es-list">'
                + ''.join(f'<li><img src="images/10es-{k:02d}.png" alt="" class="coin-img"/> #{k} {B.ESSENTIAL[k]}</li>' for k in u['es'])
                + '</ul>')
    return out + '</header>'

def page_body(p, mode):
    key, u_i, rel, title = p
    u = UNITS[u_i]
    main = extract(rel, mode)
    if rel.endswith('index.html') and u['src']:
        # the opener's hero sits outside <main>; rebuild a plain heading (the help page has its own h1)
        main.insert(0, BeautifulSoup(opener_head(u), 'html.parser'))
    return main

CSS = pathlib.Path(HERE / 'export.css').read_text()

# ---------------------------------------------------------------- EPUB
def xhtml(title, body):
    body = body.replace('&nbsp;', '&#160;')
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en" xml:lang="en">
<head><meta charset="UTF-8"/><title>{html.escape(title)}</title><link rel="stylesheet" type="text/css" href="book.css"/></head>
<body>
{body}
</body>
</html>
'''

def to_xhtml(soup):
    s = str(soup)
    s = re.sub(r'<(img|br|hr|input|meta|link)([^>]*?)(?<!/)>', r'<\1\2/>', s)
    s = re.sub(r'\s(hidden|novalidate|required|defer|open)(?=[\s/>])', r' \1="\1"', s)
    return s

def build_epub():
    items, spine, navli = [], [], []
    imgs = set()
    cover = f'''<section class="title-page" epub:type="titlepage">
<p><img src="images/owensboro-logo-horizontal-gold.png" alt="Owensboro Community &amp; Technical College"/></p>
<h1>Pathfinder Guidebook</h1>
<p class="tagline">FYE 100: Strategies for College Success</p>
<p>Owensboro Community &amp; Technical College</p>
<p class="small">Offline edition. The online guidebook, with fill-in forms, is at <a href="{SITE}">{SITE}</a>. Due dates and points are in Blackboard.</p>
</section>'''
    items.append(('title', 'Title page', cover)); imgs.add('owensboro-logo-horizontal-gold.png')
    cur = None; has_kids = False
    for p in pages:
        key, n, rel, title = p
        m = page_body(p, 'epub')
        for img in m.find_all('img'): imgs.add(img['src'].split('/')[-1])
        body = to_xhtml(m)
        if not rel.endswith('index.html'):
            body = body.replace('<section>', '<section>', 1)
        items.append((key, clean_text(title), body))
        if n != cur:
            if cur is not None: navli.append('</ol></li>' if has_kids else '</li>')
            navli.append(f'<li><a href="{key}.xhtml">{UNITS[n]["head"]}</a>'); cur = n; has_kids = False
        else:
            if not has_kids: navli.append('<ol>'); has_kids = True
            navli.append(f'<li><a href="{key}.xhtml">{title}</a></li>')
    navli.append('</ol></li>' if has_kids else '</li>')
    nav = f'''<nav epub:type="toc" id="toc" role="doc-toc"><h1>Contents</h1><ol>
<li><a href="title.xhtml">Title page</a></li>
{''.join(navli)}
</ol></nav>
<nav epub:type="landmarks" hidden="hidden"><h2>Landmarks</h2><ol>
<li><a epub:type="toc" href="nav.xhtml">Contents</a></li>
<li><a epub:type="bodymatter" href="{pages[0][0]}.xhtml">Start of content</a></li>
</ol></nav>'''
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    manifest = ['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
                '<item id="css" href="book.css" media-type="text/css"/>']
    for k, t, _ in items:
        manifest.append(f'<item id="{k}" href="{k}.xhtml" media-type="application/xhtml+xml"/>')
    for i, im in enumerate(sorted(imgs)):
        mt = {'svg': 'image/svg+xml', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'gif': 'image/gif', 'webp': 'image/webp'}.get(im.rsplit('.', 1)[-1].lower(), 'image/png')
        manifest.append(f'<item id="img{i}" href="images/{im}" media-type="{mt}"/>')
    spine = ''.join(f'<itemref idref="{k}"/>' + ('<itemref idref="nav"/>' if k == 'title' else '') for k, _, _ in items)
    opf = f'''<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" prefix="rendition: http://www.idpf.org/vocab/rendition/#" unique-identifier="bookid" xml:lang="en">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">urn:octc:fye100:pathfinder-guidebook</dc:identifier>
<dc:title>{TITLE}</dc:title>
<dc:language>en</dc:language>
<dc:creator>Owensboro Community &amp; Technical College</dc:creator>
<dc:publisher>Owensboro Community &amp; Technical College</dc:publisher>
<meta property="dcterms:modified">{now}</meta>
<meta property="rendition:spread">none</meta>
<meta property="schema:accessMode">textual</meta>
<meta property="schema:accessMode">visual</meta>
<meta property="schema:accessModeSufficient">textual</meta>
<meta property="schema:accessibilityFeature">structuralNavigation</meta>
<meta property="schema:accessibilityFeature">tableOfContents</meta>
<meta property="schema:accessibilityFeature">readingOrder</meta>
<meta property="schema:accessibilityFeature">alternativeText</meta>
<meta property="schema:accessibilityFeature">displayTransformability</meta>
<meta property="schema:accessibilityHazard">none</meta>
<meta property="schema:accessibilitySummary">Reflowable text with a navigable table of contents, headings for every section, and text alternatives for meaningful images. Skill icons are decorative; each skill is always named in text. Interactive fill-in forms from the online edition are replaced with a note and a link.</meta>
<link rel="dcterms:conformsTo" href="http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa"/>
<meta property="dcterms:conformsTo">EPUB Accessibility 1.1 - WCAG 2.1 Level AA</meta>
</metadata>
<manifest>
{chr(10).join(manifest)}
</manifest>
<spine>{spine}</spine>
</package>'''
    path = OUT / 'Pathfinder-Guidebook-FYE100.epub'
    with zipfile.ZipFile(path, 'w') as z:
        z.writestr(zipfile.ZipInfo('mimetype'), 'application/epub+zip', compress_type=zipfile.ZIP_STORED)
        z.writestr('META-INF/container.xml', '''<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>''', compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/content.opf', opf, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/nav.xhtml', xhtml('Contents', nav), compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/book.css', CSS, compress_type=zipfile.ZIP_DEFLATED)
        for k, t, body in items:
            z.writestr(f'OEBPS/{k}.xhtml', xhtml(t, body), compress_type=zipfile.ZIP_DEFLATED)
        for im in imgs:
            src = next(ROOT.glob(f'images/**/{im}'))
            z.write(src, f'OEBPS/images/{im}', compress_type=zipfile.ZIP_DEFLATED)
    return path

# ---------------------------------------------------------------- single HTML for PDF
def build_print_html():
    parts = [f'''<section class="title-page"><p><img src="images/owensboro-logo-horizontal-gold.png" alt="Owensboro Community &amp; Technical College"></p>
<h1>Pathfinder Guidebook</h1><p class="tagline">FYE 100: Strategies for College Success</p>
<p class="small">Offline edition. The online guidebook, with fill-in forms, is at <a href="{SITE}">{SITE}</a>. Due dates and points are in Blackboard.</p></section>''']
    toc = ['<nav class="toc-print" aria-labelledby="toc-h"><h1 id="toc-h">Contents</h1><ol>']
    cur = None; has_kids = False
    for p in pages:
        key, n, rel, title = p
        if n != cur:
            if cur is not None: toc.append('</ol></li>' if has_kids else '</li>')
            toc.append(f'<li><a href="#{key}">{UNITS[n]["head"]}</a>'); cur = n; has_kids = False
        else:
            if not has_kids: toc.append('<ol>'); has_kids = True
            toc.append(f'<li><a href="#{key}">{title}</a></li>')
    toc.append(('</ol></li>' if has_kids else '</li>') + '</ol></nav>')
    parts.append(''.join(toc))
    for p in pages:
        key, n, rel, title = p
        m = page_body(p, 'pdf'); m['id'] = key; m['class'] = 'page'
        parts.append(str(m))
    html = f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>{TITLE}</title>
<style>{CSS}</style></head><body class="print">{''.join(parts)}</body></html>'''
    (OUT / 'images').mkdir(exist_ok=True)
    for img in re.findall(r'src="images/([^"]+)"', html):
        src = next(ROOT.glob(f'images/**/{img}')); (OUT / 'images' / img).write_bytes(src.read_bytes())
    path = OUT / 'print.html'; path.write_text(html)
    return path

if __name__ == '__main__':
    print(build_epub()); print(build_print_html())
