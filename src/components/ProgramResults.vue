<template>
  <div class="program-results">
    <div class="program-section">
      <div class="section-header">Program</div>
      <div v-if="!raceScheduleGenerated" class="no-program">
        Click "Generate Program" to create race schedule
      </div>
      <div v-else>
        <div v-for="round in rounds" :key="round.id" class="round-section">
          <div class="round-header">
            Round {{ round.id }}: {{ round.distance }}m
            <span v-if="round.isCompleted" class="completed-badge">✓</span>
          </div>
          <table class="results-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(horse, index) in round.participants" :key="horse.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <span
                    class="color-indicator"
                    :style="{ backgroundColor: horse.color.toLowerCase() }"
                  ></span>
                  {{ horse.name }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="results-section">
      <div class="section-header">Results</div>
      <div v-if="completedRounds.length === 0" class="no-results">
        Results will appear here after races complete
      </div>
      <div v-else>
        <div v-for="round in completedRounds" :key="`result-${round.id}`" class="round-section">
          <div class="round-header">Round {{ round.id }}: {{ round.distance }}m</div>
          <table class="results-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in round.results" :key="`result-${round.id}-${result.position}`">
                <td>{{ result.position }}</td>
                <td>
                  <span
                    class="color-indicator"
                    :style="{ backgroundColor: getHorseColor(result.name, round.participants) }"
                  ></span>
                  {{ result.name }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Horse } from '@/types'

const store = useStore()
const raceScheduleGenerated = computed(() => store.state.raceScheduleGenerated)
const rounds = computed(() => store.state.rounds)
const completedRounds = computed(() => store.getters.completedRounds)

const getHorseColor = (horseName: string, participants: Horse[]) => {
  const horse = participants.find((h) => h.name === horseName)
  return horse ? horse.color.toLowerCase() : 'gray'
}
</script>

<style scoped>
.program-results {
  display: flex;
  gap: 10px;
  width: 440px;
}

.program-section,
.results-section {
  flex: 1;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.section-header {
  background: #4a90e2;
  color: white;
  padding: 8px;
  text-align: center;
  font-weight: bold;
  flex-shrink: 0;
}

.results-section .section-header {
  background: #7cb342;
}

.program-section > div:not(.section-header),
.results-section > div:not(.section-header) {
  flex: 1;
  overflow-y: auto;
}

.round-section {
  border-bottom: 1px solid #eee;
}

.round-section:last-child {
  border-bottom: none;
}

.round-header {
  background: #ff7043;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completed-badge {
  background: #4caf50;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.no-program,
.no-results {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.results-table th {
  background: #f5f5f5;
  padding: 4px 8px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.results-table td {
  padding: 2px 8px;
  border-bottom: 1px solid #f0f0f0;
}

.results-table tr:hover {
  background: #f9f9f9;
}

.color-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  vertical-align: middle;
}
</style>
