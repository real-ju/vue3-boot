import axiosInstance from '@/config/axios'

class Api {
    constructor(options) {
        this.name = options.name;
        this.url = options.url;
        this.public = options.public || false;
        this.loading = {
            get: false,
            post: false,
            put: false,
            delete: false
        }
        this.reqData = null;
        this.res = null;
    }

    get(...args) {
        let appendUrl = null;
        let query = null;

        if(args.length === 1) {
            query = args[0];
        }
        else if(args.length === 2) {
            appendUrl = args[0];
            query = args[1];
        }

        return this.request(appendUrl, 'get', query)
    }

    post(...args) {
        let appendUrl = null;
        let data = null;

        if(args.length === 1) {
            data = args[0];
        }
        else if(args.length === 2) {
            appendUrl = args[0];
            data = args[1];
        }

        return this.request(appendUrl, 'post', data)
    }

    put(...args) {
        let appendUrl = null;
        let data = null;

        if(args.length === 1) {
            data = args[0];
        }
        else if(args.length === 2) {
            appendUrl = args[0];
            data = args[1];
        }

        return this.request(appendUrl, 'put', data)
    }

    delete(...args) {
        let appendUrl = null;
        let data = null;

        if(args.length === 1) {
            data = args[0];
        }
        else if(args.length === 2) {
            appendUrl = args[0];
            data = args[1];
        }

        return this.request(appendUrl, 'delete', data)
    }

    request(append = null, method = 'get', data = null) {
        if(append) {
            this.appendUrl(append);
        }

        this.reqData = data;

        if(method === 'get') {
            data = { params: data }
        }
        else if(method === 'delete') {
            data = { data }
        }

        let axios = axiosInstance;
        if(this.public) {
            axios = axios.public;
        }

        return new Promise((resolve, reject) => {
            this.loading[method] = true;
            this.res = null;

            axios[method](this.url, data)
            .then(res => {
                this.res = res.data;
                resolve(res.data);
                this.loading[method] = false;
            })
            .catch(error => {
                reject(error.response);
                this.loading[method] = false;
            })
        })
    }

    setUrl(url = '') {
        this.url = url;
    }

    appendUrl(str = '') {
        this.url += str;
    }
}

export default Api
