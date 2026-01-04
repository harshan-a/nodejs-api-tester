import {
  getAllCollections,
} from "../APIs/collectionsAPIs.js";
import {
  getMultipleRequests,
  getSingleRequest
} from "../APIs/requestAPIs.js";
// import {
//   collections,
//   requests
// } from "../data-structure/col-req.js";
import {
  renderReqSendingSection
} from "../req-sending-section/render-req-sending-section.js";
import {
  asyncHandler
} from "../util/async-handler.js";
import {
  deleteOperationFunc
} from "./delete-operation.js";

export async function renderCollections() {
  const savedCollectionWrapperElem = document.querySelector("main .saved-collection-wrapper");
  const colToSaveReqDropDown =  document.querySelector(".req-sending-section .sending-wrapper .save-req-wrapper .collection-to-save-req");

  const {data:collections} = await getAllCollections();
  let collectionsHTML = "";
  let collectionDropDownHTML = "";

  // console.log(collections);

  // if await is need to used in the forEach function, the below code is example for that.
  // but below code will execute the each collection func simultaneously, therefore the <collecionsHTML> will be empty string for each collection func.
  /*
  await Promise.all(collections.map(async collection => {
    console.log(collectionsHTML)
    collectionsHTML += ` 
      <div class="collection collection-${collection._id}" data-col-id=${collection._id}>
        <div class="collection-name">
          <span>></span> ${collection.col_name}
        </div>
        <div class="saved-req-wrapper"> <!-- add class clicked -->
         ${await createSavedReqHTML(collection)}
        </div>
      </div>
    `;
  }));
  */

  // therefore use for loop with syntax like below;

  for(const collection of collections) {
    collectionsHTML += ` 
      <div class="collection collection-${collection._id}" data-col-id=${collection._id} data-col-name=${collection.col_name}>
        <div class="collection-name-wrapper">
          <span class="collection-name" title=${collection.col_name}>
            <span>></span> ${collection.col_name}
          </span> 
          <span class="material-symbols-rounded delete-collection" title="delete">
            delete
          </span>
        </div>
        <div class="saved-req-wrapper"> <!-- add class clicked -->
        ${await createSavedReqHTML(collection) || ""}
        </div>
      </div>
    `;

    collectionDropDownHTML += `
      <option value=${collection._id}>${collection.col_name}</option>
    `;
  }

  savedCollectionWrapperElem.innerHTML = collectionsHTML;
  colToSaveReqDropDown && (colToSaveReqDropDown.innerHTML = collectionDropDownHTML);

  const collectionElemList = document.querySelectorAll("main .req-collection-section .saved-collection-wrapper .collection");

  collectionElemList.forEach(funcForEachColElem);


  const savedReqNameElems = document.querySelectorAll("main .req-collection-section .saved-collection-wrapper .collection .saved-req-wrapper .saved-req .saved-req-name");
  const deleteReqElems = document.querySelectorAll("main .req-collection-section .saved-collection-wrapper .collection .saved-req-wrapper .saved-req .delete-request");

  for(const elem of savedReqNameElems) {
    
    elem.addEventListener("click", asyncHandler(async e => {
      const {reqId} = elem.dataset;
      const {data: request} = await getSingleRequest(reqId);
      // const request = {
      //   _id: "123",
      //   req_name: "req_1",
      //   req_method: "GET",
      //   req_url: "http://127.0.0.1:5500/API-Testing-App/index.html",
      //   contains_body: false,
      //   req_body: ``,
      //   req_res: {
      //     res_status_code: 400,
      //     res_status_text: "",
      //     res_data: "Hello"
      //   }
      // };
      // console.log(request);
      renderReqSendingSection(request);
    }));
  }

  for(const elem of deleteReqElems) {
    elem.addEventListener("click", asyncHandler(async e => {
      const {reqId, reqName, colId} = elem.dataset;
      deleteOperationFunc("request", reqId, reqName, colId);
    }));
  }


  async function createSavedReqHTML(col) {
    let reqHTML = "";
    const {data: requests} = await getMultipleRequests(col.req_ids);

    // const requests = []; 
    // col.req_ids.forEach(id => {
    //   const req = requests.find(req => id === req._id);
    //   reqs.push(req);
    // });
    
    requests.forEach(req => {
      const name = req.req_name.split(" ").join("&nbsp;")
      reqHTML += `
        <div class="saved-req">
          <span class="saved-req-name" title=${name}  data-req-id=${req._id}>
            ${name}
          </span>
          <span class="material-symbols-rounded delete-request" title="delete"  data-req-id=${req._id} data-req-name=${req.req_name} data-col-id=${col._id}>
            delete
          </span>
        </div>
      `;
    })
    return reqHTML;
  }

  function funcForEachColElem(elem) {
    const {colId, colName} = elem.dataset;
    const collectionNameElem = document.querySelector(`.collection-${colId} .collection-name-wrapper .collection-name`);
    const collectionNameArrowElem = document.querySelector(`.collection-${colId} .collection-name-wrapper .collection-name span`);
    const savedReqWrapperElem = document.querySelector(`.collection-${colId} .saved-req-wrapper`);

    let toggle = false;
    collectionNameElem.addEventListener("click", e => {
      if(toggle) {
        savedReqWrapperElem.classList.remove("clicked");
        collectionNameArrowElem.classList.remove("clicked");
        toggle = false;
        return;
      } 
      
      savedReqWrapperElem.classList.add("clicked");
      collectionNameArrowElem.classList.add("clicked");
      toggle = true;
    })


    const deleteCollectionElem = document.querySelector(`.collection-${colId} .collection-name-wrapper .delete-collection`);
  
    deleteCollectionElem.addEventListener("click", e => {
      deleteOperationFunc("collection", colId, colName);
    });
  }


}


