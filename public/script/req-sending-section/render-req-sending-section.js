import {
  asyncHandler,
} from "../util/async-handler.js";

import {
  showMsgFunc,
} from "../util/show-msg.js";

import {
  sendReq,
} from "../APIs/generalAPIs.js";

import {
  renderCollections,
} from "../col-section/render-collections.js";

import {
  updateCollection,
  getAllCollections
} from "../APIs/collectionsAPIs.js";

import {
  createRequest,
  updateRequest,
} from "../APIs/requestAPIs.js";

// import {
//   collections,
//   requests
// } from "../data-structure/col-req.js";




export async function renderReqSendingSection(request) {
  const reqData = request || {
    req_name: "",
    req_url: "",
    req_method: "",
    contains_body: false,
    req_body: "{}",
    req_res: {
      status_code: 0,
      status_text: "",
      data: ""
    },
  }
  // console.log(reqData);
  const reqSendingSectionElem = document.querySelector("main .req-sending-section");

  let contentHTML = "";
  if(request) {
    contentHTML = `
      <div class="sending-title">
        Request Sending Section
        <button class="char-btn close-btn-in-req-section">
          x
        </button>
      </div>
      <div class="sending-wrapper">
        <div class="send-req-wrapper">
          <select name="req-method" class="req-method-drop-down">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="text" placeholder="Enter the url">
          <button class="text-btn send-req-btn">Send</button>
        </div>
        <div class="req-body-wrapper ${reqData.contains_body ? "show-body-text-area" : ""}"><!-- add class = show-body-text-area -->
          <button class="text-btn body-btn">Body</button>
          <div class="text-area-wrapper">
            <!-- add <textarea></textarea> -->
            ${reqData.contains_body ? "<textarea></textarea>" : ""}
          </div>
        </div>
        <div class="display-res-wrapper">
          <div class="res-status-wrapper">
            <span class="status-code"></span>
            <span class="status-text"></span>
          </div>
          <pre class="display-data"></pre>
        </div>
        <div class="save-req-wrapper save-req-changes-wrapper">
          <input type="text" placeholder="Req Name">
          <button class="text-btn save-req-changes-btn" title="Send before Save the changes">
            Save Changes
          </button>
        </div>
      </div>
    `;
  } else {
    contentHTML = `
      <div class="sending-title">
        Request Sending Section
      </div>
      <div class="sending-wrapper">
        <div class="send-req-wrapper">
          <select name="req-method" class="req-method-drop-down">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="text" placeholder="Enter the url">
          <button class="text-btn send-req-btn">Send</button>
        </div>
        <div class="req-body-wrapper"><!-- add class = show-body-text-area -->
          <button class="text-btn body-btn">Body</button>
          <div class="text-area-wrapper">
            <!-- add <textarea></textarea> -->
          </div>
        </div>
        <div class="display-res-wrapper">
          <div class="res-status-wrapper">
            <span class="status-code"></span>
            <span class="status-text"></span>
          </div>
          <pre class="display-data"></pre>
        </div>
        <div class="save-req-wrapper">
          <label>Select collection</label>
          <select name="collection-save" class="collection-to-save-req">
            ${await createCollectionDropDownHTML()}
          </select>
          <input type="text" placeholder="Req Name">
          <button class="text-btn save-req-btn">Save</button>
        </div>
      </div>
    `;

  }

  reqSendingSectionElem.innerHTML = contentHTML;

  const closeBtnInReqSection = document.querySelector(".req-sending-section .sending-title .close-btn-in-req-section");

  const reqMethodElem = document.querySelector(".req-sending-section .sending-wrapper .send-req-wrapper .req-method-drop-down");
  const reqUrlInputElem = document.querySelector(".req-sending-section .sending-wrapper .send-req-wrapper input[type='text']");
  const reqSendBtn = document.querySelector(".req-sending-section .sending-wrapper .send-req-wrapper .send-req-btn");

  const reqBodyWrapperElem = document.querySelector(".req-sending-section .sending-wrapper .req-body-wrapper");
  const reqBodyBtn = document.querySelector(".req-sending-section .sending-wrapper .req-body-wrapper .body-btn");
  const textAreaWrapper = document.querySelector(".req-sending-section .sending-wrapper .req-body-wrapper .text-area-wrapper");

  const resDisplaySpan =  document.querySelector(".req-sending-section .sending-wrapper .display-res-wrapper .display-data");
  const resStatusCodeSpan =  document.querySelector(".req-sending-section .sending-wrapper .display-res-wrapper .res-status-wrapper .status-code");
  const resStatusTextSpan =  document.querySelector(".req-sending-section .sending-wrapper .display-res-wrapper .res-status-wrapper .status-text");

  const saveReqWrapper = document.querySelector(".req-sending-section .sending-wrapper .save-req-wrapper");
  const colToSaveReqDropDown =  document.querySelector(".req-sending-section .sending-wrapper .save-req-wrapper .collection-to-save-req");
  const reqNameInputElem = document.querySelector(".req-sending-section .sending-wrapper .save-req-wrapper input[type='text']");
  const reqSaveBtn = document.querySelector(".req-sending-section .sending-wrapper .save-req-wrapper .save-req-btn");
  const reqChangesSaveBtn = document.querySelector(".req-sending-section .sending-wrapper .save-req-wrapper .save-req-changes-btn");

  reqBodyBtn.addEventListener("click", reqBodyBtnEvent);

  reqSendBtn.addEventListener("click", asyncHandler(sendReqEvent));

  reqUrlInputElem.addEventListener("keydown", e => {
    // console.log(e.key);
    if(e.key === "Enter") {
      asyncHandler(sendReqEvent)();
    }
  })

  if(request) {
    // console.log(reqData.req_res);
    reqMethodElem.value = reqData.req_method;
    reqUrlInputElem.value = reqData.req_url;

    if(reqData.contains_body){
      const textArea = document.querySelector(".req-sending-section .sending-wrapper .req-body-wrapper .text-area-wrapper textarea");
      textArea.value = reqData.req_body;
    }
    reqNameInputElem.value = reqData.req_name;
    reqSendBtn.click();

    closeBtnInReqSection.addEventListener("click", e => {
      renderReqSendingSection();
    })

    reqChangesSaveBtn.addEventListener("click", asyncHandler(saveReqChangesEvent));

  } else {
    reqSaveBtn.addEventListener("click", asyncHandler(saveReqEvent));

  }



  async function createCollectionDropDownHTML() {
    const {data: collections} = await getAllCollections();
    let collectionDropDownHTML = "";

    collections.forEach(collection => {
      collectionDropDownHTML += `
        <option value=${collection._id}>${collection.col_name}</option>
      `;
    })

    return collectionDropDownHTML;
  }

  function reqBodyBtnEvent(e) {
    if(!reqData.contains_body) {
      reqBodyWrapperElem.classList.add("show-body-text-area");
      textAreaWrapper.innerHTML = "<textarea placeholder='JSON Syntex:  {\"property\": \"value\"}'></textarea>";
      reqData.contains_body = true;
      return;
    }
    reqData.contains_body = false;
    reqBodyWrapperElem.classList.remove("show-body-text-area");
    textAreaWrapper.innerHTML = "";
    console.log(reqData);
  }
  
  
  async function sendReqEvent(e) {
    reqData.req_method = reqMethodElem.value;
    reqData.req_url = reqUrlInputElem.value.trim();

    if(reqData.req_url === "") return showMsgFunc("Empty URL");

    resDisplaySpan.innerHTML = "Loading...";
    resStatusCodeSpan.innerHTML = "";
    resStatusTextSpan.innerHTML = "";

    if(reqData.contains_body) {
      const textArea = document.querySelector(".req-sending-section .sending-wrapper .req-body-wrapper .text-area-wrapper textarea");

      try {
        const body = JSON.parse(textArea.value);
        reqData.req_body = JSON.stringify(body);
        reqData.req_res = await sendReq(reqData.req_method, reqData.req_url, reqData.req_body);

      } catch(err) {
        resDisplaySpan.innerHTML = "";
        showMsgFunc(err, 3000);
        saveReqWrapper.classList.remove("allow-to-save");
        console.log(err);
        return err;
      }
      
      
    } else {
      try {
        reqData.req_res = await sendReq(reqData.req_method, reqData.req_url);
        
      } catch(err) {
        resDisplaySpan.innerHTML = "";
        showMsgFunc(err, 3000);
        saveReqWrapper.classList.remove("allow-to-save");
        console.log(err);
        return err;
      }
    }
    
    resStatusCodeSpan.innerHTML = "Status Code: " + reqData.req_res.status_code + "&nbsp;&nbsp;&nbsp;";
    
    resStatusTextSpan.innerHTML = "Status Text: " + reqData.req_res.status_text;
    
    let resData = "";
    try {
      resData = JSON.stringify(JSON.parse(reqData.req_res.data), undefined, 2);
      //JSON.stringify(obj, replacer, space);
    } catch (err) {
      resData = reqData.req_res.data;
    }

    resDisplaySpan.textContent = resData || "No Response";
    saveReqWrapper.classList.add("allow-to-save");
    // console.log(reqData);

    reqUrlInputElem.title = reqData.req_url;
  }

  async function saveReqEvent(e) {
    const collectionId = colToSaveReqDropDown.value;

    reqData.req_name = reqNameInputElem.value.trim();


    if(!reqData.req_name) return showMsgFunc("Empty Req name", 700);
    // console.log(reqData);
    // console.log(collectionId);


    const {message ,data} = await createRequest(reqData);
    // console.log(data);
    await updateCollection(collectionId, data._id, "push");
    renderCollections();
    reqNameInputElem.value = "";
    saveReqWrapper.classList.remove("allow-to-save");
    showMsgFunc(message, 1000)
  }
  
  async function saveReqChangesEvent(e) {
    const {_id:reqId} = reqData;

    reqData.req_name = reqNameInputElem.value.trim();


    if(!reqData.req_name) return showMsgFunc("Empty Req name", 700);
    // console.log(reqData);
    
    const {message} = await updateRequest(reqId, reqData);
    renderCollections();
    closeBtnInReqSection.click();
    showMsgFunc(message, 1000)
  }
}