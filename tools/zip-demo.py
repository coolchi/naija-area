# Rebuild ../naija-area-demo.zip from demo-static (zip is not always installed). Usage: npm run build:demo && python3 tools/zip-demo.py
import zipfile, os
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); src = os.path.join(root, 'demo-static'); out = os.path.join(root, '..', 'naija-area-demo.zip')
names = []
for d, _, fs in os.walk(src):
    for f in fs: names.append(os.path.relpath(os.path.join(d, f), src))
with zipfile.ZipFile(out + '.new', 'w', zipfile.ZIP_DEFLATED) as z:
    for n in sorted(names): z.write(os.path.join(src, n), n)
os.replace(out + '.new', out); print('wrote', os.path.abspath(out), len(names), 'files', os.path.getsize(out) // 1024, 'KB')
