<template>
  <div class="w-screen h-screen flex flex-col">
    <HeaderNav />
    <main class="flex-grow m-0 p-0 bg-gray-100">
      <router-view class="flex justify-center" />
    </main>
    <FooterNav />
  </div>
</template>

<script setup>
import FooterNav from "@/components/FooterNav.vue";
import HeaderNav from "@/components/HeaderNav.vue";
</script>
BotNav
