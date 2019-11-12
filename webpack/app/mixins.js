import config from 'lib/config';
export default {
  data() {
    return {
      baseSize:config.getEnvName()
    }
  },
  methods: {
    session(key, value, type) {
      if (type) {
        sessionStorage.removeItem(key);
      } else {
        if (!!value) {
          return sessionStorage.setItem(key, JSON.stringify(value));
        } else {
          let val = sessionStorage.getItem(key) || "";
          return (val && JSON.parse(val)) || "";
        }
      }
    },
    storage(key, value, type) {
      if (type) {
        localStorage.removeItem(key);
      } else {
        if (!!value) {
          return localStorage.setItem(key, JSON.stringify(value));
        } else {
          let val = localStorage.getItem(key) || "";
          return (val && JSON.parse(val)) || "";
        }
      }
    }
  },
  toHref(href, target, obj) {
    let el = document.createElement("a");
    document.body.appendChild(el);
    el.href = href;
    if (obj) {
      let parm = href.includes('?') ? '' : '?';
      for (let item in obj) {
        parm += `${item}=${obj[item]}&`;
      }
      parm = parm.substring(0, parm.length - 1);
      el.href += parm;
    }
    if (!target) {
      el.target = '_blank';
    }
    el.click();
    document.body.removeChild(el);
  },
  getUrlParame(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
  }
}