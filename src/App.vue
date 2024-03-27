<script setup lang="ts">
import WordleBoard from './components/WordleBoard.vue'
</script>

<template>
  <WordleBoard word-of-the-day="TESTS" />
</template>

<style>
  :root {
    --primary-color: #52C01B;
    --primary-text-color: #0F2D06;
  }

  .text-primary {
    color: var(--primary-color);
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  .text-secondary {
    color: var(--primary-text-color);
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }

  .text-center {
    text-align: center;
    vertical-align: middle;
  }
</style>