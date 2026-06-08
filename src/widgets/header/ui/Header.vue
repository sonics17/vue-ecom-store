<script setup>
import { ref } from "vue";
import { useBreakpoints } from "@/shared/lib/composables/useBreakpoints";
import HeaderDesktop from "./desktop/HeaderDesktop.vue";
import HeaderMobile from "./mobile/HeaderMobile.vue";

const { isMobile } = useBreakpoints()
</script>

<template>
  <HeaderMobile v-if="isMobile"></HeaderMobile>
  <HeaderDesktop v-else></HeaderDesktop>
</template>

<style scoped></style>
