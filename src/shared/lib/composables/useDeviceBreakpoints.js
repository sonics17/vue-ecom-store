import { useBreakpoints } from '@vueuse/core'
import scssBreakpoints from '@/shared/styles/breakpoints.module.scss'

export function useDeviceBreakpoints() {
  const breakpoints = useBreakpoints({
    mobile: parseInt(scssBreakpoints.mobile, 10),
    tablet: parseInt(scssBreakpoints.tablet, 10),
  })

  const isMobile = breakpoints.smaller('mobile')
  const isTablet = breakpoints.between('mobile', 'tablet')
  const isDesktop = breakpoints.greaterOrEqual('tablet')

  return { isMobile, isTablet, isDesktop }
}
