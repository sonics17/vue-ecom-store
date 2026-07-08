<template>
  <div class="app-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/_variables.scss" as *;

.app-container {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: $breakpoint-tablet) {
    padding: 0 12px;
  }
}
</style>