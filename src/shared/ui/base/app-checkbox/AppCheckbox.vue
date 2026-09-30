<script setup>
import { IconCheckMark } from '../../icons'
import { Typography } from '../typography'

const model = defineModel()
</script>

<template>
  <label class="app-checkbox">
    <input v-model="model" type="checkbox" class="app-checkbox__input" />
    <span class="app-checkbox__visual">
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
}
.app-checkbox__input {
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

.app-checkbox__visual {
  width: 18px;
  height: 18px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-checkbox__input:checked + .app-checkbox__visual {
  background-color: var(--color-primary);
  .app-checkbox__checkmark {
    opacity: 1;
    color: var(--color-white);
  }
}

.app-checkbox__checkmark {
  opacity: 0;
}
.app-checkbox__input:focus-visible + .app-checkbox__visual {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  border-color: var(--color-primary, #007bff);
}
</style>
