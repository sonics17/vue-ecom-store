<script setup>
import { ref } from "vue";
import HeaderDesktop from "./desktop/HeaderDesktop.vue";
import HeaderMobile from "./mobile/HeaderMobile.vue";

const isMobile = ref(false);
</script>

<template>
  <HeaderMobile v-if="isMobile"></HeaderMobile>
  <HeaderDesktop v-else></HeaderDesktop>
</template>

<style scoped></style>
