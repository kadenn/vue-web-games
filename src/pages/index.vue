<script setup>
import Chicken from "@/assets/chicken.svg";
</script>

<template>
  <div
    class="mx-2 sm:mx-auto max-w-2xl my-4 p-4 bg-stone-200 rounded-lg shadow-lg border-2 border-black flex flex-col text-center"
  >
    <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
      Reaction Time Game ⚡
    </h2>

    <figure class="mx-auto p-3">
      <Chicken />
    </figure>

    <router-link
      to="/reactiontime"
      class="flex justify-center py-2 px-10 mx-auto my-4 text-xl sm:text-3xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      Play
    </router-link>
  </div>
</template>
