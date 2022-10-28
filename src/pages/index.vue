<script setup>
import Chicken from "@/assets/chicken.svg";
</script>

<template>
  <section>
    <h1>Fun Games</h1>
    <div class="card-layout">
      <div class="card">
        <figure class="image">
          <Chicken />
        </figure>
        <div>
          <h2>Reaction Time</h2>
          <p>Test your visual reflexes</p>
          <div class="button-wrapper">
            <router-link class="button" to="/reactiontime">Play</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.button-wrapper {
  margin: 25px;
}
</style>
