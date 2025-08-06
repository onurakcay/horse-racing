<template>
  <div class="horse-list">
    <div class="header">
      <h3>Horse List (1 - 20)</h3>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td>
              <span
                class="color-indicator"
                :style="{ backgroundColor: horse.color.toLowerCase() }"
              ></span>
              {{ horse.color }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const horses = computed(() => store.state.allHorses)
</script>

<style scoped>
.horse-list {
  background: #f0f0b8;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 240px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  background: #e6e659;
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  flex-shrink: 0;
}

.header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.table-container {
  flex: 1;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

th {
  background: #ddd;
  padding: 4px 8px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  position: sticky;
  top: 0;
}

td {
  padding: 2px 8px;
  border-bottom: 1px solid #eee;
}

tr:hover {
  background: #f5f5f5;
}

.color-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 4px;
  border: 1px solid #333;
}
</style>
