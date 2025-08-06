<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import ProgramResults from './components/ProgramResults.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <div class="main-content">
      <HorseList />
      <RaceTrack />
      <ProgramResults />
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  padding: 10px;
  gap: 10px;
  flex: 1;
  height: 0; /* Force flex child to use flex sizing */
}
</style>
