<script setup>
import Chicken from "@/assets/chicken.svg";
</script>

<template>
  <section>
    <h1>Fun Games</h1>
    <div class="card-layout">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <Chicken />
          </figure>
        </div>
        <div class="card-content">
          <h2>Reaction Time</h2>
          <p>Test your visual reflexes</p>
          <router-link class="button" to="/reactiontime">Play</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 0rem;
}

P {
  font-size: 1.2rem;
}

.card {
  min-width: 300px;
  margin-top: 2rem;
  background-color: rgb(208, 208, 208);
  border: 2px solid rgb(0, 0, 0);
  border-radius: 20px;
  padding: 1rem;
}

.card-layout {
  display: flex;
  flex-direction: column;
}
</style>
