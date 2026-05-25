<script setup>
import { computed } from 'vue';
import StarIcon from './StarIcon.vue';

const props = defineProps({
  rating: {
    type: Number,
    default: 5
  }
})

const stars = computed(() =>  {
  const result = new Array(5).fill('empty');

  const fullStars = Math.floor(props.rating);

  if (props.rating % 1 !== 0) {
    result[fullStars] = 'half'
  }

  for (let i = 0; i < fullStars; i++) {
    result[i] = 'full'
  }

  return result
})

</script>

<template>
  <div class="star-rating">
    <StarIcon
      v-for="(star, index) in stars"
      :key="index"
      :variant="star"
    ></StarIcon>
  </div>
</template>

<style scoped></style>