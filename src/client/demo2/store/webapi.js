'use strict';

import baseApi from "lib/webapi.js";
import { Message } from 'element-ui';

class webapi extends baseApi {
  constructor() {
    super();
  }
  getEnvName() {
    let env = 'prod';
    let url = window.location.href;
    if (url.indexOf('localhost') > 0) {
      env = "inte"
    } else if (url.indexOf('192') > 0) {
      env = "me"
    }
    return env;
  }

  envUrl = {
    me: 'http://localhost:6001',
    inte: 'http://localhost:6001',
    prod: 'https://api.zy.86edu.net',
  };


  getDomainApi(type) {
    return this.env('envUrl')
  }

}

export default new webapi();