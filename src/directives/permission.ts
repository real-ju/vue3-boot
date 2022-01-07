import type { App, Directive } from 'vue';

const permissionDirective: Directive = function (el, binding) {
  if (binding.value != binding.oldValue) {
    let pers: string[] = [];
    let hasPer = true;

    // 判断是否有权限
    let value = binding.value;
    if (typeof value === 'string') {
      hasPer = pers.indexOf(value) === -1 ? false : true;
    } else if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        const item = value[index];
        if (pers.indexOf(item) == -1) {
          hasPer = false;
          break;
        }
      }
    } else {
      throw 'v-per指令参数类型错误';
    }

    // 没有权限的操作
    if (!hasPer) {
      let arg = binding.arg || 'hide';
      if (arg === 'hide') {
        el.style.display = 'none';
        el.innerHTML = '';
      } else if (arg === 'blur') {
        el.style.visibility = 'hidden';
        setTimeout(() => {
          let elWidth = el.clientWidth;
          let elHeight = el.clientHeight;
          el.style.display = 'none';
          el.style.visibility = 'visible';
          el.style.width = elWidth + 'px';
          el.style.height = elHeight + 'px';
          el.style.position = 'relative';
          el.innerHTML = `<div style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; background-color: white; opacity: 0.5; display: flex; justify-content: center; align-items: center; overflow: hidden;"><div style="font-size: 14px"><i class="el-icon-circle-close" style="margin-right: 5px"></i>无权限</div></div>`;
          el.style.display = 'block';
        }, 100);
      }
    }
  }
};

export function setupPermissionDirective(app: App) {
  app.directive('per', permissionDirective);
}

export default permissionDirective;
