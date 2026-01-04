import {colSection} from "./col-section/col-section.js";
import {renderReqSendingSection} from "./req-sending-section/render-req-sending-section.js";
import {asyncHandler} from "./util/async-handler.js"
import {showMsgFunc} from "./util/show-msg.js";



async function start() {
  // const url = new URL(window.location.href);
  // console.log(url.searchParams.get("helo"));
  await asyncHandler(renderReqSendingSection)()
  await asyncHandler(colSection)()

  showMsgFunc("Please enable CORS for this origin before send request", 4000);
  // const res = await fetch("http://localhost:5000/api/v1/tasks");
  // const data = await res.json();
  // console.log(data);
}
start()