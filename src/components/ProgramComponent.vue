<template>
  <div class="program">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const raceScheduleGenerated = computed(() => store.state.raceScheduleGenerated)
const rounds = computed(() => store.state.rounds)
</script>

<style scoped>
.program {
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

.no-program {
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
.program.mobile {
  border: none;
  border-radius: 0;
}

.program.mobile .section-header {
  font-size: 18px;
  padding: 12px 16px;
}

.program.mobile .round-header {
  font-size: 14px;
  padding: 8px 12px;
}

.program.mobile .results-table {
  font-size: 14px;
}

.program.mobile .results-table th,
.program.mobile .results-table td {
  padding: 8px 12px;
}

.program.mobile .color-indicator {
  width: 14px;
  height: 14px;
}

.program.mobile .completed-badge {
  font-size: 12px;
  width: 20px;
  height: 20px;
}
</style>
