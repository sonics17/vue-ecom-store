<script setup>
import { ref } from "vue";
import { useCategoryStore } from "@/entities/category/model/store";
import { SearchProducts } from "@/features/search-products";
import logoUrl from "@/shared/assets/images/logo.svg";
import { AppButton } from "@/shared/ui/base/app-button/index.js";
import { AppContainer } from "@/shared/ui/base/app-container/index.js";
import { IconCart, IconUser, IconHeart } from "@/shared/ui/icons";
import HeaderDropdown from "./HeaderDropdown.vue";
import { CategoryLink } from "@/entities/category";

const categoryStore = useCategoryStore();

const activeCategory = ref(null);
</script>

<template>
  <header class="header">
    <AppContainer class="header__container">
      <RouterLink to="/" class="header__logo">
        <img :src="logoUrl" alt="Logo" />
      </RouterLink>

      <nav v-if="!categoryStore.isLoading" class="header__nav">
        <div
          class="header__nav-item"
          v-for="category in categoryStore.rootCategories"
          :key="category.id"
          @mouseenter="activeCategory = category.id"
          @mouseleave="activeCategory = null"
          @click="activeCategory = null"
        >

          <CategoryLink
            :root-slug="category.slug"
            color="secondary"
            class="header__link"
            :class="{ 'header__link--active': activeCategory === category.id }"
          >
            {{ category.name }}
          </CategoryLink>
          

          <Transition name="dropdown">
            <HeaderDropdown
              v-if="activeCategory === category.id"
              class="dropdown"
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
  border-bottom: 1px solid var(--color-medium-gray);
  position: relative;
  background-color: var(--color-white);
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
  display: block;
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

.header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dropdown {
  z-index: 100;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transform: translateY(0);
  transition: opacity .2s ease, transform .2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  z-index: -1;
  opacity: 0;
  transform: translateY(-15px);
}
</style>
