<template>
  <div class="results">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Horse } from '@/types'

const store = useStore()
const completedRounds = computed(() => store.getters.completedRounds)

const getHorseColor = (horseName: string, participants: Horse[]) => {
  const horse = participants.find((h) => h.name === horseName)
  return horse ? horse.color.toLowerCase() : 'gray'
}
</script>

<style scoped>
.results {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-header {
  background: #f5f5f5;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
}

.round-section {
  margin-bottom: 12px;
}

.round-header {
  background: #f9f9f9;
  padding: 6px 12px;
  font-weight: bold;
  font-size: 12px;
  border-bottom: 1px solid #eee;
}

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

/* Mobile optimizations */
.results.mobile {
  border: none;
  border-radius: 0;
}

.results.mobile .section-header {
  font-size: 18px;
  padding: 12px 16px;
}

.results.mobile .round-header {
  font-size: 14px;
  padding: 8px 12px;
}

.results.mobile .results-table {
  font-size: 14px;
}

.results.mobile .results-table th,
.results.mobile .results-table td {
  padding: 8px 12px;
}

.results.mobile .color-indicator {
  width: 14px;
  height: 14px;
}
</style>
