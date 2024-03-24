import request from '@/utils/request';

/**
 * 登录
 * @param data
 * @returns {*}
 */
export function login(data) {
  return request({
    url: '/admin/umsUser/login',
    method: 'post',
    data: data
  });
}

/**
 * 获取用户角色权限
 * @param token
 * @returns {*}
 */
export function getInfo(token) {
  return request({
    url: '/admin/umsUser/info',
    method: 'get',
    params: { token }
  });
}

/**
 * 退出
 * @returns {*}
 */
export function logout() {
  return request({
    url: '/admin/umsUser/logout',
    method: 'post'
  });
}
