<script setup>
import { ref, watch } from 'vue'
import { CategoryLink } from '..'
import { useCategoryStore } from '../model/store'
import { ChevronToggle } from '@/shared/ui/base/chevron-toggle'

const props = defineProps({
  activeCategoryId: {
    type: Number,
    default: null,
  },
})

const categoryStore = useCategoryStore()

const openCategoryId = ref(null)

const isOpen = rootCategoryId => {
  return openCategoryId.value === rootCategoryId
}

const toggleCategory = rootCategoryId => {
  if (openCategoryId.value === rootCategoryId) {
    openCategoryId.value = null
  } else {
    openCategoryId.value = rootCategoryId
  }
}

const isCategoryInRoot = (rootCategory, categoryId) => {
  return (
    rootCategory.id === categoryId ||
    rootCategory.subCategories.some(
      subCategory => subCategory.id === categoryId,
    )
  )
}

const isExactRootCategory = (rootCategory, categoryId) => {
  return rootCategory.id === categoryId
}

watch(
  () => props.activeCategoryId,
  newId => {
    if (newId === null) {
      openCategoryId.value = null
      return
    }

    for (const rootCategory of categoryStore.rootCategories) {
      if (isCategoryInRoot(rootCategory, newId)) {
        openCategoryId.value = rootCategory.id
        break
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="category-navigation">
    <ul class="category-navigation__root-list">
      <li
        v-for="rootCategory in categoryStore.rootCategories"
        class="category-navigation__root-item"
      >
        <div class="link-container">
          <CategoryLink
            :root-slug="rootCategory.slug"
            weight="semi-bold"
            size="sm"
            :color="
              isExactRootCategory(rootCategory, activeCategoryId)
                ? 'primary'
                : 'secondary'
            "
            :class="[
              'category-navigation__link',
              {
                'category-navigation__link--active': isExactRootCategory(
                  rootCategory,
                  activeCategoryId,
                ),
              },
            ]"
          >
            {{ rootCategory.name }}
          </CategoryLink>

          <ChevronToggle
            v-if="rootCategory.subCategories.length"
            :is-open="isOpen(rootCategory.id)"
            @toggle="toggleCategory(rootCategory.id)"
            class="chevron"
          ></ChevronToggle>
        </div>

        <Transition name="expand" appear>
          <ul
            v-if="rootCategory.subCategories.length && isOpen(rootCategory.id)"
            class="category-navigation__sub-list"
          >
            <li
              v-for="subCategory in rootCategory.subCategories"
              class="category-navigation__sub-item"
            >
              <CategoryLink
                :root-slug="rootCategory.slug"
                :slug="subCategory.slug"
                weight="semi-bold"
                size="sm"
                :color="
                  activeCategoryId === subCategory.id ? 'primary' : 'secondary'
                "
                :class="[
                  'category-navigation__link',
                  {
                    'category-navigation__link--active':
                      activeCategoryId === subCategory.id,
                  },
                ]"
              >
                {{ subCategory.name }}
              </CategoryLink>
            </li>
          </ul>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.category-navigation {
  border-top: none;
}

.category-navigation__root-item:not(:first-child) {
  margin-top: 15px;
}

.link-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-navigation__sub-list {
  margin-left: 10px;
}

.category-navigation__link {
  display: block;
  padding: 4px 30px 4px 0;
}

.category-navigation__link--active {
  text-shadow:
    0.2px 0 0 currentColor,
    -0.2px 0 0 currentColor;
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
  max-height: 500px;
  opacity: 1;
}
</style>
