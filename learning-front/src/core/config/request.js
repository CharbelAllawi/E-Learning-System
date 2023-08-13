import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const sendRequest = async ({
  method = "POST",
  route,
  body,
  includeHeaders = true,
}) => {
  if (!route) throw Error("URL required");

  axios.defaults.headers.authorization = includeHeaders
    ? `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjkxODgwNTc5LCJleHAiOjE2OTE4OTg1NzksIm5iZiI6MTY5MTg4MDU3OSwianRpIjoiRHJiN2pBOFRKMU5kY1psWSIsInN1YiI6IjI0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.NWdgo-4EAd-EUfOkIFqBdeAN6MMR1LXDNrvVwxIC4A4`
    : "";

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
