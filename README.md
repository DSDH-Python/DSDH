# 《数据科学与数字人文》课程资源

苏州大学历史文化学院相关课程的数字教材与课堂互动资源。课程主体包括 12 个方法模块和 1 个综合项目，围绕可复现、真实案例与研究伦理展开。

<img width="3304" height="1682" alt="image" src="https://github.com/user-attachments/assets/8bd00b30-28f7-4d76-bf2b-0528da64c6e4" />

## 项目内容

| 路径 | 内容 |
|---|---|
| `src/` | 课程正文 Markdown 源稿，共 13 篇，包含 12 个模块与综合项目。修改完整课程正文时从这里开始。 |
| `docs/` | MkDocs 站点内容，包括站点首页、已整理上线的模块一及课堂游戏目录。它与 `src/` 是分开的内容，不会由当前工作流自动互相转换。 |
| `docs/games/` | 模块二至模块十的 9 款课堂 HTML5 游戏。 |
| `HTML教材/` | 13 章 HTML 教材页面，以及模块二至模块十的配套游戏和破冰游戏。章节页引用同目录下的 `style.css`、`app.js`；当前目录未包含这两个文件，分发或浏览这套多文件页面前需补齐资源。 |
| `数据科学与数字人文_互动翻页教材.html` | 单文件交互翻页教材预览。 |
| `数字人文实验_教材预览.html` | 《数字人文实验》教材预览，属于另一份教材内容。 |
| `数据科学与数字人文_教材_V2.2.pdf` | 教材 PDF 版本。 |
| `assets/dsdh/` | 课程相关配图资源。 |
| `docs/games.md` | 游戏玩法、建议时长与课堂使用说明。 |
| `.github/workflows/deploy-pages.yml` | GitHub Pages 工作流：在 `main` 分支推送时安装 MkDocs 与 Material，并运行 `mkdocs build` 后部署。 |

## 阅读与修改

- 查看完整课程正文：从 `src/` 中按序打开 Markdown 文件。
- 查看站点内容：从 `docs/index.md` 开始；目前站点首页将模块一标为已上线，其余模块仍列为迁移中。
- 查看单文件交互教材：打开 `数据科学与数字人文_互动翻页教材.html`。
- 修改正文：编辑对应的 `src/NN_模块标题.md`；若要更新 MkDocs 站点，还需同步维护 `docs/` 中对应页面。当前没有从 `src/` 自动生成站点页面的脚本。

## 本地预览与部署

独立 HTML 文件可直接用浏览器打开。MkDocs 站点的工作流依赖 MkDocs 配置文件，但当前仓库根目录没有 `mkdocs.yml` 或 `mkdocs.yaml`；因此，在添加并配置该文件之前，`mkdocs build` 无法按工作流完成构建，Pages 自动部署也不能视为可用。

工作流监听 `main` 分支推送，也支持在 GitHub Actions 中手动触发。启用 Pages 部署时，仓库的 **Settings → Pages → Build and deployment → Source** 需选择 **GitHub Actions**。

## 课堂游戏

游戏为轻量 HTML5 页面，适合课堂投影或课后练习；题目覆盖数据获取、可复现流程、文本分析、可视化修辞、关系网络、空间分析、图像修复、知识图谱和模型评估。游戏设计包含计时、排行榜或伦理判断等互动环节；具体功能以各游戏页面为准。

<img width="380" height="1269" alt="局部截取_20261008_152850" src="https://github.com/user-attachments/assets/5b7d10b0-b864-469c-b971-dc00b75f6d54" />
