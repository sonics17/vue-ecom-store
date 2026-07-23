<script setup>
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { useFilterStore } from '../model/store';

const filterStore = useFilterStore();
</script>

<template>
  <CollapsibleSection title="Color">
    <div class="">{{ filterStore.availableFilters.colors }}</div>
  </CollapsibleSection>
</template>

<style scoped>
</style>