<script setup>
import { computed, onMounted, useTemplateRef, watch } from 'vue'

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
})

const modelValue = defineModel({ type: Array, default: () => [0, 0] })

const emit = defineEmits(['change'])

const track = useTemplateRef('track')

let activeThumbIndex = null

const minPercent = computed(() => {
  let rawPercent =
    ((modelValue.value[0] - props.min) / (props.max - props.min)) * 100

  rawPercent = Number.isNaN(rawPercent) ? 0 : rawPercent
  return Math.max(0, Math.min(100, rawPercent))
})

const maxPercent = computed(() => {
  let rawPercent =
    ((modelValue.value[1] - props.min) / (props.max - props.min)) * 100

  rawPercent = Number.isNaN(rawPercent) ? 100 : rawPercent
  return Math.max(0, Math.min(100, rawPercent))
})

const calculateValueFromEvent = event => {
  const trackRect = track.value.getBoundingClientRect()
  const clickX = event.clientX - trackRect.left
  let percentage = clickX / trackRect.width
  percentage = Math.max(0, Math.min(percentage, 1))

  return Math.round(props.min + (props.max - props.min) * percentage)
}

const onTrackDown = event => {
  const clickValue = calculateValueFromEvent(event)

  const distanceToMin = Math.abs(clickValue - modelValue.value[0])
  const distanceToMax = Math.abs(clickValue - modelValue.value[1])

  activeThumbIndex = distanceToMin < distanceToMax ? 0 : 1

  if (distanceToMin === distanceToMax) {
    activeThumbIndex = clickValue < modelValue.value[0] ? 0 : 1
  }

  modelValue.value[activeThumbIndex] = clickValue

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}

const onPointerMove = event => {
  if (activeThumbIndex === null) return

  const newValue = calculateValueFromEvent(event)

  if (modelValue.value[0] === modelValue.value[1]) {
    if (newValue < modelValue.value[0]) {
      activeThumbIndex = 0
    } else if (newValue > modelValue.value[0]) {
      activeThumbIndex = 1
    }
  }

  if (activeThumbIndex === 0) {
    modelValue.value[0] = Math.min(newValue, modelValue.value[1])
  } else {
    modelValue.value[1] = Math.max(newValue, modelValue.value[0])
  }
}

const onPointerUp = () => {
  if (activeThumbIndex === null) return

  activeThumbIndex = null

  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)

  emit('change')
}
</script>

<template>
  <div class="price-filter__range-slider range-slider">
    <div
      ref="track"
      class="range-slider__track"
      @pointerdown.prevent="onTrackDown"
    >
      <div
        class="range-slider__fill"
        :style="{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }"
      ></div>

      <div
        class="range-slider__thumb range-slider__thumb--min"
        :style="{ left: `${minPercent}%` }"
      ></div>

      <div
        class="range-slider__thumb range-slider__thumb--max"
        :style="{ left: `${maxPercent}%` }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.range-slider__track {
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background-color: var(--color-secondary);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 24px;
    transform: translateY(-50%);
  }
}
.range-slider__fill {
  position: absolute;
  height: 100%;
  border-radius: 2px;
  background-color: var(--color-purple);
}
.range-slider__thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--color-purple);
  cursor: pointer;
  -webkit-user-drag: none;
}
</style>
