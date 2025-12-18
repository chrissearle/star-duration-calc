<script setup lang="ts">
const config = useRuntimeConfig()
const imageTag = computed(() => config.public.imageTag || "development")
</script>

<template>
  <div>
    <h1 class="head1">Version</h1>

    <p>{{ imageTag }}</p>
  </div>
</template>
