<template>
  <div class="mx-2 sm:mx-auto max-w-2xl my-4 flex flex-col text-center">
    <div class="bg-stone-200 rounded-lg shadow-lg p-4 border-2 border-black">
      <h1 class="mb-3 text-2xl sm:text-3xl font-semibold">
        Reaksiyon testi ⚡
      </h1>

      <p class="mb-3 text-xl">
        Ne kadar hızlı olduğunu görmek için reaksiyon becerilerini test et!
      </p>

      <button
        @click="startGame"
        class="flex justify-center py-2 px-10 mx-auto mt-6 text-xl sm:text-3xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Oyna
      </button>
    </div>

    <div
      class="my-2 text-3xl sm:text-4xl font-semibold text-center"
      v-if="isPlaying"
    >
      <button
        class="bg-gray-400 border-4 border-gray-400 rounded-md h-72 w-full"
        v-if="showTooSoon"
      >
        Çok erken 🐔
      </button>
      <button
        class="bg-red-600 border-4 border-red-600 rounded-md h-72 w-full"
        v-else-if="showWaitForGreen"
        @click="tooSoon"
      >
        Yeşilin çıkmasını bekle ⏳
      </button>
      <button
        class="bg-green-400 border-4 border-green-400 rounded-md h-72 w-full"
        v-else-if="showClickNow"
        @click="stopTimer"
      >
        Şimdi tıkla ⌛
      </button>
    </div>

    <button
      v-else-if="showResults"
      class="my-2 text-2xl sm:text-3xl font-semibold text-center bg-stone-200 rounded-lg shadow-lg p-4 border-2 border-black h-72 w-full"
    >
      <p>{{ rank }}</p>
      <br />
      <p>{{ reactionTime }} ms</p>
    </button>
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
  clearTimeout(timeout.value);
  clearInterval(interval.value);
  reactionTime.value = 0;
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
    rank.value = "İnanılmaz ötesi 🐈";
  } else if (reactionTime.value < 200) {
    rank.value = "Ninja parmaklar 🥷🏼";
  } else if (reactionTime.value < 300) {
    rank.value = "Hızlı refleksler 🐿️";
  } else if (reactionTime.value < 400) {
    rank.value = "Ortalama refleksler 🐒";
  } else if (reactionTime.value < 500) {
    rank.value = "Yavaş kaldın 🐼";
  } else {
    rank.value = "Salyangoz hızı 🐌";
  }
}
</script>
