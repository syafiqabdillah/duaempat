<template>
  <div
    :class="`w-full aspect-square flex justify-center items-center rounded-lg transition-color cursor-pointer p-2 pb-3 ${color} ${fontSize}`"
    @click="() => onClick()"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    onClick: Function;
    primary?: boolean;
    size?: string;
    disabled?: boolean;
  }>(),
  {}
);
const fontSize = computed(() =>
  props.size === "lg" ? "text-6xl" : "text-3xl"
);
const color = computed(() => {
  if (props.disabled) return "bg-gray-500 text-gray-700";
  return props.primary
    ? "bg-emerald-600 text-gray-200 hover:bg-emerald-700"
    : "bg-gray-200 text-emerald-700 hover:bg-gray-300";
});
</script>

<style scoped></style>
