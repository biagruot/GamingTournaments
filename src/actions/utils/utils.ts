import { API_TOURNAMENTS_URL } from '../../constants/api';

/**
 * Generates an endpoint URL for the tournaments API.
 *
 * @param {string} query - An optional search query to include in the URL.
 * @returns {URL} A new URL object representing the API endpoint URL.
 */
export const getEndpointURL = (query?: string, id?: string): URL => {
  const endpointURL = new URL(API_TOURNAMENTS_URL, window.location.origin);
  const queryParameters = new URLSearchParams();

  if (query) {
    queryParameters.append('q', query);
    endpointURL.search = queryParameters.toString();
  }

  if (id) {
    endpointURL.pathname = `${endpointURL.pathname}/${id}`;
  }

  return endpointURL;
};
