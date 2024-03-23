import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/admin/umsUser/login',
    method: 'post',
    data: data
  });
}

export function getInfo(token) {
  return request({
    url: '/admin/umsUser/info',
    method: 'get',
    params: { token }
  });
}

export function logout(token) {
  return request({
    url: '/admin/umsUser/logout?token=' + token,
    method: 'post'
  });
}
