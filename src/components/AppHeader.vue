<template>
  <header class="app-header">
    <div class="title">Horse Racing</div>
    <div class="controls">
      <button
        class="control-btn generate-btn"
        @click="generateRaceSchedule"
        :disabled="isRaceActive"
        :title="'Generate Program'"
      >
        <span class="desktop-text">GENERATE PROGRAM</span>
        <span class="mobile-icon">📊</span>
      </button>
      <button
        v-if="raceScheduleGenerated"
        class="control-btn race-btn"
        @click="toggleRace"
        :disabled="!raceScheduleGenerated || (currentRound >= totalRounds && !isRaceActive)"
        :title="getRaceButtonText"
      >
        <span class="desktop-text">{{ getRaceButtonText }}</span>
        <span class="mobile-icon">{{ getRaceIcon }}</span>
      </button>
      <button
        v-if="raceScheduleGenerated"
        class="control-btn reset-btn"
        @click="resetRace"
        :disabled="isRacing"
        :title="'Reset'"
      >
        <span class="desktop-text">RESET</span>
        <span class="mobile-icon">🔄</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isRacing = computed(() => store.state.isRacing)
const isRaceActive = computed(() => store.state.isRaceActive)
const raceScheduleGenerated = computed(() => store.state.raceScheduleGenerated)
const currentRound = computed(() => store.state.currentRound)
const totalRounds = computed(() => store.state.totalRounds)
const roundPreparationNeeded = computed(() => store.state.roundPreparationNeeded)

const getRaceButtonText = computed(() => {
  if (isRaceActive.value && isRacing.value) {
    return 'STOP'
  }

  if (currentRound.value >= totalRounds.value) {
    return 'ALL ROUNDS COMPLETED'
  }

  if (roundPreparationNeeded.value) {
    return `PREPARE ROUND ${currentRound.value + 2}`
  }

  return `START ROUND ${currentRound.value + 1}`
})

const getRaceIcon = computed(() => {
  if (isRaceActive.value && isRacing.value) {
    return '⏹️'
  }

  if (currentRound.value >= totalRounds.value) {
    return '🏁'
  }

  if (roundPreparationNeeded.value) {
    return '⚙️'
  }

  return '▶️'
})

const generateRaceSchedule = () => {
  store.dispatch('generateRaceSchedule')
}

const toggleRace = () => {
  if (isRaceActive.value && isRacing.value) {
    store.dispatch('stopRace')
  } else if (roundPreparationNeeded.value) {
    store.dispatch('prepareNextRound')
  } else {
    store.dispatch('startRace')
  }
}

const resetRace = () => {
  store.dispatch('resetRace')
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.generate-btn {
  background: #f5f5f5;
  color: #333;
}

.generate-btn:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-1px);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.race-btn {
  background: #f5f5f5;
  color: #333;
}

.race-btn:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
}

.reset-btn {
  background: #ff5722;
  color: white;
}

.reset-btn:hover:not(:disabled) {
  background: #e64a19;
  transform: translateY(-1px);
}

.reset-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-btn:active {
  transform: translateY(0);
}

/* Mobile styles */
.mobile-icon {
  display: none;
  font-size: 18px;
}

.desktop-text {
  display: inline;
}

@media (max-width: 768px) {
  .app-header {
    padding: 8px 16px;
  }

  .title {
    font-size: 16px;
  }

  .control-btn {
    padding: 8px;
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-icon {
    display: inline;
  }

  .desktop-text {
    display: none;
  }

  .controls {
    gap: 8px;
  }
}
</style>
