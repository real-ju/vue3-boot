import moment from 'moment';

export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了'];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// 将{name:'zs',age:13}转换为?name=zs&age=13
export function json2Str(json: Record<string, string>) {
  if (JSON.stringify(json) === '{}') {
    return '';
  }
  let str = '?';
  for (const k in json) {
    str += `${k}=${json[k]}&`;
  }
  // 去掉末尾&
  str = str.slice(0, str.length - 1);
  // 转义字符
  str = encodeURI(str);
  return str;
}

/**
 * @function 字符串格式化为日期对象
 * @param { moment.MomentInput } date 日期
 * @param {String} format 日期格式
 * @returns { moment.MomentInput } 被格式化的日期对象
 */
export function str2date(date: moment.MomentInput, format: string): moment.MomentInput {
  return Boolean(date) ? moment(date, format ?? 'YYYY-MM-DD HH:mm:ss') : null;
}

/**
 * @function 将日期对象格式化为字符串
 * @param { moment.MomentInput } date 日期
 * @param {String} format 日期格式
 * @returns {String} 被格式化的字符串
 */
export function date2str(date: moment.MomentInput, format: string): string {
  return Boolean(date) ? moment(date).format(format ?? 'YYYY-MM-DD HH:mm:ss') : '';
}

/**
 * @function 根据查询键、查询值、结果键、数组集合，查找结果值
 * @description 使用示例：getNamebyCode('code', value, 'name', list)
 * @param {String} codeKey 查询键
 * @param {String} codeValue 查询值
 * @param {String} nameKey 结果键
 * @param {Array} list 数组集合
 * @returns {String} 结果值
 */
export function getNamebyCode(
  codeKey: string | number,
  codeValue: string | number | null | undefined,
  nameKey: string | string[],
  list: any[] | null | undefined
): string {
  if (!Boolean(codeValue) || !Boolean(list) || list?.length === 0) {
    return '';
  } else {
    const target = list?.filter((item: Record<string, any>) => item[codeKey] === codeValue) ?? [];
    if (target.length > 0) {
      if (typeof nameKey === 'string') {
        return target[0][nameKey];
      } else {
        const item: string[] = [];
        nameKey.forEach(key => {
          item.push(target[0][key]);
        });
        return item.join('|');
      }
    } else {
      return '';
    }
  }
}

export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target ?? document.body;
  let { className } = targetEl;
  className = className.replace(clsName, '');
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}

const docEle = document.documentElement;
export function setCssVar(prop: string, val: any, dom = docEle) {
  dom.style.setProperty(prop, val);
}
