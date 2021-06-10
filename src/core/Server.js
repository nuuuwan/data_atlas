import WWW from 'base/WWW.js';

const SERVER_TYPE_TO_HOST = {
  gig: process.env?.REACT_APP_HOST_GIG || 'http://localhost:4001',
  geo: process.env?.REACT_APP_HOST_GEO || 'http://localhost:4002',
}

export default class Server {
  static getURL(serverType, cmd, paramsList) {
    const host = SERVER_TYPE_TO_HOST[serverType];
    return `${host}/${cmd}/${paramsList.join('/')}`
  }

  static async run(serverType, cmd, paramsList) {
    const url = Server.getURL(serverType, cmd, paramsList);
    console.debug(url);
    const data = await WWW.getJSON(url);
    return data;
  }
}
