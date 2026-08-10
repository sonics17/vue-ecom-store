<script setup>
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints.js'
import HeaderDesktop from './desktop/HeaderDesktop.vue'
import HeaderMobile from './mobile/HeaderMobile.vue'

const { isDesktop } = useDeviceBreakpoints()
</script>

<template>
  <HeaderMobile v-if="!isDesktop"></HeaderMobile>
  <HeaderDesktop v-else></HeaderDesktop>
</template>

<style scoped></style>
