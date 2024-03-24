<script setup lang="ts">
import { WORD_SIZE } from '@/settings';

defineProps<{guess: string}>()
</script>

<template>
  <ul class="">
    <li v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')" :key="`${letter}-${index}`"
      class="letter" v-text="letter"></li>
  </ul>
</template>

<style scoped>
  .letter-box-container {
    list-style: none;
    display: flex;
    gap: 2.4rem;
  }

  .text-secondary {
    color: #3e9e12;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
</style>
