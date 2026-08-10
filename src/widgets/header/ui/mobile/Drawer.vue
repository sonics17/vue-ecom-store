<script setup>
import { CategoryLink } from '@/entities/category'
import { useCategoryStore } from '@/entities/category/model/store'
import { ChevronToggle } from '@/shared/ui/base/chevron-toggle'
import { Typography } from '@/shared/ui/base/typography'
import { IconCart, IconHeart, IconUser } from '@/shared/ui/icons'
import { ref } from 'vue'

const isOpen = defineModel('isOpen', { type: Boolean })

const closeDrawer = () => {
  isOpen.value = false
}

const categoryStore = useCategoryStore()

const openedCategories = ref([])

const toggleCategory = categoryId => {
  const index = openedCategories.value.indexOf(categoryId)

  if (index > -1) {
    openedCategories.value.splice(index, 1)
  } else {
    openedCategories.value.push(categoryId)
  }
}

const isDropdownOpen = categoryId => {
  return openedCategories.value.includes(categoryId)
}
</script>

<template>
  <div class="drawer" :class="{ 'drawer--open': isOpen }">
    <nav class="drawer-nav">
      <Typography
        tag="span"
        size="lg"
        color="secondary"
        class="drawer-nav__title"
      >
        Categories
      </Typography>

      <ul class="drawer-nav__root-list">
        <li
          v-for="rootCategory in categoryStore.rootCategories"
          :key="rootCategory.id"
          class="drawer-nav__root-item"
        >
          <div class="link-container">
            <CategoryLink
              :root-slug="rootCategory.slug"
              color="secondary"
              @click="closeDrawer"
              class="drawer-nav__root-link"
            >
              {{ rootCategory.name }}
            </CategoryLink>

            <ChevronToggle
              v-if="rootCategory.subCategories.length"
              :is-open="isDropdownOpen(rootCategory.id)"
              class="chevron"
              @toggle="toggleCategory(rootCategory.id)"
            ></ChevronToggle>
          </div>

          <Transition name="expand">
            <ul
              class="drawer-nav__sub-list"
              v-if="
                rootCategory.subCategories.length &&
                isDropdownOpen(rootCategory.id)
              "
            >
              <li
                v-for="subCategory in rootCategory.subCategories"
                :key="subCategory.id"
                class="drawer-nav__sub-item"
              >
                <CategoryLink
                  :root-slug="rootCategory.slug"
                  :slug="subCategory.slug"
                  color="secondary"
                  @click="closeDrawer"
                  class="drawer-nav__sub-link"
                >
                  {{ subCategory.name }}
                </CategoryLink>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>

    <span class="divider"></span>

    <div class="drawer-actions">
      <RouterLink
        :to="{ name: 'catalog' }"
        class="drawer-actions__link"
        @click="closeDrawer"
      >
        <IconHeart></IconHeart>
        <Typography tag="span" color="secondary">Favourites</Typography>
      </RouterLink>

      <RouterLink
        :to="{ name: 'catalog' }"
        class="drawer-actions__link"
        @click="closeDrawer"
      >
        <IconCart></IconCart>
        <Typography tag="span" color="secondary">Cart</Typography>
      </RouterLink>

      <RouterLink
        :to="{ name: 'catalog' }"
        class="drawer-actions__link"
        @click="closeDrawer"
      >
        <IconUser></IconUser>
        <Typography tag="span" color="secondary">My Account</Typography>
      </RouterLink>
    </div>
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
.drawer-nav__root-link,
.drawer-nav__sub-link,
.drawer-nav__title {
  display: block;
}
.drawer-nav__title {
  margin-bottom: 10px;
}
.drawer-nav__root-link,
.drawer-nav__sub-link {
  padding: 4px 30px 4px 0;
}
.drawer-nav__sub-list {
  margin-left: 10px;
}
.drawer-nav__root-item {
  position: relative;
  padding: 5px 0;
}
.drawer-nav__sub-item {
  padding: 5px 0;
}

.link-container {
  position: relative;
  display: block;
}
.chevron {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.divider {
  display: block;
  height: 1px;
  border-radius: 2px;
  margin: 20px 0;
  background-color: var(--color-secondary);
  opacity: 50%;
}

.drawer-actions__link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 9px 0;
  color: var(--color-secondary);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
