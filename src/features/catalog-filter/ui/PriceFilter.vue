<script setup>
import { computed, onMounted, ref } from 'vue';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { useFilterStore } from '../model/store';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const filterStore = useFilterStore();

let debounceTimer = null;

const updateRouteQuery = (queryChanges) => {
  clearTimeout(debounceTimer);
  
  debounceTimer = setTimeout(() => {
    console.log("PRICE FILTER SET")
    router.push({
      query: {
        ...route.query,
        ...queryChanges
      }
    });
  }, 300);
};


const localMinPrice = computed({
  get() {
    return route.query.minPrice ? Number(route.query.minPrice) : filterStore.availableFilters.minPrice
  },
  set(newValue) {
    updateRouteQuery({ minPrice: newValue });
  }
});

const localMaxPrice = computed({
  get() {
    return route.query.maxPrice ? Number(route.query.maxPrice) : filterStore.availableFilters.maxPrice
  },
  set(newValue) {
    updateRouteQuery({ maxPrice: newValue });
  }
});


</script>

<template>
  <CollapsibleSection title="Price">
    <div class="">from {{ localMinPrice}} to {{ localMaxPrice }}</div>

    <div class="range-slider">
      <input 
        type="range" 
        name="sliderMin" 
        id="slider-min" 
        :min="filterStore.availableFilters.minPrice ?? 0"
        :max="filterStore.availableFilters.maxPrice ?? 0"
        :value="localMinPrice"
        @input="localMinPrice = Number($event.target.value)"

      >
      <input 
        type="range" 
        name="sliderMax" 
        id="slider-max"
        :min="filterStore.availableFilters.minPrice ?? 0"
        :max="filterStore.availableFilters.maxPrice ?? 0"
        :value="localMaxPrice"
        @input="localMaxPrice = Number($event.target.value)"
      >
    </div>

    <div class="manual-price-selectors">
      <!-- <input 
        type="number" 
        name="manualMin" 
        id="manual-min"
        v-model="localMinPrice"
      >
      <input 
        type="number" 
        name="manualMax" 
        id="manual-max"
        v-model="localMaxPrice"
      > -->
    </div>
  </CollapsibleSection>
</template>

<style scoped>

</style>