import SvgIcon from '@/components/SvgIcon/index.vue';// svg component

// 匹配 ./svg/ 文件夹下所有的 .svg 文件   eager: true 表示模块将会立即加载，而不是懒加载
import.meta.glob('./svg/*.svg', { eager: true });

export default SvgIcon;
