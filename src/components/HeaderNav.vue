<template>
  <footer class="bg-blue-400" aria-labelledby="footer-navigation">
    <h2 id="footer-navigation" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-3 px-7 flex justify-between">
      <router-link class="transition hover:rotate-180 active:rotate-180" to="/">
        <span class="sr-only">{{ Poker }}</span>
        <Poker class="h-8 w-8 md:h-10 md:w-10" />
      </router-link>

      <div class="text-4xl">
        <button class="m-1" @click="locale = 'en'">🇬🇧</button>
        <button class="m-1" @click="locale = 'tr'">🇹🇷</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Poker from "@/assets/poker.svg";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>
