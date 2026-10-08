# 数据科学与数字人文

苏州大学历史文化学院课程资源。课程由 12 个方法模块和 1 个综合项目组成，贯穿可复现、案例真实与研究伦理。

**站点入口：**[数据科学与数字人文 · GitHub Pages](https://dsdh-python.github.io/DSDH/)（预期地址；仓库 Pages 尚待管理员启用，启用前会返回 404）  
**GitHub 仓库：**[DSDH-Python/DSDH](https://github.com/DSDH-Python/DSDH)

## 教材与站点

| 资源 | 路径 | 说明 |
|---|---|---|
| 章节 HTML 源页面 | `HTML教材/` | 13 章教材门户、章节页、9 款模块游戏及破冰游戏；这是 HTML 教材的编辑源目录 |
| 配图与图表 | `assets/dsdh/` | 章节图片和原创教学图；HTML 页面通过相对路径引用 |
| Markdown 源稿 | `src/` | 13 篇课程正文。与 HTML 页面是两套内容，不会自动互相转换 |
| MkDocs 站点内容 | `docs/` | 站点首页、游戏目录及历史 Markdown 页面 |
| MkDocs 配置 | `mkdocs.yml` | 站点主题、左侧导航和 Pages 基础地址 |
| 站点依赖 | `requirements-site.txt` | 固定版本的 MkDocs 与 Material 主题 |
| 静态资源准备脚本 | `scripts/prepare_site_assets.py` | 将 `HTML教材/` 和 `assets/dsdh/` 复制到构建输入目录 `docs/` |
| GitHub Pages 工作流 | `.github/workflows/deploy-pages.yml` | 在 `main` 推送或手动触发时构建并部署站点 |
| 单文件翻页预览 | `数据科学与数字人文_互动翻页教材.html` | 可直接在浏览器打开的交互翻页版本 |
| 实验教材预览 | `数字人文实验_教材预览.html` | 另一套《数字人文实验》教材内容 |
| 教材 PDF | `数据科学与数字人文_教材_V2.2.pdf` | 离线阅读版本 |

站点首页展示课程体系；左侧“教材目录”列出 13 章，另有课堂游戏中心。静态教材构建到站点的 `教材/` 路径，配图发布到 `assets/dsdh/`。

## 编辑与预览

- 更新 HTML 教材：编辑 `HTML教材/chNN.html`；新增或替换图片放入 `assets/dsdh/`，使用相对路径引用。不要编辑生成到 `docs/教材/` 的副本。
- 更新课程首页或左侧导航：编辑 `docs/index.md` 和 `mkdocs.yml`。
- 更新 Markdown 源稿：编辑 `src/` 中对应章节；它与 HTML 教材、MkDocs 首页目前不自动同步。
- 生成站点：先准备静态资源，再构建 MkDocs。

Windows PowerShell 示例：

```powershell
python -m pip install -r requirements-site.txt
python scripts/prepare_site_assets.py
python -m mkdocs build --strict
python -m http.server 8000 --directory site
```

本地预览地址为 `http://localhost:8000/`。`site/` 是构建产物，不需要提交；`docs/教材/` 与 `docs/assets/dsdh/` 也由脚本生成并列入忽略规则。

## 发布到 GitHub Pages

工作流 `.github/workflows/deploy-pages.yml` 监听 `main` 分支推送，并支持 GitHub Actions 手动运行。首次发布前，仓库管理员需在 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。目前仓库代码和本地构建已准备好，但 Pages 尚未启用；最近的 workflow 因缺少 Pages 配置而停在 `Setup Pages`，所以预期站点链接暂时不可访问。启用后可在 [Actions](https://github.com/DSDH-Python/DSDH/actions) 查看部署状态。

## 课堂游戏

模块二至模块十各有一款 HTML5 游戏，涵盖数据获取、可复现流程、文本分析、可视化修辞、关系网络、空间分析、图像处理、知识图谱与模型评估。游戏中心位于 `docs/games.md`；单文件游戏位于 `docs/games/`，教材内配套游戏位于 `HTML教材/`。
