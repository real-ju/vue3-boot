/**
 * 从路径或URL中解析文件名
 * @param path 路径或URL
 */
export function resolveFileNameFromPath(path: string): string {
  let arr1 = path.split('/');
  let arr2 = arr1[arr1.length - 1].split('.');
  return arr2[0];
}
