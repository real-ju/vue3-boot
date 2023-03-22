import type { App } from 'vue';
import jquery from 'jquery';
import moment from 'moment';
import * as echarts from 'echarts';
import NP from 'number-precision';
NP.enableBoundaryChecking(false);
// 可以计算加减乘除（plus，minus，times, divides）以及求相近值（strip, round）

// NP.strip(num)         // strip a number to nearest right number
// NP.plus(num1, num2, num3, ...)   // addition, num + num2 + num3, two numbers is required at least.
// NP.minus(num1, num2, num3, ...)  // subtraction, num1 - num2 - num3
// NP.times(num1, num2, num3, ...)  // multiplication, num1 * num2 * num3
// NP.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
// NP.round(num, ratio)  // round a number based on ratio

export function setupPlugins(app: App<Element>) {
  app.config.globalProperties.$ = jquery;
  app.config.globalProperties.$moment = moment;
  app.config.globalProperties.$echarts = echarts;
  app.config.globalProperties.$numcalc = NP;
}

process.env.NODE_ENV !== 'production' && console.warn('[plugins] NOTICE: plugins use globalProperties');
