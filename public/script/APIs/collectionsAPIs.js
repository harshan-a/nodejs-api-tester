const createCollection = async (colName) => {
  const res = await fetch("/api/v1/collections", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      col_name: colName
    })
  })

  const data = await res.json();

  if(res.status >= 400) throw data;
  
  return data;
}

const getAllCollections = async () => {
  const res = await fetch("/api/v1/collections", {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })

  const data = await res.json();

  if(res.status >= 400) throw data;
  
  return data;
}
const updateCollection = async (colId, reqId, op) => {
  const res = await fetch("/api/v1/collections/" + colId + `?op=${op}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      reqId
    })
  });

  const data = await res.json();
  if(res.status >= 400) throw data;

  return data;
}

const deleteCollection = async (colId) => {
  const res = await fetch("/api/v1/collections/" + colId, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    }
  })

  const data = await res.json();
  if(res.status >= 400) throw data;

  return data;
}



export {
  createCollection,
  getAllCollections,
  updateCollection,
  deleteCollection,
}