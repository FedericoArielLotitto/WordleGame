<script setup lang="ts">
import { computed, ref } from 'vue';
import WordleBoard from './components/WordleBoard.vue'
import englishWords from '@/englishWordsWith5Letters.json'

const wordOrder = ref(0)
const initialDate = ref(new Date('2024-03-31'))

function getAgeOfGameInDays(date: Date) {
  const duration = Math.floor(date.getTime() - initialDate.value.getTime())
  const absoluteDifferenceInDays = Math.floor(duration / (1000 * 60 * 60 * 24))
  return absoluteDifferenceInDays
}

function updateInitialDate(date: Date) {
  console.log(englishWords.length)
  if (!englishWords[getAgeOfGameInDays(date)]) {
    initialDate.value = new Date(date.getFullYear(), date.getMonth(), date.getDate()) 
  }
}
const wordOfTheDay = computed<string>({
  get() {
    const today = new Date()
    updateInitialDate(today)
    let todayWord = englishWords[getAgeOfGameInDays(today)]
    console.log(todayWord)
    return todayWord
  },
  set() {

  }
})
</script>

<template>
  <WordleBoard :word-of-the-day="wordOfTheDay" />
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