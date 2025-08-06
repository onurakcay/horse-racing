<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import ProgramResults from './components/ProgramResults.vue'
import ProgramComponent from './components/ProgramComponent.vue'
import ResultsComponent from './components/ResultsComponent.vue'
import MobileFloatingButtons from './components/MobileFloatingButtons.vue'
import BottomSheet from './components/BottomSheet.vue'

const showHorsesSheet = ref(false)
const showProgramSheet = ref(false)
const showResultsSheet = ref(false)
</script>

<template>
  <div class="app">
    <AppHeader />
    <div class="main-content">
      <div class="desktop-layout">
        <HorseList />
        <RaceTrack />
        <ProgramResults />
      </div>
      <div class="mobile-layout">
        <RaceTrack />
      </div>
    </div>

    <!-- Mobile Floating Buttons -->
    <MobileFloatingButtons 
      @showHorses="showHorsesSheet = true"
      @showProgram="showProgramSheet = true"
      @showResults="showResultsSheet = true"
    />

    <!-- Bottom Sheets -->
    <BottomSheet 
      :isOpen="showHorsesSheet" 
      title="Horse List"
      @close="showHorsesSheet = false"
    >
      <HorseList class="mobile" />
    </BottomSheet>

    <BottomSheet 
      :isOpen="showProgramSheet" 
      title="Program"
      @close="showProgramSheet = false"
    >
      <ProgramComponent class="mobile" />
    </BottomSheet>

    <BottomSheet 
      :isOpen="showResultsSheet" 
      title="Results"
      @close="showResultsSheet = false"
    >
      <ResultsComponent class="mobile" />
    </BottomSheet>
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
  flex: 1;
  height: 0; /* Force flex child to use flex sizing */
  position: relative;
}

.desktop-layout {
  display: flex;
  padding: 10px;
  gap: 10px;
  height: 100%;
}

.mobile-layout {
  display: none;
  padding: 10px;
  height: 100%;
}

/* Mobile responsive design */
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }

  .mobile-layout {
    display: block;
  }

  .main-content {
    padding-bottom: 80px; /* Space for floating buttons */
  }
}

/* Tablet responsive design */
@media (max-width: 1024px) and (min-width: 769px) {
  .desktop-layout {
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }

  .desktop-layout > * {
    flex: none;
  }
  
  .desktop-layout > :nth-child(2) {
    flex: 1;
  }
}
</style>
