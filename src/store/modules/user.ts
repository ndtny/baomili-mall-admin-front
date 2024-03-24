import { defineStore } from 'pinia';
import { login as apiLogin, logout as apiLogout, getInfo as apiGetInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import tagsViewStore from './tagsView';
import permissionStore from './permission';

export interface IUserState {
  token: string;
  userId: string,
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
}

export default defineStore({
  id: 'user',
  state: ():IUserState => ({
    token: getToken(),
    userId: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  getters: {},
  actions: {
    // user login
    login(userInfo):Promise<void> {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        apiLogin({ identityId: username.trim(), credential: password }).then(({ data }) => {
          if (data && data.code === 200) {
            this.token = data.userName;
            setToken(data.userName);
          }
          resolve();
        }).catch(error => {
          ElMessage({
            message: '登陆失败',
            type: 'error',
            duration: 3000
          });
          reject(error);
        });
      });
    },

    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        apiGetInfo(this.token).then(({ data }) => {
          if (data && data.code === 200) {
            // roles must be a non-empty array
            if (!data.data.roles || data.data.roles.length <= 0) {
              reject('getInfo: roles must be a non-null array!');
            }
            this.roles = data.data.roles;
            this.name = data.data.name;
            this.avatar = data.data.avatar;
            this.introduction = data.data.introduction;
            resolve(data.data);
          }
        }).catch(error => {
          ElMessage({
            message: error.message,
            type: 'error',
            duration: 3000
          });
        });
      });
    },

    // user logout
    logout():Promise<void> {
      return new Promise((resolve, reject) => {
        apiLogout().then(() => {
          this.token = '';
          this.roles = [];
          removeToken();
          resetRouter();
          tagsViewStore().delAllViews();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // remove token
    resetToken() {
      this.token = '';
      this.roles = [];
      removeToken();
    },

    // dynamically modify permissions
    async changeRoles(role) {
      const token = role + '-token';

      this.token = token;
      setToken(token);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const infoRes = await this.getInfo() as any;
      let roles = [];
      if (infoRes.roles) {
        roles = infoRes.roles;
      }

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await permissionStore().generateRoutes(roles);
      // dynamically add accessible routes
      // router.addRoutes(accessRoutes);
      accessRoutes.forEach(item => {
        router.addRoute(item);
      });

      // reset visited views and cached views
      tagsViewStore().delAllViews();
    }
  }
});
