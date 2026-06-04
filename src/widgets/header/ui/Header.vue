<script setup>
import { useCategoryStore } from '@/entities/category/model/store';
import { SearchProducts } from '@/features/search-products';
import logoUrl from '@/shared/assets/images/logo.svg'
import { AppButton } from '@/shared/ui/base/AppButton';
import { AppContainer } from '@/shared/ui/base/AppContainer';
import { IconCart, IconUser, IconHeart } from '@/shared/ui/icons';

const categoryStore = useCategoryStore();

</script>

<template>
  <header class="header">
    <AppContainer class="header__container">
      <RouterLink to="/">
        <img :src="logoUrl" alt="Logo" class="header__logo">
      </RouterLink>

      <nav v-if="!categoryStore.isLoading" class="header__nav">
        <RouterLink 
          v-for="category in categoryStore.rootCategories"
          :key="category.id"
          :to="{name: 'catalog', params: {rootCategory: category.slug}}"
          class="header__nav-link"
        >
          {{ category.name }}
        </RouterLink>
      </nav>

      <SearchProducts class="header__search" />

      <div class="header__actions">
        <AppButton variant="icon" color="gray"><IconHeart/></AppButton>
        <AppButton variant="icon" color="gray"><IconUser/></AppButton>
        <AppButton variant="icon" color="gray"><IconCart/></AppButton>
      </div>
    </AppContainer>
  </header>
</template>

<style scoped>
.header {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-secondary)
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__actions {
  display: flex;
}
</style>