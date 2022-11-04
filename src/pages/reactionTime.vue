<template>
  <div class="mx-2 sm:mx-auto max-w-2xl my-4 flex flex-col text-center">
    <div class="bg-stone-200 rounded-lg shadow-lg p-4 border-2 border-black">
      <h1 class="mb-3 text-2xl sm:text-3xl font-semibold">
        Reaksiyon testi ⚡
      </h1>

      <p class="mb-3 text-xl">
        Ne kadar hızlı olduğunu görmek için reaksiyon becerilerini test et
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
      <div
        class="bg-gray-400 border-4 border-gray-400 rounded-md h-72 w-full flex flex-col justify-center"
        v-if="showTooSoon"
      >
        Çok erken 🐔
      </div>
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

    <div v-else-if="showResults">
      <div
        class="my-2 text-2xl sm:text-3xl font-semibold text-center bg-stone-200 rounded-lg shadow-lg p-4 border-2 border-black h-72 w-full flex flex-col justify-center"
      >
        <p>{{ rank }}</p>
        <br />
        <p>{{ reactionTime }} ms</p>
      </div>

      <div class="bg-stone-200 rounded-lg shadow-lg p-4 border-2 border-black">
        <span class="mb-3 text-xl">Bundan sonra bana</span>
        <input
          required
          type="text"
          class="text-xl rounded-md px-1 mx-1"
          v-model="name"
          placeholder="Ninja Utku"
        />
        <span class="mb-3 text-xl">desinler!</span>

        <button
          v-if="!scoreSaved"
          @click="saveScore()"
          class="flex justify-center py-2 px-10 mx-auto mt-6 text-xl sm:text-3xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Kaydet
        </button>
        <button
          v-else
          disabled
          class="flex justify-center py-2 px-10 mx-auto mt-6 text-xl sm:text-3xl font-medium rounded-md text-white bg-green-700"
        >
          Kaydedildi
        </button>
      </div>

      <table class="table-auto mx-auto my-3 text-xl">
        <thead>
          <tr>
            <th class="underline">isim</th>
            <th class="underline">skor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores" :key="score.id">
            <td>{{ score.name }}</td>
            <td>{{ score.score }} ms</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
const scores = ref([]);
const name = ref("");
const scoreSaved = ref(false);
const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {
  scores.value = await getScores();
});

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
  scoreSaved.value = false;

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

async function getScores() {
  const res = await fetch(API_URL);
  const scores = await res.json();
  return scores?.items;
}

async function saveScore() {
  if (!name.value) {
    alert("İsim girmeyi unuttun!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      score: reactionTime.value,
    }),
  });
  scores.value = await getScores();
  scoreSaved.value = true;
}
</script>
