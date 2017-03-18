import md5 from 'js-md5';

class BaseApiService {
  baseUrl = 'http://gateway.marvel.com/v1/public/';

  fetch(resourcePath, keys, searchQuery) {
    const queryParams = this.getQueryParams(keys, searchQuery);
    const url = `${this.baseUrl}${resourcePath}?${queryParams}`;

    return fetch(url).then((data) => data.json());
  }

  getQueryParams(keys, query) {
    //nameStartsWith
    const timestamp = String(Date.now());
    const hash = md5(timestamp + keys.privateKey + keys.publicKey);

    const params = {
      ts: timestamp,
      apiKey: keys.publicKey,
      hash,
    };

    if (query) {
      params.nameStartsWith = query;
    }

    return Object.keys(params).map((key) => (
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )).join('&');
  }
}