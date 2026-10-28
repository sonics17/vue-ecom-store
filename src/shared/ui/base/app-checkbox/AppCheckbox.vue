<script setup>
import { IconCheckMark } from '../../icons'
import { Typography } from '../typography'

const model = defineModel()

defineOptions({
  inheritAttrs: false,
})

defineEmits(['change'])
</script>

<template>
  <label class="app-checkbox">
    <input
      v-model="model"
      :disabled="$attrs['disabled']"
      type="checkbox"
      class="app-checkbox__checkbox"
      @change="$emit('change')"
    />
    <span class="app-checkbox__custom">
      <IconCheckMark class="app-checkbox__checkmark"></IconCheckMark>
    </span>
    <Typography
      tag="span"
      color="secondary"
      weight="medium"
      class="app-checkbox__text"
    >
      <slot></slot>
    </Typography>
  </label>
</template>

<style lang="scss" scoped>
.app-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:has(.app-checkbox__checkbox:disabled) {
    cursor: default;
  }
}
.app-checkbox__checkbox {
  appearance: none;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  outline: none;
}

.app-checkbox__custom {
  width: 18px;
  height: 18px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-checkbox__checkbox:checked + .app-checkbox__custom {
  background-color: var(--color-primary);

  .app-checkbox__checkmark {
    opacity: 1;
    color: var(--color-white);
  }
}

.app-checkbox__checkbox:disabled + .app-checkbox__custom {
  background-color: var(--color-light-gray);
  border-color: var(--color-medium-gray);
  cursor: default;
}

.app-checkbox__checkmark {
  opacity: 0;
}

.app-checkbox__checkbox:focus-visible + .app-checkbox__custom {
  outline: auto -webkit-focus-ring-color;
}
</style>
