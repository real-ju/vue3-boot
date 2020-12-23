import apis from './reg'

/**
 * Vue调用插件
 * @param {*} app
 * @param {Object} options
 */
const install = function(app, options) {
    app.mixin({
        data() {
            return {
                Api: {}
            }
        },
        created: function() {
            this.Api = apis;
        }
    })
}

export default { install }
