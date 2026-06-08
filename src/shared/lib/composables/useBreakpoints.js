import { onMounted, onUnmounted, ref } from "vue";
import breakpoints from '@/shared/styles/_breakpoints.module.scss'

export function useBreakpoints() {
  const isMobile = ref(false);

  const mobileWidthMediaQuery = window.matchMedia(`(max-width: ${breakpoints.mobile})`);

  const updateFlags = () => {
    isMobile.value = mobileWidthMediaQuery.matches;
    console.log(breakpoints)
  };

  onMounted(() => {
    updateFlags();
    mobileWidthMediaQuery.addEventListener('change', updateFlags);
  });

  onUnmounted(() => {
    mobileWidthMediaQuery.removeEventListener('change', updateFlags);
  });

  return { isMobile };
}
