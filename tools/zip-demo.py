# Rebuild ../naija-area-demo.zip from demo-static (zip is not always installed). Usage: npm run build:demo && python3 tools/zip-demo.py
import zipfile, os, sys
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); src = os.path.join(root, 'demo-static'); out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, '..', 'naija-area-demo.zip')  # optional first argument: another output path (used by the track-f worktree so it does not overwrite master's zip)
names = []
for d, _, fs in os.walk(src):
    for f in fs: names.append(os.path.relpath(os.path.join(d, f), src))
with zipfile.ZipFile(out + '.new', 'w', zipfile.ZIP_DEFLATED) as z:
    for n in sorted(names): z.write(os.path.join(src, n), n)
os.replace(out + '.new', out); print('wrote', os.path.abspath(out), len(names), 'files', os.path.getsize(out) // 1024, 'KB')
