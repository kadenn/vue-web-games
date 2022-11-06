<template>
  <div class="mx-2 sm:mx-auto max-w-2xl my-4 flex flex-col text-center">
    <div class="bg-stone-200 rounded-lg shadow-lg p-4 border-2 border-black">
      <div class="flex justify-center">
        <h1 class="mb-3 text-2xl sm:text-3xl font-semibold">
          {{ t("Reaction test") }}
        </h1>
        <Chicken class="sm:w-8 sm:h-8 w-7 h-7 mx-2" />
      </div>

      <p class="mb-3 text-xl">
        {{ t("Measure your visual reflexes with reaction test") }}
      </p>

      <button
        @click="startGame"
        class="flex justify-center py-2 px-10 mx-auto mt-6 text-xl sm:text-3xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {{ t("Play") }}
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
        {{ t("Too soon") }} 🐔
      </div>
      <button
        class="bg-red-600 border-4 border-red-600 rounded-md h-72 w-full"
        v-else-if="showWaitForGreen"
        @click="tooSoon"
      >
        {{ t("Wait for green") }} ⏳
      </button>
      <button
        class="bg-green-400 border-4 border-green-400 rounded-md h-72 w-full"
        v-else-if="showClickNow"
        @click="stopTimer"
      >
        {{ t("Click now") }} ⏳
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
        <span class="mb-3 text-xl">{{ t("You can call me") }}</span>
        <input
          required
          type="text"
          class="text-xl rounded-md px-1 mx-1"
          v-model="name"
          placeholder="Ninja User"
        />

        <button
          v-if="!scoreSaved"
          @click="saveScore()"
          class="flex justify-center py-2 px-10 mx-auto mt-6 text-xl sm:text-3xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {{ t("Save") }} 💾
        </button>
        <button
          v-else
          disabled
          class="flex justify-center py-2 px-10 mx-auto mt-6 text-xl sm:text-3xl font-medium rounded-md text-white bg-green-700"
        >
          {{ t("Saved") }} 🏆
        </button>
      </div>
    </div>
    <table v-if="scores.length" class="table-auto mx-auto my-3 text-xl">
      <thead>
        <tr>
          <th class="underline">{{ t("name") }}</th>
          <th class="underline">{{ t("score") }}</th>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import swal from "sweetalert";
import Chicken from "@/assets/chicken.svg";

const apiUrl = import.meta.env.VITE_API_URL;
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
const { t } = useI18n();

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
    rank.value = t("Impressive") + " 🐈";
  } else if (reactionTime.value < 200) {
    rank.value = t("Ninja fingers") + " 🥷🏼";
  } else if (reactionTime.value < 300) {
    rank.value = t("Rapid reflexes") + " 🐿️";
  } else if (reactionTime.value < 400) {
    rank.value = t("Average reflexes") + " 🐒";
  } else if (reactionTime.value < 500) {
    rank.value = t("Snail pace") + " 🐌";
  } else {
    rank.value = t("Slow poke") + " 🐼";
  }
}

async function getScores() {
  const res = await fetch(apiUrl);
  const scores = await res.json();
  return scores?.items;
}

async function saveScore() {
  if (!name.value) {
    swal("Error", t("Please enter a username"), "error");
    return;
  }

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      score: reactionTime.value,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    swal("Error", err?.data.name.message, "error");
    return;
  }

  scores.value = await getScores();
  scoreSaved.value = true;
}
</script>
