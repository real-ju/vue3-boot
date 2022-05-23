const modules = import.meta.glob('../../views/**/*.vue'); // 这里只能用相对路径

/**
 * 异步导入页面级组件
 * @param {String} url 相对于/src/views文件夹的路径
 */
export function asyncViewImport(url: string) {
  return modules[`../../views/${url}`];
}
