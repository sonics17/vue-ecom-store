<script setup>
import { AppContainer } from "@/shared/ui/base/app-container";
import { Typography } from "@/shared/ui/base/typography";

defineProps({
  parentSlug: String,
  subCategories: Array,
});
</script>

<template>
  <div class="dropdown">
    <AppContainer>
      <ul class="dropdown__list">
        <li
          v-for="subCategory in subCategories"
          :key="subCategory.id"
          class="dropdown__item"
        >
          <RouterLink
            @click="$emit('close')"
            :to="{ name: 'catalog', params: {rootCategory: parentSlug, subCategory: subCategory.slug}}"
            class="dropdown__link"
          >
            <Typography tag="span" color="secondary">{{
              subCategory.name
            }}</Typography>
          </RouterLink>
        </li>
      </ul>
    </AppContainer>
  </div>
</template>

<style scoped>
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-top: 1px solid var(--color-secondary);
  background-color: var(--color-light-gray);
  padding: 25px 0;
  border-radius: 5px;
  z-index: 100;
}

.dropdown::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 35px;
  background-color: transparent;
}

.dropdown__list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 120px;
  gap: 10px 20px;
}

.dropdown__link:hover {
  text-shadow:
    0.2px 0 0 currentColor,
    -0.2px 0 0 currentColor;
}
</style>
