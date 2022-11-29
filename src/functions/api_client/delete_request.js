/**
 * De-facto way to send a DELETE request.
 */
export const deleteRequest = path => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${path}`;
  return fetch(url, {
    credentials: "include",
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(response => {
    if (!response.ok) {
      console.log("Request failed: " + response.status);
      return response.json().then(response => Promise.reject(response.error));
    }
    console.log("response", response);
    return response.json().then(response => {
      console.log(url);
      console.log("response json", response);
      return response.data;
    });
  });
};
