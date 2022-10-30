<template>
  <div class="flex h-screen flex-col bg-gray-100">
    <HeaderNav />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterNav />
  </div>
</template>

<script setup>
import FooterNav from "@/components/FooterNav.vue";
import HeaderNav from "@/components/HeaderNav.vue";
</script>
BotNav
