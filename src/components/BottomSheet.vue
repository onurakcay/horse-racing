<template>
  <div v-if="isOpen" class="bottom-sheet-overlay" @click="closeSheet">
    <div class="bottom-sheet" @click.stop>
      <div class="bottom-sheet-header">
        <div class="bottom-sheet-handle"></div>
        <h3 class="bottom-sheet-title">{{ title }}</h3>
        <button class="close-btn" @click="closeSheet">✕</button>
      </div>
      <div class="bottom-sheet-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
}

defineProps<Props>()
const emit = defineEmits(['close'])

const closeSheet = () => {
  emit('close')
}
</script>

<style scoped>
.bottom-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: none;
}

.bottom-sheet {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.bottom-sheet-header {
  padding: 16px 20px 8px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.bottom-sheet-handle {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
}

.bottom-sheet-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f0f0f0;
}

.bottom-sheet-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

@media (max-width: 768px) {
  .bottom-sheet-overlay {
    display: block;
  }
}
</style>
