<template>
  <div class="floating-buttons">
    <button
      class="floating-btn results-btn"
      @click="$emit('showResults')"
      :title="'Show Results'"
    >
      🏆
    </button>
    <button
      class="floating-btn program-btn"
      @click="$emit('showProgram')"
      :title="'Show Program'"
    >
      📋
    </button>
    <button
      class="floating-btn horses-btn"
      @click="$emit('showHorses')"
      :title="'Show Horse List'"
    >
      🐎
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['showProgram', 'showHorses', 'showResults'])
</script>

<style scoped>
.floating-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.floating-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #ff6b6b;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-btn:hover {
  background: #ee5a52;
  transform: scale(1.1);
}

.floating-btn:active {
  transform: scale(0.95);
}

.results-btn {
  background: #4caf50;
}

.results-btn:hover {
  background: #43a047;
}

.program-btn {
  background: #2196f3;
}

.program-btn:hover {
  background: #1e88e5;
}

@media (max-width: 768px) {
  .floating-buttons {
    display: flex;
  }
}
</style>
