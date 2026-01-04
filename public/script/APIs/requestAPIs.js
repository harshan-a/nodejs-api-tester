const getMultipleRequests = async (reqIds) => {
  // const params = new URLSearchParams({
  //   all: false,
  //   reqIds: [reqIds]
  // })
  // console.log(reqIds)
  // console.log(params);
  // console.log(`/api/v1/requests?all=false&reqIds=${reqIds}`);

  const res = await fetch(`/api/v1/requests?all=false&reqIds=${reqIds}`, {
    method: "GET", 
    headers: {
      "content-type": "application/json"
    }
  })

  const data = await res.json();

  if(res.status >= 400) throw data;

  return data;
}

const getSingleRequest = async (reqId) => {
  const res = await fetch(`/api/v1/requests/${reqId}`, {
    method: "GET", 
    headers: {
      "content-type": "application/json"
    },
  })

  const data = await res.json();

  if(res.status >= 400) throw data;
  // console.log(data);

  return data;
}

const createRequest = async (reqData) => {
  const res = await fetch("api/v1/requests", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(reqData)
  })

  const data = await res.json();
  if(res.status >= 400) throw data;

  return data;
}

const updateRequest = async (reqId, reqData) => {
  const res = await fetch("api/v1/requests/" + reqId, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(reqData)
  })

  const data = await res.json();
  if(res.status >= 400) throw data;

  return data;
}

const deleteRequest = async (reqId) => {
  const res = await fetch("api/v1/requests/" + reqId, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  });

  const data = await res.json();
  if(res.status >= 400) throw data;

  return data;
}


export {
  getMultipleRequests,
  createRequest,
  updateRequest,
  getSingleRequest,
  deleteRequest,
}