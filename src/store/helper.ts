/**
 * 从globEager导入的模块路径解析文件名
 * @param path 模块路径
 */
export function resolveFileNameFromPath(path: string): string {
  let arr1 = path.split('/');
  let arr2 = arr1[arr1.length - 1].split('.');
  return arr2[0];
}
