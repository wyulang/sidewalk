'use strict';

import baseApi from "lib/webapi.js";
import { Message } from 'element-ui';
import conf from 'lib/config.js';

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

    if (url.includes('m.zy.86edu')) {
      env = 'inte';
    }
    if (url.includes('zy.m.test.pioneeringedu')) {
      env = 'inte';
    }

    return env;
  }

  envUrl = {
    me: 'http://api.zytest.86edu.net',
    inte: 'http://api.zytest.86edu.net',
    prod: 'https://api.zy.86edu.net',
  };

  joyred = {
    me: 'https://gaokaoquerytest.joyread.com.cn',
    inte: 'https://gaokaoquerytest.joyread.com.cn',
    prod: 'https://gaokaoquerytest.joyread.com.cn',
  }

  payUrl = {
    me: 'http://m.zy.86edu.net',
    inte: [, 'http://m.zy.86edu.net', 'http://zy.m.test.pioneeringedu.cn'][conf.type],
    prod: [, 'https://mzy.86edu.net', 'https://m.pioneeringedu.cn'][conf.type],
  }

  oauthUrl = [, 'https://mzy.86edu.net', 'https://m.pioneeringedu.cn'];

  openUrl = {
    me: 'https://mzy.86edu.net',
    inte: 'https://mzy.86edu.net',
    prod: 'https://mzy.86edu.net',
  }

  loginServer = {
    me: 'http://api.zytest.86edu.net/api/app/person/info',
    inte: 'http://api.zytest.86edu.net/api/app/person/info',
    prod: 'https://api.zy.86edu.net/api/app/person/info',
  }

  getDomainApi(type) {
    return this.env('envUrl')
  }

  contentType(type) {
    if (type == 'json') {
      return "application/json"
    } else {
      return "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  //请求体BUG提示
  getMessage(err, type) {
    let isArr = typeof err == 'object' && err.constructor == Array;
  }

  setToken() {
    return { accesstoken: (this.storage('accesstoken') || 'SUPER_ADMIN_TOKEN_FOR_GAOKAO') }
  }

}

export default new webapi();