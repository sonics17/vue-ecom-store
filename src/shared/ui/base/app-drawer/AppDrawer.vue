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
  padding: 70px 60px 70px 30px;
  background-color: var(--color-white);
  overflow: scroll;
  z-index: 800;
  box-sizing: border-box;
  transform: translateX(100%);
  transition: all 0.3s ease-in;
  visibility: hidden;
}
.drawer--open {
  transform: translateX(0);
  visibility: visible;
}
</style>

<style>
body.drawer-open {
  overflow: hidden;
  height: 100dvh;
}
</style>
