let timeOut;
function showMsgFunc(str, time = 2000) {
  clearTimeout(timeOut);
  const displayContentElem = document.querySelector(".display-msg");

  const contentHTML = `
    <div class="show-msg-wrapper">
      <span class="msg">
        ${str}
      </span>
    </div>
  `;

  displayContentElem.innerHTML = contentHTML;
  displayContentElem.classList.add("show-msg-action");
  
  timeOut = setTimeout(() => {
    displayContentElem.innerHTML = "";
    displayContentElem.classList.remove("show-msg-action");
  }, time);
}

export {
  showMsgFunc,
}