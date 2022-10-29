<template>
  <div class="block" v-if="showBlock" @click="stopTimer">Click Me</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showBlock = ref(false);
const timer = ref(null);
const reactionTime = ref(0);

const props = defineProps({
  delay: Number,
});

const emit = defineEmits(["end"]);

function startTimer() {
  timer.value = setInterval(() => {
    reactionTime.value += 10;
  }, 10);
}

function stopTimer() {
  clearInterval(timer.value);
  emit("end", reactionTime.value);
}

onMounted(() => {
  setTimeout(() => {
    showBlock.value = true;
    startTimer();
  }, props.delay);
});
</script>

<style>
.block {
  min-width: 300px;
  border-radius: 10px;
  background: #0faf87;
  color: white;
  text-align: center;
  padding: 100px 0;
  margin: 10px auto;
  cursor: pointer;
}

.block:hover {
  background-color: #21c17e;
}
</style>
