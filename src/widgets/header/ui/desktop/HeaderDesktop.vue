<script setup>
import { ref } from "vue";
import { useCategoryStore } from "@/entities/category/model/store";
import { SearchProducts } from "@/features/search-products";
import logoUrl from "@/shared/assets/images/logo.svg";
import { AppButton } from "@/shared/ui/base/app-button/index.js";
import { AppContainer } from "@/shared/ui/base/app-container/index.js";
import { Typography } from "@/shared/ui/base/typography/index.js";
import { IconCart, IconUser, IconHeart } from "@/shared/ui/icons";
import HeaderDropdown from "./HeaderDropdown.vue";

const categoryStore = useCategoryStore();

const activeCategory = ref(null);
</script>

<template>
  <header class="header">
    <AppContainer class="header__container">
      <RouterLink to="/">
        <img :src="logoUrl" alt="Logo" class="header__logo" />
      </RouterLink>

      <nav v-if="!categoryStore.isLoading" class="header__nav">
        <div
          class="header__nav-item"
          v-for="category in categoryStore.rootCategories"
          :key="category.id"
          @mouseenter="activeCategory = category.id"
          @mouseleave="activeCategory = null"
        >
          <RouterLink
            :to="{ name: 'catalog', params: { rootCategory: category.slug } }"
            class="header__link"
            :class="{ 'header__link--active': activeCategory === category.id }"
          >
            <Typography tag="span" color="secondary">{{
              category.name
            }}</Typography>
          </RouterLink>

          <Transition name="dropdown">
            <HeaderDropdown
              v-if="activeCategory === category.id"
              :sub-categories="category.subCategories"
              :parent-slug="category.slug"
              @close="activeCategory = null"
            ></HeaderDropdown>
          </Transition>
        </div>
      </nav>

      <SearchProducts class="header__search" />

      <div class="header__actions">
        <AppButton variant="icon" color="gray"><IconHeart /></AppButton>
        <AppButton variant="icon" color="gray"><IconUser /></AppButton>
        <AppButton variant="icon" color="gray"><IconCart /></AppButton>
      </div>
    </AppContainer>
  </header>
</template>

<style scoped>
.header {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-secondary);
  position: relative;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__nav {
  display: flex;
  gap: 20px;
}

.header__link--active {
  text-shadow:
    0.2px 0 0 currentColor,
    -0.2px 0 0 currentColor;
}

.header__link {
  position: relative;
  display: inline-block;
  padding: 5px 0;
}

.header__link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-secondary);
  border-radius: 10px;
  transform: scaleX(0);
  transition: transform 0.2s ease-in-out;
}

.header__link--active::after {
  transform: scaleX(1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}

.dropdown-enter-active {
  transition: opacity 0.25s ease-out;
}

.dropdown-leave-active {
  transition: opacity 0.15s ease-in;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
}

.header__actions {
  display: flex;
  gap: 12px;
}
</style>
