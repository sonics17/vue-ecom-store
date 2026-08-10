<script setup>
import { ref, watch } from 'vue'
import { CollapsibleSection } from '@/shared/ui/collapsible-section'
import { RangeSlider } from '@/shared/ui/range-slider'

const props = defineProps({
  availableMin: {
    type: Number,
    default: 0,
  },
  availableMax: {
    type: Number,
    default: 1000000,
  },
  minPrice: {
    type: Number,
    default: null,
  },
  maxPrice: {
    type: Number,
    default: null,
  },
})

const localPriceRange = ref([0, 0])

const emit = defineEmits(['update-min', 'update-max'])

const validateInput = inputType => {
  localPriceRange.value[0] = Math.floor(localPriceRange.value[0])
  localPriceRange.value[1] = Math.round(localPriceRange.value[1])

  if (inputType === 'min') {
    if (localPriceRange.value[0] > localPriceRange.value[1]) {
      localPriceRange.value[0] = localPriceRange.value[1]
    }
    if (localPriceRange.value[0] < props.availableMin) {
      localPriceRange.value[0] = props.availableMin
    }
  }

  if (inputType === 'max') {
    if (localPriceRange.value[1] < localPriceRange.value[0]) {
      localPriceRange.value[1] = localPriceRange.value[0]
    }

    if (localPriceRange.value[1] > props.availableMax) {
      localPriceRange.value[1] = props.availableMax
    }
  }
}

const applyPrice = inputType => {
  if (inputType === 'min') emit('update-min', localPriceRange.value[0])
  if (inputType === 'max') emit('update-max', localPriceRange.value[1])
}

const handleBlur = inputType => {
  validateInput(inputType)
  applyPrice(inputType)
}

watch(
  [() => props.minPrice, () => props.maxPrice],
  ([newMin, newMax]) => {
    const min = newMin !== null ? newMin : props.availableMin
    const max = newMax !== null ? newMax : props.availableMax

    localPriceRange.value = [min, max]

    validateInput('min')
    validateInput('max')
  },
  { immediate: true },
)

watch(
  [() => props.availableMin, () => props.availableMax],
  ([newMin, newMax]) => {
    const min = props.minPrice === null ? newMin : props.minPrice
    const max = props.maxPrice === null ? newMax : props.maxPrice

    localPriceRange.value = [min, max]
    validateInput('min')
    validateInput('max')
  },
  { immediate: true },
)

// watch(
//   [() => localPriceRange.value[0], () => localPriceRange.value[1]],
//   () => {
//     console.log('localPriceRange!', localPriceRange.value)
//   },
//   { deep: true, immediate: true },
// )
</script>
<template>
  <CollapsibleSection title="Price">
    <RangeSlider
      :min="availableMin"
      :max="availableMax"
      class="range-slider"
      v-model="localPriceRange"
      @change="applyPrice"
    ></RangeSlider>

    <div class="price-filter__inputs">
      <div class="price-filter__input-wrapper">
        <span class="price-filter__price-prefix">$</span>
        <input
          type="number"
          name="manualMin"
          id="manual-min"
          :min="availableMin ?? 0"
          :max="availableMax ?? 0"
          v-model="localPriceRange[0]"
          @blur="handleBlur('min')"
          @keyup.enter="handleBlur('min')"
          class="price-filter__input"
          :style="{ width: `${String(localPriceRange[0]).length}ch` }"
        />
      </div>
      <div class="price-filter__input-wrapper">
        <span class="price-filter__price-prefix">$</span>
        <input
          type="number"
          name="manualMax"
          id="manual-max"
          :min="availableMin ?? 0"
          :max="availableMax ?? 0"
          v-model="localPriceRange[1]"
          @blur="handleBlur('max')"
          @keyup.enter="handleBlur('max')"
          class="price-filter__input"
          :style="{ width: `${String(localPriceRange[1]).length}ch` }"
        />
      </div>
    </div>
  </CollapsibleSection>
</template>

<style lang="scss" scoped>
.range-slider {
  margin-bottom: 32px;
}

.price-filter__inputs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.price-filter__input-wrapper {
  border: 1px solid var(--color-medium-gray);
  border-radius: 8px;
  padding: 7px;
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex-basis: 50%;
}

.price-filter__input {
  border: none;
  outline: none;
  background: transparent;
  padding: 0;

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: none;
  }
}
</style>
