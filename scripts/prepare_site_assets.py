from pathlib import Path
from shutil import copy2, copytree

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "assets"
TEXTBOOK = ROOT / "HTML教材"
GAMES = {
    "模块二_寻数大冒险.html": "m02_xunshu.html",
    "模块三_可复现流水线.html": "m03_liushuixian.html",
    "模块四_分词实体宾果.html": "m04_fenci.html",
    "模块五_修辞法庭.html": "m05_xiucifating.html",
    "模块六_关系织网.html": "m06_guanxizhiwang.html",
    "模块七_行迹绘图.html": "m07_xingjihuitu.html",
    "模块八_碑帖复活.html": "m08_beitiefuhuo.html",
    "模块九_本体拼装.html": "m09_bentipinzhuang.html",
    "模块十_模型审判.html": "m10_moxingshenpan.html",
}

copytree(TEXTBOOK, DOCS / "教材", dirs_exist_ok=True)
copytree(ROOT / "assets" / "dsdh", DOCS / "assets" / "dsdh", dirs_exist_ok=True)
games_dir = DOCS / "games"
games_dir.mkdir(parents=True, exist_ok=True)
for source, destination in GAMES.items():
    copy2(TEXTBOOK / source, games_dir / destination)

print("Prepared HTML textbook, games, and image assets for MkDocs.")
