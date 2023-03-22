<template>
  <div>
    <h1>Welcome to 24 {{ count }} {{ yahoo }}</h1>
  </div>
</template>

<script setup lang="ts">
const count = ref(1);
const yahoo = computed(() => count.value + 4);
</script>

<style scoped></style>
