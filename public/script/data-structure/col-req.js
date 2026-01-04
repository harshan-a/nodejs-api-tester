export const collections = [
  {
    _id: "1234",
    col_name: "col_1",
    req_ids: ["123", "456"]
  },
  {
    _id: "5678",
    col_name: "col_2",
    req_ids: ["789"]
  }
]

export const requests = [
  {
    _id: "123",
    req_name: "req_1",
    req_method: "GET",
    req_url: "localhost:3000/api/v1/tasks/123",
    contains_body: true,
    req_body: `{
      task_name: "hi"
    }`,
    req_res: {
      res_status_code: 0,
      res_status_text: "",
      res_data: ""
    }
  },
  {
    _id: "456",
    req_name: "req_2",
    req_method: "GET",
    req_url: "localhost:3000/api/v1/tasks",
    contains_body: false,
    req_body: "",
    req_res: {
      res_status_code: 0,
      res_status_text: "",
      res_data: ""
    }
  },
  {
    _id: "789",
    req_name: "req_3",
    req_method: "POST",
    req_url: "localhost:3000/api/v1/tasks",
    contains_body: true,
    req_body: `{
      task_name: "hi"
    }`,
    req_res: {
      res_status_code: 0,
      res_status_text: "",
      res_data: ""
    }
  }
]