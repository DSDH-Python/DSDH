from pathlib import Path
from shutil import copytree

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

copytree(ROOT / "HTML教材", DOCS / "教材", dirs_exist_ok=True)
copytree(ROOT / "assets" / "dsdh", DOCS / "assets" / "dsdh", dirs_exist_ok=True)

print("Prepared HTML textbook and image assets for MkDocs.")
