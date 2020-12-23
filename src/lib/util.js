/* 数组 */

const arr = {
    // 取数组最后一个元素（引用）
    lastItem(arr = []) {
        return arr[arr.length - 1]
    },

    // 判断数组是否为空
    isEmpty(arr = []) {
        return !arr.length
    }
}



/* 对象 */

const obj = {
    // 通过规则过滤某个对象，规则回调函数返回true或者没有对应规则的属性组成新的对象
    filter(obj = {}, rules = {}) {
        let rst = {};
        for(let key in obj) {
            if(key in rules) {
                let callback = rules[key];
                if(callback(obj[key])) {
                    rst[key] = obj[key];
                }
            }
            else {
                rst[key] = obj[key];
            }
        }

        return rst
    }
}



/* 数学计算 */

const math = {
    /**
     * 计算两个数组的笛卡尔乘积
     * @param {Array} a
     * @param {Array} b
     * @return {Array} 组合值二维数组
     */
    cartesian(a = [], b = []) {
        let rst = []
        a.forEach(item1 => {
            b.forEach(item2 => {
                rst.push([].concat(item1, item2));
            })
        })

        return rst
    }
}

export default {
    arr,
    obj,
    math
}
