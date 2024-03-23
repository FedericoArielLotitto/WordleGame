<script setup lang="ts">
import { ref } from 'vue'

import { VICTORY_MESSAGE, WRONG_GUESS_MESSAGE } from '@/settings';

defineProps<{
  wordOfTheDay: string
}>()

</script>

<template>
  <input type="text">
  <p>{{VICTORY_MESSAGE}}</p>
  <p>{{WRONG_GUESS_MESSAGE}}</p>
</template>
