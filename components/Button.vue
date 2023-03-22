<template>
  <button
    :class="`disabled:bg-neutral-500 mt-10 text-3xl rounded-lg h-20 w-full ${color}`"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    primary?: boolean;
    disabled?: boolean;
  }>(),
  {}
);

const color = computed(() => {
  if (props.primary) {
    return "bg-emerald-600 hover:bg-emerald-700 text-neutral-900 hover:text-gray-200";
  }
  return "bg-transparent hover:bg-emerald-700 text-gray-200";
});
</script>

<style scoped></style>
