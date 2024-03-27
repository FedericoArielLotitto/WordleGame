<script setup lang="ts">
import { WORD_SIZE } from '@/settings';

const props = defineProps<{ guess: string, answer?: string }>()

function getFeedback(letterPosition: number): null | 'correct' | 'incorrect' | 'almost' {
  if (!props.answer) {
    return null
  }

  const letterGuessed = props.guess[letterPosition]
  const letterExpected = props.answer[letterPosition]

  if (!props.answer.includes(letterGuessed)) {
    return 'incorrect'
  }

  return letterExpected === letterGuessed ? 'correct' : 'almost'
}
</script>

<template>
  <ul class="letter-box-container">
    <li v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')" 
    :key="`${letter}-${index}`"
    :data-letter-feedback="getFeedback(index)"
    :data-letter="letter"
    class="letter text-secondary" 
    v-text="letter">
    </li>
  </ul>
</template>

<style scoped>
  .letter-box-container {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .letter {
    list-style: none;
    display: inline-block;
    align-content: center;
    text-align: center;
    height: 50px;
    width: 50px;
    border: solid 2px #327813;
    border-radius: 15px;
    font-size: 1.8rem;
    margin: 4px;
  }
</style>
