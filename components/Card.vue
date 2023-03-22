<template>
  <div :class="`bg-gray-200 rounded-lg p-8 w-full max-w-lg ${props.class}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {}
);
</script>

<style scoped></style>
