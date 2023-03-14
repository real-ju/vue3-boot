import { httpRequest } from '@/utils/request';

const listApi = {
  pageQuery: '', // 列表查询
  handleDelete: '', // 列表删除
  batchDelete: '', // 列表批量删除
  handleAdd: '', // 列表新增
  handleEdit: '' // 列表编辑
};

/**
 * 列表
 * 分页查询
 * @param params
 */
export function pageQuery(params: any) {
  return httpRequest({
    url: listApi.pageQuery,
    method: 'get',
    params
  });
}
/**
 * 列表
 * 删除
 * @param params
 */
export function handleDelete(params: any) {
  return httpRequest({
    url: listApi.handleDelete,
    method: 'delete',
    params
  });
}
/**
 * 列表
 * 批量删除
 * @param params
 */
export function batchDelete(params: any) {
  return httpRequest({
    url: listApi.batchDelete,
    method: 'delete',
    data: params
  });
}
/**
 * 列表
 * 新增
 * @param params
 */
export function handleAdd(params: any) {
  return httpRequest({
    url: listApi.handleAdd,
    method: 'post',
    data: params
  });
}
/**
 * 列表
 * 编辑
 * @param params
 */
export function handleEdit(params: any) {
  return httpRequest({
    url: listApi.handleEdit,
    method: 'put',
    data: params
  });
}
