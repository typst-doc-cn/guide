<template>
  <div class="grid-view-container">
    <div class="controls-container">
      <label class="switch">
        <input type="checkbox" v-model="is3dEffectActive" />
        <span class="slider round"></span>
      </label>
      <span>Enable 3D Effect</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is3dEffectActive: true, // Default state for the 3D effect
    };
  },
  provide() {
    return {
      // Provide a function to ensure reactivity when accessed by injected components
      is3dEffectEnabled: () => this.is3dEffectActive,
    };
  },
  inject: ['is3dEffectEnabled'],
  name: 'GridView',
};
</script>

<style scoped>
.controls-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure it's above other content */
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* Basic Switch CSS */
.switch {
  position: relative;
  display: inline-block;
  width: 40px; /* Smaller switch */
  height: 20px; /* Smaller switch */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px; /* Adjusted for smaller switch */
  width: 16px; /* Adjusted for smaller switch */
  left: 2px; /* Adjusted for smaller switch */
  bottom: 2px; /* Adjusted for smaller switch */
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(20px); /* Adjusted for smaller switch */
}

.slider.round {
  border-radius: 20px; /* Adjusted for smaller switch */
}

.slider.round:before {
  border-radius: 50%;
}

.grid-view-container {
  position: relative; /* Needed for absolute positioning of controls */
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Adjust minmax for desired card size */
  gap: 1rem; /* Adjust gap as needed */
  padding: 1rem;
}

/* Ensure ShowyCard components inside GridView adapt to the grid */
.grid-view-container :deep(.card) {
  width: 100%; /* Make cards take full width of grid cell */
  height: 100%; /* Make cards take full height of grid cell, if you want uniform height */
  /* You might need to adjust ShowyCard's internal styling or props for consistent height if content varies significantly */
}
</style>
