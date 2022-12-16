<template>
  <div class="grid h-full place-items-center">
    <div class="mx-2 my-4 flex">
      <p class="text-4xl font-extrabold text-blue-500 sm:text-5xl">404</p>
      <div class="ml-3 sm:ml-6">
        <div class="border-l sm:border-gray-200 pl-3 sm:pl-6">
          <h1
            class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
          >
            {{ t("Page not found") }}
          </h1>
        </div>
        <div
          class="mt-4 sm:mt-10 flex space-x-3 border-l border-transparent pl-6"
        >
          <router-link
            to="/"
            class="inline-flex items-center px-4 py-2 border border-transparent lg:text-xl text-lg font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ t("Go back home") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
