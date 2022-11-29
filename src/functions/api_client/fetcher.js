export const fetcherPath = path => {
  return fetcherPathNoLogging(path).then(data => {
    if (Array.isArray(data)) {
      console.log(data[0]);
    } else {
      console.log(data);
    }
    return data;
  });
};

export const fetcherPathNoLogging = path => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${path}`;
  return fetcherNoLogging(url);
};

export const fetcherNoLogging = (url, headers = {}) => {
  return fetch(url, {
    credentials: "include",
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log(url);
      return data;
    });
};
