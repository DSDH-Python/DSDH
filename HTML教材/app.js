const markRead = document.getElementById("markRead");
const chapter = markRead?.dataset.ch;

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back to the selection-based copy path.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  try {
    textarea.select();
    if (!document.execCommand("copy")) {
      throw new Error("浏览器拒绝复制代码");
    }
  } finally {
    textarea.remove();
  }
}

document.querySelectorAll("pre.code").forEach((pre) => {
  const code = pre.querySelector("code");
  if (!code) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "code-block";
  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "btn code-copy";
  copyButton.textContent = "复制代码";
  copyButton.setAttribute("aria-label", "复制此代码块");

  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.append(pre, copyButton);

  copyButton.addEventListener("click", async () => {
    try {
      await copyText(code.textContent);
      copyButton.textContent = "已复制";
    } catch (error) {
      console.error("复制代码失败", error);
      copyButton.textContent = "复制失败";
      copyButton.title = "复制失败，请手动选择代码";
    }

    window.setTimeout(() => {
      copyButton.textContent = "复制代码";
    }, 2000);
  });
});

if (chapter) {
  document.querySelectorAll(".kbcase h4").forEach((heading) => {
    const match = heading.textContent.match(new RegExp(`^${chapter}\\.(\\d+)`));
    if (match && !heading.id) {
      heading.id = `s${chapter}${match[1]}`;
    }
  });

  const frontier = document.querySelector(".callout.frontier");
  const chineseSources = document.querySelector(".callout.src");
  if (frontier && !frontier.id) {
    frontier.id = chapter === "11" || chapter === "10" ? "sec12" : "sec11";
  }
  if (chineseSources && !chineseSources.id) {
    chineseSources.id = chapter === "11" ? "sec13" : "sec12";
  }
}

if (markRead) {
  const storageKey = `dsdh:chapter:${chapter}:read`;
  const readDot = document.getElementById("readDot");

  const renderReadState = (isRead) => {
    markRead.textContent = isRead ? "已标记为已读" : "标记为已读";
    markRead.setAttribute("aria-pressed", String(isRead));
    readDot?.classList.toggle("done", isRead);
  };

  renderReadState(localStorage.getItem(storageKey) === "true");
  markRead.addEventListener("click", () => {
    const isRead = localStorage.getItem(storageKey) !== "true";
    localStorage.setItem(storageKey, String(isRead));
    renderReadState(isRead);
  });
}
