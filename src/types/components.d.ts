import CpNavBar from '@/components/CpNavBar.vue'
import SvgIcon from '@/components/SvgIcon.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    SvgIcon: typeof SvgIcon
  }
}
