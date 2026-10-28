<script setup>
import { AppErrorMessage } from '../app-error-message'
import { Typography } from '../typography'

defineProps({
  type: {
    type: String,
    default: 'text',
  },
  labelText: {
    type: String,
  },
  errorMessage: {
    type: [String, null],
  },
  hintMessage: {
    type: String,
  },
})

defineOptions({
  inheritAttrs: false,
})

defineEmits(['blur', 'focus', 'input'])

const model = defineModel()
</script>

<template>
  <div class="app-input">
    <label v-if="labelText" class="app-input__item">
      <div class="app-input__label-row">
        <Typography tag="span" class="app-input__label">{{
          labelText
        }}</Typography>
        <slot name="label-action"></slot>
      </div>
      <input
        :type="type"
        v-model="model"
        v-bind="$attrs"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @input="$emit('input')"
        class="app-input__input"
        :class="{ 'app-input__input--invalid': errorMessage }"
      />
    </label>

    <AppErrorMessage
      v-if="errorMessage"
      :message="errorMessage"
      class="app-input__message"
    ></AppErrorMessage>

    <div v-else-if="hintMessage" class="app-input__message">
      <Typography tag="span" size="sm" color="secondary" weight="medium">{{
        hintMessage
      }}</Typography>
    </div>

    <div v-else class="app-input__message"></div>
  </div>
</template>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.app-input__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.app-input__label-row {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  flex-wrap: wrap;
}
.app-input__input {
  background-color: var(--color-white);
  outline: none;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid var(--color-primary);
  font-size: var(--font-size-sm);
  color: var(--color-primary);

  &::placeholder {
    color: var(--color-secondary);
  }

  &:autofill {
    -webkit-text-fill-color: var(--color-primary);
  }

  &:focus {
    border-color: var(--color-purple-opacity-50);
    box-shadow: 0 0 0 2px var(--color-purple-opacity-50);
  }

  &--invalid {
    background-color: var(--color-red-opacity-10);
    border-color: var(--color-red);
  }
}

.app-input__message {
  min-height: 1.5rem;
}
</style>
