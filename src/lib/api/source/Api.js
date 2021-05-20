import axiosInstance from '@/config/axios'

class Api {
  constructor(options) {
    // this.name = options.name;
    this.url = options.url;
    this.method = options.method;
    this.public = options.public || false;

    let loading = null;
    if (Api.mode === 'common') {
      loading = false;
    } else if (Api.mode === 'restful') {
      loading = {
        get: false,
        post: false,
        put: false,
        delete: false,
      };
    }
    this.loading = loading;

    this.reqData = null; // 每次请求的数据
    this.res = null; // 每次响应的数据
  }

  // 普通模式下发起请求
  do(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, this.method, data);
  }

  // Restful模式下发起get请求
  get(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'get', data);
  }

  post(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'post', data);
  }

  put(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'put', data);
  }

  delete(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'delete', data);
  }

  // 处理请求参数。一个参数则为data；两个参数第一个为appendUrl，第二个为data
  _handleRequestParams(args) {
    let appendUrl = null;
    let data = null;

    if (args.length === 1) {
      data = args[0];
    } else if (args.length === 2) {
      appendUrl = args[0];
      data = args[1];
    }

    return {
      appendUrl,
      data,
    };
  }

  request(append = null, method = 'get', data = null) {
    Object.freeze(data);
    this.reqData = data;

    if (method === 'get') {
      data = { params: data };
    } else if (method === 'delete') {
      data = { data };
    }

    let axios = axiosInstance;

    if (this.public) {
      axios = axios.public; // 如果是公共接口,则使用public实例
    }

    let url = append ? this.url + append : this.url;

    return new Promise((resolve, reject) => {
      this._setLoading(true, method);
      this.res = null;

      axios[method](url, data)
        .then((res) => {
          Object.freeze(res.data);
          this.res = res.data;
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response);
        })
        .finally(() => {
          this._setLoading(false, method);
        });
    });
  }

  _setLoading(value, method) {
    if (Api.mode === 'common') {
      this.loading = value;
    } else if (Api.mode === 'restful') {
      this.loading[method] = value;
    }
  }

  setUrl(url = '') {
    this.url = url;
  }

  static _setApiMode(value) {
    Api.mode = value;
  }
}

Api.mode = ''; // 可选 common,restful

export default Api;
