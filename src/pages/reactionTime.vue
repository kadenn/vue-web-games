<template>
  <div class="m-7 border-2 rounded-md border-black p-3 bg-stone-300">
    <h1>Reaction Time ⏲️</h1>
    <p>Test your reaction skills to see how fast you are</p>
    <p>{{ reactionTime }}</p>
    <button
      class="flex justify-center p-2 mt-3 text-lg px-10 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      @click="startGame"
      :disabled="isPlaying"
    >
      Play
    </button>
  </div>
  <div v-if="isPlaying" class="m-7 h-1/2">
    <div
      class="bg-gray-600 border-4 border-gray-600 p-3 h-full rounded-md"
      v-if="showTooSoon"
      @click="startGame"
    >
      Too soon!
    </div>
    <div
      class="bg-red-600 border-4 border-red-600 p-3 h-full rounded-md"
      v-else-if="showWaitForGreen"
      @click="tooSoon"
    >
      Wait for green...
    </div>
    <div
      class="bg-green-400 border-4 border-green-400 p-3 h-full rounded-md"
      v-else-if="showClickNow"
      @click="stopTimer"
    >
      Click!
    </div>
  </div>
  <div
    v-else-if="showResults"
    @click="startGame"
    class="m-7 border-2 rounded-md border-black p-3 h-1/2 bg-stone-300"
  >
    <p>Reaction Time: {{ reactionTime }} ms</p>
    <p>{{ rank }}</p>
    <p>Click to play again!</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const interval = ref(null);
const timeout = ref(null);
const reactionTime = ref(0);
const isPlaying = ref(false);
const delay = ref(null);
const showResults = ref(false);
const showWaitForGreen = ref(false);
const showClickNow = ref(false);
const showTooSoon = ref(false);
const rank = ref(null);

function tooSoon() {
  clearTimeout(timeout.value);
  clearInterval(interval.value);
  reactionTime.value = 0;
  showTooSoon.value = true;
}

function startGame() {
  isPlaying.value = true;
  showTooSoon.value = false;
  showWaitForGreen.value = true;

  delay.value = 2000 + Math.random() * 5000;
  timeout.value = setTimeout(() => {
    showClickNow.value = true;
    showWaitForGreen.value = false;
    reactionTime.value = 0;
    clearInterval(interval.value);
    interval.value = setInterval(() => {
      reactionTime.value += 10;
    }, 10);
  }, delay.value);
}

function stopTimer() {
  clearInterval(interval.value);
  isPlaying.value = false;
  showResults.value = true;
  if (reactionTime.value < 100) {
    rank.value = "Impressive!";
  } else if (reactionTime.value < 250) {
    rank.value = "Ninja fingers!";
  } else if (reactionTime.value < 400) {
    rank.value = "Rapid reflexes!";
  } else if (reactionTime.value < 550) {
    rank.value = "Snail pace...";
  } else {
    rank.value = "Slow poke...";
  }
}
</script>
