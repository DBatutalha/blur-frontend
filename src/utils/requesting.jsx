export const simpleAPICall = async ({ endpoint, body = {}, method = "POST", options = {}, verbose = false }) => {
  const data = {
    method: method,
    ...options,
    headers: {
      ...options.headers,
    },
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    data.body = body;
  }

  const response = await fetch(endpoint, data);
  const result = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: result.detail || result.message || "Bir hata oluştu.",
    };
  } else {
    if (verbose) {
      console.log(result.message);
    }
    return result.data;
  }
};
