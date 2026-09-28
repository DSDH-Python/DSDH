# VS Code 配置 Git 完整步骤（Windows）
> ⚠️重要前提：**VS Code本身不带Git程序**，必须电脑先安装【Git for Windows】（带Git‑Bash），VS Code只是调用你本机已经装好的Git程序。
git+vscode组合，可以方便地进行大多数图形化的代码协作。

## 一、确认本机Git已经装好
1. 打开Git‑Bash，输入
```bash
git --version
```
输出版本号代表安装成功。
> 如果提示命令不存在，去官网下载安装 Git for Windows，**安装界面勾选 Git Credential Manager（凭证管理器），编辑器选择VS Code**。

2. 配置你的提交用户名、邮箱（**这是提交记录作者信息，不是登录账号**）
打开VS Code内置终端 `Ctrl+``，执行：
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的github注册邮箱"
```
查看是否配置成功：
```bash
git config --global --list
```

> 只当前仓库生效（不加`--global`），全局所有仓库去掉`--global`。

## 二、VS Code识别Git（解决“找不到git”报错）
1. 装好Git之后**完全关闭VS Code再重新打开**（非常关键，刷新环境变量）。
2. 如果还是提示找不到Git：
- 按 `Ctrl+,` 打开设置，搜索 `git.path`
- 填入你的git.exe完整路径，示例：
`C:\Program Files\Git\bin\git.exe`
- 保存，重启VS Code。

3. 设置默认终端为Git‑Bash（推荐，你一直用它）
- `Ctrl+Shift+P` →输入 `Terminal: Select Default Profile`
- 选择 **Git Bash**，以后内置终端默认就是Git‑Bash，复制Windows带`\`路径套双引号即可直接用。

## 三、登录GitHub账号（免反复粘贴PAT令牌）
1. 安装扩展：**GitHub Pull Requests and Issues**（官方扩展）。
2. 左下角账户图标 → `Sign‑in to GitHub`，浏览器弹出授权页面，允许访问，回到VS Code就登录完成。
> 借助Git Credential Manager，HTTPS方式push/pull自动保存凭证，不再需要手动复制PAT token密码。

## 四、图形化源代码管理界面使用（`Ctrl+Shift+G`打开）
1. **打开仓库文件夹**：`文件-打开文件夹`，选择本地git仓库（文件夹内部要有隐藏`.git`）。
2. 初始化新仓库：打开空文件夹，源代码管理面板点 `Initialize Repository`，自动生成`.git`文件夹。
3. 日常操作图形界面：
    - 看到Changes列表：红色=改动/新增文件；点文件旁的`+`暂存该文件；点Changes右侧`+`全部暂存。
    - 上方输入框写提交说明，`Ctrl+Enter`执行提交。
    - 左下角状态栏显示当前分支；同步按钮=pull+push一键同步；也可以单独Push、Pull。

> 小提示：遇到报错，可打开命令面板 `Ctrl+Shift+P`，执行 `Git: Show Git Output`，看详细日志排查问题。

## 五、仓库推荐配置（直接新建两个文件放到仓库根目录）
### `.gitignore`（忽略不需要上传的临时文件）
```gitignore
#系统垃圾
.DS_Store
Thumbs.db
*.log

#vscode工作区
.vscode/
*.code‑workspace

#python缓存（你有生成index.py脚本）
__pycache__/
*.pyc
```

### `.gitattributes`（解决Windows换行CRLF大量虚假变更）
```gitattributes
* text=auto eol=lf
*.pdf binary
*.png binary
*.jpg binary
```
> html、js自动转换换行；pdf图片标记为二进制，不做文本diff解析，减少奇怪报错。

把两个文件提交到仓库，所有成员都生效。

## 六、高频场景操作速查
### 1. 克隆远程GitHub仓库到本地
`Ctrl+Shift+P` → `Git: Clone`，粘贴GitHub仓库HTTPS地址，选择本地保存文件夹，自动打开项目。

### 2. 本地全新文件夹推送到GitHub
1. 在VS Code打开本地文件夹；
2. 源代码管理面板：`Initialize Repository`初始化；
3. add全部文件，写commit信息提交；
4. 命令面板 `Git: Add Remote`，粘贴GitHub仓库地址；
5. 点推送。

### 3. 分支操作
左下角点击分支名称 → `Create new branch` 创建新分支；切换分支。
> 好习惯：main分支保持稳定可访问的Pages网站，修改网页先新建分支，测试完毕合并到main。

## 七、常见故障排查
1. **push被GH013密钥扫描拦截**
GitLens看提交diff，找到疑似token/密钥字符串，`git reset --soft HEAD~1`撤销本次提交，清理敏感内容，重新add/commit/push。

2. **推送被拒绝rejected**
远程有别人提交，点击Sync Changes，先pull拉取远程，有冲突在VS Code内置合并编辑器手动处理冲突，完成再push。
> **不要随便点Force Push强制推送main分支，会破坏GitHub‑Pages站点历史。**

3. 终端粘贴Windows路径：套英文双引号 `"C:\xxx\xxx"`，不用改反斜杠。

## 八、适合你的完整工作流
1. VS Code打开仓库文件夹；
2. 修改HTML，Live‑Server本地预览网页，校验全部跳转链接；
3. 源代码管理面板提交；
4. 同步推送GitHub；
5. 等待GitHub Pages构建（30‑90秒），浏览器`Ctrl+F5`强制刷新访问网站。
6. 文件改错：打开文件右侧`Timeline（时间线）`，直接回溯历史版本，不用敲复杂git命令。

