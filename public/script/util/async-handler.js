import {showMsgFunc} from "./show-msg.js";

export function asyncHandler(fun) {
  return async (e) => {
    try {
      await fun(e);
  
    } catch(err) {
      console.log(err);
      showMsgFunc("Error: " + (err.message || "Something Error try again later..."));
    }
  }
}