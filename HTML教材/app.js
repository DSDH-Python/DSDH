const markRead = document.getElementById("markRead");
const chapter = markRead?.dataset.ch;

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
