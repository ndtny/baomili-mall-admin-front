import store from '@/store';
import { defineComponent } from 'vue';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design
// 根据屏幕宽度判断设备类型（mobile 或 desktop），并根据判断结果对侧边栏进行控制
export default defineComponent({
  watch: {
    $route() {
      // 当设备为 mobile 并且侧边栏是打开状态时，通过 store 关闭侧边栏
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.app().closeSidebar({ withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    // 窗口 resize 事件监听器，当窗口大小改变时触发 resizeHandler 方法
    window.addEventListener('resize', this.resizeHandler);
  },
  // 移除窗口 resize 事件监听器
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  mounted() {
    // 判断当前设备是否为 mobile，如果是则通过 store 切换设备类型为 mobile，并关闭侧边栏
    const isMobile = this.isMobile();
    console.log('isMobile', isMobile);
    if (isMobile) {
      store.app().toggleDevice('mobile');
      store.app().closeSidebar({ withoutAnimation: true });
    }
  },
  methods: {
    // do not use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    // 用于处理窗口大小改变事件，切换设备类型并根据需要关闭侧边栏
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        store.app().toggleDevice(isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          store.app().closeSidebar({ withoutAnimation: true });
        }
      }
    }
  }
});
