<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const items = ref<NavigationMenuItem[]>([
  {
    label: "Calculate",
    to: "/",
    class: "menu-item",
  },
])
</script>

<template>
  <UNavigationMenu :items="items" class="w-full justify-center print:!hidden" />
</template>
