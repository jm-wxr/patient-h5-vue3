import CpNavBar from '@/components/CpNavBar.vue'
import type CpRadioBtn from '@/components/CpRadioBtn.vue'
import SvgIcon from '@/components/SvgIcon.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    SvgIcon: typeof SvgIcon
    CpRadioBtn: typeof CpRadioBtn
  }
}
