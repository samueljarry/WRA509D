export enum ApiRoutesId {
  DOMAIN = 'https://stand-by-me.herokuapp.com/api/v1/',
  CHARACTERS = ApiRoutesId.DOMAIN + 'characters/',
  STANDS = ApiRoutesId.DOMAIN + 'stands/',
  CHARACTERS_QUERY = ApiRoutesId.CHARACTERS + 'query/query?',
  STANDS_QUERY = ApiRoutesId.STANDS + 'query/query?',
  ASSETS = 'https://jojos-bizarre-api.netlify.app/assets/',
}