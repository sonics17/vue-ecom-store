<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import { useCategoryStore } from '@/entities/category/model/store';

const route = useRoute();

const layouts = {
  MainLayout,
  AuthLayout
}

const currentLayout = computed(() => layouts[route.meta.layout] || MainLayout)

const categoryStore = useCategoryStore()
categoryStore.fetchCategories();

</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<style scoped></style>
