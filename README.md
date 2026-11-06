# 数据科学与数字人文

苏州大学历史文化学院课程资源。课程由 12 个方法模块和 1 个综合项目组成，贯穿可复现、案例真实与研究伦理。

**站点入口：**[数据科学与数字人文 · GitHub Pages](https://dsdh-python.github.io/DSDH/)

**GitHub 仓库：**[DSDH-Python/DSDH](https://github.com/DSDH-Python/DSDH)

## 教材与站点

| 资源 | 路径 | 说明 |
|---|---|---|
| 章节 HTML 源页面 | `HTML教材/` | 13 章教材门户、章节页、9 款模块游戏及破冰游戏；这是 HTML 教材的编辑源目录 |
| 配图与图表 | `assets/dsdh/` | 章节图片和原创教学图；HTML 页面通过相对路径引用 |
| MkDocs 站点内容 | `assets/` | 站点首页、游戏目录、历史 Markdown 页面及教材配图 |
| MkDocs 配置 | `mkdocs.yml` | 站点主题、左侧导航和 Pages 基础地址 |
| 站点依赖 | `requirements-site.txt` | 固定版本的 MkDocs 与 Material 主题 |
| 静态资源准备脚本 | `scripts/prepare_site_assets.py` | 从教材、游戏和图片源生成站点所需副本 |
| GitHub Pages 工作流 | `.github/workflows/deploy-pages.yml` | 在 `main` 推送或手动触发时构建并部署站点 |
| 单文件翻页预览 | `课程导入/数据科学与数字人文_互动翻页教材.html` | 可直接在浏览器打开的交互翻页版本 |
| 实验教材预览 | `数字人文实验_教材预览.html` | 另一套《数字人文实验》教材内容 |
| 教材 PDF | `数据科学与数字人文_教材_V2.2.pdf` | 离线阅读版本 |

站点首页展示课程体系；左侧“教材目录”列出 13 章，另有课堂游戏中心。静态教材构建到站点的 `教材/` 路径，配图发布到 `assets/dsdh/`。

## 编辑与预览

- 更新 HTML 教材：编辑 `HTML教材/chNN.html`；新增或替换图片放入 `assets/dsdh/`，使用相对路径引用。不要编辑生成到 `assets/教材/` 的副本。
- 更新课程首页或左侧导航：编辑 `assets/index.md` 和 `mkdocs.yml`。
- 原 `src/` 中的 13 篇 Markdown 源稿已移除；它们与 HTML 教材、MkDocs 首页是独立内容，不能从现有页面自动同步或还原。如需原稿，可从 Git 历史找回。
- 生成站点：先准备静态资源，再构建 MkDocs。

Windows PowerShell 示例：

```powershell
python -m pip install -r requirements-site.txt
python scripts/prepare_site_assets.py
python -m mkdocs build --strict
python -m http.server 8000 --directory site
```

本地预览地址为 `http://localhost:8000/`。`site/` 是构建产物；`assets/教材/`、`assets/assets/dsdh/` 和 `assets/games/` 是准备脚本生成的副本，均不需要提交。清理后按上述命令重新生成。

## 发布到 GitHub Pages

工作流 `.github/workflows/deploy-pages.yml` 监听 `main` 分支推送，并支持 GitHub Actions 手动运行。仓库管理员应在 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**，避免分支发布与 MkDocs 工作流同时部署不同的站点内容。部署状态可在 [Actions](https://github.com/DSDH-Python/DSDH/actions) 查看。更新后如果仍看到旧页面或 404，可先强制刷新浏览器，或用无痕窗口检查。

## 课堂游戏

模块二至模块十各有一款 HTML5 游戏，涵盖数据获取、可复现流程、文本分析、可视化修辞、关系网络、空间分析、图像处理、知识图谱与模型评估。游戏中心位于 `assets/games.md`；游戏源文件位于 `HTML教材/`，修改后运行准备脚本生成 `assets/games/` 中的游戏中心副本，保留原有游戏网址。
