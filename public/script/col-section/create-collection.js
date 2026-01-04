import {createCollection} from "../APIs/collectionsAPIs.js";
import {renderCollections} from "./render-collections.js";
import {showMsgFunc} from "../util/show-msg.js";
import {asyncHandler} from "../util/async-handler.js";

export function createCollectionFunc () {
  const displayContentElem = document.querySelector(".display-content");
  const contentHTML = `
    <div class="col-creation-wrapper">
      <button class="char-btn close-btn-in-col-creation">
        x
      </button>
      <input type="text" placeholder="Collection Name">
      <button class="text-btn create-btn-in-col-creation">
        Create
      </button>
    </div>
  `;

  displayContentElem.innerHTML = contentHTML;
  displayContentElem.classList.add("col-creation-action");

  const closeBtn = document.querySelector(".col-creation-action .col-creation-wrapper .close-btn-in-col-creation");
  const inputElem = document.querySelector(".col-creation-action .col-creation-wrapper input[type='text']");
  const createBtn = document.querySelector(".col-creation-action .col-creation-wrapper .create-btn-in-col-creation");

  closeBtn.addEventListener("click", e => {
    displayContentElem.innerHTML = "";
    displayContentElem.classList.remove("col-creation-action");
  })

  createBtn.addEventListener("click", asyncHandler(async e => {
    const value = inputElem.value.trim();
    const collection = await createCollection(value);
    await renderCollections();
    showMsgFunc("Collection Add Successfully", 1000);

    closeBtn.click();
  }));

}