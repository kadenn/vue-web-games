<script setup>
import Chicken from "@/assets/chicken.svg";
</script>

<template>
  <section class="bg-gray-100 p-5">
    <div class="mt-8 mx-auto max-w-7xl px-5 sm:mt-16">
      <div class="text-center">
        <h1
          class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
        >
          Skill Test
        </h1>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
      </div>
    </div>

    <div
      class="m-12 max-w-lg mx-auto bg-slate-200 flex flex-col rounded-lg shadow-lg border-2 border-black"
    >
      <div class="my-4 mx-auto">
        <figure>
          <Chicken />
        </figure>
      </div>

      <div class="p-6 flex flex-col justify-between">
        <p class="text-xl font-semibold text-gray-900">Reaction Time</p>
        <p class="mt-3 text-base text-gray-500">Test your visuals</p>
      </div>

      <div class="mx-5 mb-5">
        <router-link
          to="/reactiontime"
          class="w-full flex justify-center p-2 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Play
        </router-link>
      </div>
    </div>
  </section>
</template>
