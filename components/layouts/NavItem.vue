<template>
  <a
    :href="href"
    refl="noreferrer"
    v-if="external"
    class="text-gray-200 hover:text-emerald-600"
  >
    <slot></slot>
  </a>
  <NuxtLink :to="href" class="text-gray-200 hover:text-emerald-600" v-else>
    <slot></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    external?: boolean;
    href: string;
  }>(),
  {}
);
</script>

<style scoped></style>
