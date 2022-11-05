<template>
  <header class="bg-blue-400" aria-labelledby="header-navigation">
    <h2 id="header-navigation" class="sr-only">Header</h2>
    <div class="max-w-7xl mx-auto py-3 px-7 flex justify-between">
      <router-link class="transition hover:rotate-180 active:rotate-180" to="/">
        <span class="sr-only">Poker</span>
        <Poker class="h-8 w-8 md:h-10 md:w-10" />
      </router-link>

      <div class="text-4xl leading-8 md:leading-10">
        <button class="mx-1" @click="locale = 'en'">🇬🇧</button>
        <button class="mx-1" @click="locale = 'tr'">🇹🇷</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import Poker from "@/assets/poker.svg";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>
