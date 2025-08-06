<template>
  <div class="race-track">
    <div class="track-container">
      <div class="lane-numbers">
        <div v-for="lane in 10" :key="lane" class="lane-number">
          {{ lane }}
        </div>
      </div>
      <div class="track-lanes">
        <div v-for="horse in displayHorses" :key="horse.id" class="lane">
          <div class="lane-line"></div>
          <div class="horse" :style="{ left: `${getHorsePosition(horse)}%` }">🐎</div>
        </div>
      </div>
      <div class="finish-line">
        <div class="finish-text">FINISH</div>
      </div>
    </div>
    <div class="round-info">
      <div v-if="currentRoundData" class="round-details">
        Round {{ currentRound + 1 }}: {{ currentDistance }}m
      </div>
      <div v-else class="no-round">Generate program to start racing</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import type { Horse } from '@/types'

const store = useStore()
const currentRoundData = computed(() => store.getters.currentRoundData)
const currentRound = computed(() => store.state.currentRound)
const currentDistance = computed(() => currentRoundData.value?.distance || 1200)

const displayHorses = computed(() => currentRoundData.value?.participants || [])

const getHorsePosition = (horse: Horse) => {
  if (!horse.position || !currentDistance.value) return 0
  // Atların finish çizgisine tam temas etmesi için %98'e çıkarıldı
  return Math.min((horse.position / currentDistance.value) * 96, 96)
}
</script>

<style scoped>
.race-track {
  flex: 1;
  background: linear-gradient(to right, #8bc34a 0%, #4caf50 100%);
  border: 2px solid #2e7d32;
  margin: 0 10px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.track-container {
  display: flex;
  height: 70%;
  position: relative;
}

.lane-numbers {
  width: 30px;
  background: #6d4c41;
  display: flex;
  flex-direction: column;
}

.lane-number {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
}

.track-lanes {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.lane {
  flex: 1;
  position: relative;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
}

.lane-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px dashed rgba(255, 255, 255, 0.3);
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scaleX(-1);
  font-size: 28px;
  transition: left 0.1s ease-out;
  z-index: 10;
}

.finish-line {
  width: 40px;
  background: #f44336;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  position: relative;
}

.finish-line::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 10px,
    white 10px,
    white 20px
  );
}

.finish-text {
  font-size: 14px;
  z-index: 1;
  color: white;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background: black;
  padding: 8px 4px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.distance-text {
  font-size: 10px;
  z-index: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  margin-top: 4px;
}

.round-info {
  height: 30%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #2e7d32;
}

.round-details {
  font-size: 18px;
  font-weight: bold;
  color: #2e7d32;
  text-align: center;
}

.no-round {
  font-size: 16px;
  color: #666;
  text-align: center;
  font-style: italic;
}

/* Mobile responsive design */
@media (max-width: 768px) {
  .race-track {
    margin: 0;
    height: 100%;
  }

  .track-container {
    height: 75%;
  }

  .lane-number {
    font-size: 10px;
    min-width: 20px;
  }

  .lane {
    height: 30px;
    margin: 2px 0;
  }

  .horse {
    font-size: 16px;
    width: 20px;
    height: 20px;
  }

  .finish-line {
    width: 6px;
  }

  .finish-text {
    font-size: 10px;
    padding: 4px 2px;
  }

  .round-info {
    height: 25%;
    padding: 8px;
  }

  .round-details {
    font-size: 14px;
  }

  .no-round {
    font-size: 12px;
  }
}

/* Tablet responsive design */
@media (max-width: 1024px) and (min-width: 769px) {
  .round-details {
    font-size: 16px;
  }

  .horse {
    font-size: 18px;
  }
}
</style>
