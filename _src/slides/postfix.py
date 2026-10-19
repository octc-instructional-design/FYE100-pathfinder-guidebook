"""Mark every shape or picture whose name starts with "Decorative:" as decorative
(PowerPoint's "Mark as decorative"), so screen readers skip it. Usage: postfix.py deck.pptx"""
import re, sys, zipfile, shutil, os

EXT = ('<a:extLst><a:ext uri="{C183D7F6-B498-43B3-948B-1728B52AA6E4}">'
       '<adec:decorative xmlns:adec="http://schemas.microsoft.com/office/drawing/2017/decorative" val="1"/>'
       '</a:ext></a:extLst>')

def fix(xml):
    n = 0
    def self_closing(m):
        nonlocal n; n += 1
        attrs = re.sub(r'\s+descr="[^"]*"', '', m.group(1))
        return f'<p:cNvPr{attrs}>{EXT}</p:cNvPr>'
    xml = re.sub(r'<p:cNvPr((?:(?!/>)[^>])*name="Decorative:[^"]*"[^>]*?)/>', self_closing, xml)
    def open_tag(m):
        nonlocal n
        if 'adec:decorative' in m.group(2): return m.group(0)
        n += 1
        attrs = re.sub(r'\s+descr="[^"]*"', '', m.group(1))
        return f'<p:cNvPr{attrs}>{m.group(2)}{EXT}</p:cNvPr>'
    xml = re.sub(r'<p:cNvPr((?:\s+\w+="[^"]*")*?\s+name="Decorative:[^"]*"(?:\s+\w+="[^"]*")*)>(.*?)</p:cNvPr>', open_tag, xml, flags=re.S)
    return xml, n

path = sys.argv[1]; tmp = path + '.tmp'
total = 0
with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if re.match(r'ppt/slides/slide\d+\.xml$', item.filename):
            x, n = fix(data.decode('utf-8')); total += n; data = x.encode('utf-8')
        zout.writestr(item, data)
shutil.move(tmp, path)
print(f'marked {total} decorative objects')
