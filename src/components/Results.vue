<template>
  <p>Reaction Time: {{ score }} ms</p>
  <p class="rank">{{ rank }}</p>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  score: Number,
});

const rank = ref(null);

onMounted(() => {
  if (props.score < 100) {
    rank.value = "Impressive!";
  } else if (props.score < 250) {
    rank.value = "Ninja fingers!";
  } else if (props.score < 400) {
    rank.value = "Rapid reflexes!";
  } else if (props.score < 550) {
    rank.value = "Snail pace...";
  } else {
    rank.value = "Slow poke...";
  }
});
</script>

<style>
.rank {
  font-size: 1.4em;
  color: #0faf87;
  font-weight: bold;
}
</style>
