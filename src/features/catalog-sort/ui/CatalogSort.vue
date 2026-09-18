<script setup>
import { computed, ref } from 'vue'
import { SORT_OPTIONS, DEFAULT_SORT_OPTION } from '../model/constants'
import { AppButton } from '@/shared/ui/base/app-button'
import { IconSort } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/base/typography'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'

const { isDesktop } = useDeviceBreakpoints()

const props = defineProps({
  sortOption: {
    type: String,
    default: DEFAULT_SORT_OPTION,
  },
})

const isOpen = ref(false)
const emit = defineEmits(['change'])

const selected = computed({
  get: () => props.sortOption,
  set: value => emit('change', value),
})

const currentLabel = computed(() => {
  const option = SORT_OPTIONS.find(option => option.value === props.sortOption)
  return option ? option.label : 'Sort'
})

const selectOption = value => {
  isOpen.value = false
  emit('change', value)
}
</script>

<template>
  <div class="catalog-sort">
    <div class="catalog-sort__trigger-wrapper">
      <AppButton
        color="white"
        class="catalog-sort__trigger-button"
        :class="{ 'catalog-sort__trigger-button--mobile': !isDesktop }"
        @click="isOpen = !isOpen"
      >
        {{ currentLabel }}
        <IconSort class="catalog-sort__icon"></IconSort>
      </AppButton>

      <select
        v-if="!isDesktop"
        v-model="selected"
        class="catalog-sort__mobile-select"
      >
        <option
          v-for="option in SORT_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <div v-if="isDesktop && isOpen" class="catalog-sort__dropdown">
      <label
        v-for="option in SORT_OPTIONS"
        :key="option.value"
        class="catalog-sort__option"
      >
        <input
          type="radio"
          :id="option.value"
          :value="option.value"
          name="option"
          v-model="selected"
          class="catalog-sort__radio-button"
          @click="selectOption(option.value)"
        />
        <Typography tag="span">{{ option.label }}</Typography>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.catalog-sort {
  position: relative;
}
.catalog-sort__trigger-button {
  border: 1px solid var(--color-medium-gray);
  color: var(--color-secondary) !important;
  white-space: nowrap;
}
.catalog-sort__trigger-button--mobile {
  width: 100%;
}
.catalog-sort__icon {
  width: 24px;
  height: 24px;
}

.catalog-sort__mobile-select {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.catalog-sort__dropdown {
  position: absolute;
  z-index: 15;
  background: var(--color-white);
  bottom: -12px;
  left: -20px;
  transform: translateY(100%);
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 5px 12px var(--color-medium-gray);
  padding: 8px 0;
}
.catalog-sort__option {
  display: flex;
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background-color: color-mix(in srgb, var(--color-purple) 10%, transparent);
  }
}
.catalog-sort__radio-button {
  margin-right: 10px;
  accent-color: var(--color-purple);
}
</style>
