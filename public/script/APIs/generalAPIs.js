
const sendReq = async (method, url, body) => {
  let res;
  if(body) {
    res = await fetch(url, {
      method,
      headers: {
        "content-type" : "application/json"
      }, 
      body
    })

  } else {
    res = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json"
      }
    })
  }

  const data = await res.text();
  const status_code = res.status;
  const status_text = res.statusText;
  return {
    status_code,
    status_text,
    data
  };
}

export {
  sendReq,
}