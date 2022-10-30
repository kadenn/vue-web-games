<template>
  <footer class="bg-gray-300" aria-labelledby="footer-navigation">
    <h2 id="footer-navigation" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-3 px-7 flex justify-between">
      <router-link class="transition hover:rotate-180 active:rotate-180" to="/">
        <span class="sr-only">{{ Poker }}</span>
        <Poker class="h-8 w-8 md:h-10 md:w-10" />
      </router-link>

      <a
        href="https://www.tiktok.com/@utkucemokten/"
        target="_blank"
        class="transition hover:rotate-180 active:rotate-180"
      >
        <span class="sr-only">{{ TikTok }}</span>
        <Tiktok class="h-8 w-8 md:h-10 md:w-10" />
      </a>

      <a
        href="https://github.com/kadenn/vue-web-games/"
        target="_blank"
        class="transition hover:rotate-180 active:rotate-180"
      >
        <span class="sr-only">{{ Github }}</span>
        <Github class="h-8 w-8 md:h-10 md:w-10" />
      </a>
    </div>
  </footer>
</template>

<script setup>
import Tiktok from "@/assets/tiktok.svg";
import Github from "@/assets/github.svg";
import Poker from "@/assets/poker.svg";
</script>
