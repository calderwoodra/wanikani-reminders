/**
 * De-facto way to send a post request.
 *
 * Requires backend also be configured properly.
 * <ul>
 *   <li>All responses must be JsonResponse</li>
 *   <li>All success responses must be in the form { "data": { ... } }</li>
 *   <li>All errors must have status codes >= 400</li>
 *   <li>All views should be wrapped in try/except</li>
 *   <li>All errors should be in the form { "error": "<human readable error>" }</li>
 * </ul>
 * @param {string} url path suffix only (ex. "cash_transfers/")
 * @param {body} body json
 * @return {Promise<Response>}
 */
export const postRequest = (url, body, successLogging = true, failureLogging = true) => {
  // error = {
  //    code: "...",
  //    message: "...",
  // }
  return _postRequest(url, body, successLogging, failureLogging).catch(error => Promise.reject(error));
};

const _postRequest = (url, body, successLogging, failureLogging) => {
  url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${url}`;
  return fetch(url, {
    credentials: "include",
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      jwt: jwtToken,
    },
    ...{ body: JSON.stringify(body) },
  }).then(response => {
    if (!response.ok) {
      if (failureLogging) {
        console.log("Request failed: " + response.status);
      }
      return response.json().then(response => Promise.reject(response.error));
    }
    if (successLogging) {
      console.log("response", response);
    }
    return response.json().then(response => {
      if (successLogging) {
        console.log(url);
        console.log("response json", response);
      }
      return response.data;
    });
  });
};
