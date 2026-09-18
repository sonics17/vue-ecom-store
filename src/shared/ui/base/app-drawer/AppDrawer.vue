<script setup>
import { watch, onUnmounted } from 'vue'

const isOpen = defineModel('isOpen', { type: Boolean })

watch(isOpen, isDrawerOpen => {
  if (isDrawerOpen) {
    document.body.classList.add('drawer-open')
  } else {
    document.body.classList.remove('drawer-open')
  }
})

onUnmounted(() => {
  document.body.classList.remove('drawer-open')
})
</script>

<template>
  <div class="drawer" :class="{ 'drawer--open': isOpen }">
    <button class="close-button" @click="isOpen = false"></button>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 70px 0 30px;
  background-color: var(--color-white);
  overflow: scroll;
  z-index: 1000;
  box-sizing: border-box;
  transform: translateX(100%);
  transition: all 0.3s ease-in;
  visibility: hidden;
}
.drawer--open {
  transform: translateX(0);
  visibility: visible;
}
.close-button {
  width: 44px;
  height: 44px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  position: absolute;
  top: 12px;
  right: 30px;
  transform: translateX(50%);
  z-index: 999;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--color-secondary);
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
}
</style>

<style>
body.drawer-open {
  overflow: hidden;
  height: 100vh;
}
</style>
