<template>
  <div class="card">
    <h1>Reaction Time ⏲️</h1>
    <p>Test your reaction skills to see how fast you are</p>

    <button class="button" @click="startGame" :disabled="isPlaying">
      Play
    </button>
  </div>

  <p v-if="isPlaying">Get Ready...</p>
  <Block v-if="isPlaying" :delay="delay" @end="endGame" />
  <Results v-if="showResults" :score="score" />
</template>

<script setup>
import { ref } from "vue";
import Block from "@/components/Block.vue";
import Results from "@/components/Results.vue";

const isPlaying = ref(false);
const delay = ref(null);
const score = ref(null);
const showResults = ref(false);

function startGame() {
  delay.value = 2000 + Math.random() * 5000;
  isPlaying.value = true;
  showResults.value = false;
}

function endGame(reactionTime) {
  score.value = reactionTime;
  isPlaying.value = false;
  showResults.value = true;
}
</script>
