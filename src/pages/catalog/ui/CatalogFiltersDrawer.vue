<script setup>
import { AppButton } from '@/shared/ui/base/app-button'
import { ref, watch } from 'vue'
import { AppDrawer } from '@/shared/ui/base/app-drawer'
import CatalogFiltersForm from './CatalogFiltersForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { IconFilter } from '@/shared/ui/icons'

const route = useRoute()
const router = useRouter()

const isOpen = ref(false)
const isApplied = ref(false)
let initialCategory = {}
let initialQuery = {}

const openFilters = () => {
  initialCategory = { ...route.params }
  initialQuery = { ...route.query }
  isOpen.value = true
  isApplied.value = false
}

const applyFilters = () => {
  isApplied.value = true
  isOpen.value = false
}

watch(isOpen, newValue => {
  if (!newValue && !isApplied.value) {
    router.replace({ params: initialCategory, query: initialQuery })
  }
})
</script>

<template>
  <div class="catalog-drawer">
    <AppButton
      variant="solid"
      color="white"
      class="catalog-drawer__trigger-button"
      @click="openFilters"
    >
      Filters
      <IconFilter class="catalog-drawer__trigger-button-icon"></IconFilter>
    </AppButton>

    <AppDrawer v-model:is-open="isOpen" class="catalog-drawer__drawer">
      <div class="catalog-drawer__drawer-wrapper">
        <CatalogFiltersForm class="catalog-drawer__form" />
        <AppButton
          variant="solid"
          color="purple"
          class="catalog-drawer__apply-button"
          @click="applyFilters"
        >
          Apply
        </AppButton>
      </div>
    </AppDrawer>
  </div>
</template>

<style scoped>
.catalog-drawer__form {
  padding-bottom: 30px;
}
.catalog-drawer__trigger-button {
  border: 1px solid var(--color-medium-gray);
  color: var(--color-secondary) !important;
  width: 100%;
  font-size: var(--font-size-lg);
}
.catalog-drawer__button-icon {
  width: 17px;
  height: 19px;
}
.catalog-drawer__drawer-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.catalog-drawer__apply-button {
  position: sticky;
  bottom: 0px;
  align-self: center;
}
</style>
