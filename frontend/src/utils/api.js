import axios from "axios";

function logError(error) {
  console.error("Error fetching data:", error);
  console.error("Error message:", error.message);
  console.error("Error response:", error.response);
  console.error("Error code:", error.code);
}

export async function apiRequest(method = 'get', url, data = {}, params = {}, isPrivate = false) {
  try {
    const config = {
      method,
      url,
      params,
      data,
      body : JSON.stringify(data),
      headers: {},
    };

    if (isPrivate) {
      config.headers.authorization = `Bearer ${sessionStorage.getItem("jwt").replace(/"/g, "")}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    logError(error);
    console.log("Here", error);
    throw error;
  }
}
