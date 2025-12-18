<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light"
  },
})

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

<style>
@reference "tailwindcss";

.menu-item {
  @apply text-xl uppercase;
}
</style>
