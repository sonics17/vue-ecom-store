<script setup>
import { onMounted } from 'vue';
import ColorFilter from './ColorFilter.vue';
import PriceFilter from './PriceFilter.vue';
import SizeFilter from './SizeFilter.vue';
import { useFilterStore } from '../model/store';

</script>

<template>
  <PriceFilter></PriceFilter>
  <ColorFilter></ColorFilter>
  <SizeFilter></SizeFilter>
</template>

<style scoped>

</style>