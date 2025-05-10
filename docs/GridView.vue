<template>
  <div class="grid-view-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridView'
}
</script>

<style scoped>
.grid-view-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust minmax for desired card size */
  gap: 1rem; /* Adjust gap as needed */
  padding: 1rem;
}

/* Ensure ShowyCard components inside GridView adapt to the grid */
.grid-view-container ::v-deep .card {
  width: 100%; /* Make cards take full width of grid cell */
  height: 100%; /* Make cards take full height of grid cell, if you want uniform height */
  /* You might need to adjust ShowyCard's internal styling or props for consistent height if content varies significantly */
}
</style>