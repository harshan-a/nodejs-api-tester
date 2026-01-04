import {deleteCollection, updateCollection} from "../APIs/collectionsAPIs.js";
import {deleteRequest} from "../APIs/requestAPIs.js";
import {renderCollections} from "./render-collections.js";
import {showMsgFunc} from "../util/show-msg.js";
import {asyncHandler} from "../util/async-handler.js";

export function deleteOperationFunc (which, id, name, colId) {
  const displayContentElem = document.querySelector(".display-content");
  const contentHTML = `
    <div class="col-delete-wrapper">
      <span>Are you sure to delete the ${which === "collection" ? "collection" : "request"} <b> ${name}<b></span>
      <div>
        <button class="text-btn no-btn">
          No
        </button>
        <button class="text-btn yes-btn">
          Yes
        </button>
      </div>
    </div>
  `;

  displayContentElem.innerHTML = contentHTML;
  displayContentElem.classList.add("col-creation-action");

  const noBtn = document.querySelector(".col-creation-action .col-delete-wrapper .no-btn");
  const yesBtn = document.querySelector(".col-creation-action .col-delete-wrapper .yes-btn");

  noBtn.addEventListener("click", e => {
    displayContentElem.innerHTML = "";
    displayContentElem.classList.remove("col-creation-action");
  })

  yesBtn.addEventListener("click", asyncHandler(async e => {
    // console.log(id);
    if(which === "collection") {
      await deleteCollection(id);

    } else if(which === "request") {
      const {data} = await deleteRequest(id);
      await updateCollection(colId, data._id, "pull");
    }

    await renderCollections();
    showMsgFunc(`${which === "collection" ? "Collection" : "Request"} Deleted Successfully`, 1000);

    noBtn.click();
  }));

}