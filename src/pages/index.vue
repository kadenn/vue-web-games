<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

const { locale } = useI18n();
const router = useRouter();

onBeforeMount(() => {
  locale.value = "tr";
  router.push("reactionTime");
});
</script>

<template>
  <div
    class="mx-2 sm:mx-auto max-w-2xl my-4 p-4 bg-stone-200 rounded-lg shadow-lg border-2 border-black flex flex-col text-center"
  >
    <h1 class="text-2xl sm:text-3xl font-semibold">Web Games Win</h1>
  </div>
</template>
