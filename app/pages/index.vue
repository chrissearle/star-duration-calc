<script setup lang="ts">
import { useCalcStore } from "~/stores/calcStore"
import * as v from "valibot"

const calcStore = useCalcStore()

const schema = v.object({
  focalLength: v.pipe(v.string(), v.trim(), v.nonEmpty("Required")),
  pixelSize: v.pipe(v.string(), v.trim(), v.nonEmpty("Required")),
})

const cameraPresets = [
  { name: "Nikon D700", pixelSize: "0.00845" },
  { name: "Nikon D4s", pixelSize: "0.00728" },
  { name: "Sony A7 III", pixelSize: "0.00594" },
  { name: "Sony A7R VI", pixelSize: "0.00376" },
] as const

function applyPreset(pixelSize: string) {
  calcStore.pixelSize = pixelSize
}
</script>

<template>
  <UContainer class="py-8">
    <ClientOnly>
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Left: Inputs + Presets -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl font-semibold">Calculator</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enter focal length and pixel size (mm)
                </p>
              </div>

              <UButton
                color="gray"
                variant="soft"
                icon="i-heroicons-trash"
                @click="calcStore.clear()"
              >
                Clear
              </UButton>
            </div>
          </template>

          <!-- Form -->
          <UForm :schema="schema" :state="calcStore" class="space-y-4 mb-8">
            <UFormField label="Focal Length" name="focalLength" hint="mm">
              <UInput
                v-model="calcStore.focalLength"
                inputmode="decimal"
                placeholder="e.g. 50"
                icon="i-heroicons-arrows-right-left"
              />
            </UFormField>

            <UFormField label="Pixel Size" name="pixelSize" hint="mm">
              <UInput
                v-model="calcStore.pixelSize"
                inputmode="decimal"
                placeholder="e.g. 0.00594"
                icon="i-heroicons-camera"
              />
            </UFormField>
          </UForm>

          <USeparator class="mb-8" label="Camera presets" />

          <!-- Presets -->
          <div class="space-y-2">
            <div
              v-for="c in cameraPresets"
              :key="c.name"
              class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-800"
            >
              <div>
                <p class="font-medium">{{ c.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ c.pixelSize }} mm
                </p>
              </div>

              <UButton
                size="xs"
                color="gray"
                variant="soft"
                icon="i-heroicons-arrow-right"
                @click="applyPreset(c.pixelSize)"
              >
                Use
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Right: Results -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Results</h2>
          </template>

          <div v-if="calcStore.result" class="space-y-4">
            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Arc minutes per mm
              </p>
              <p class="text-lg font-semibold">
                {{ calcStore.arcMinutesPerMm }}
              </p>
            </div>

            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Arc seconds per mm
              </p>
              <p class="text-lg font-semibold">
                {{ calcStore.arcSecondsPerMm }}
              </p>
            </div>

            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Arc seconds per pixel
              </p>
              <p class="text-lg font-semibold">
                {{ calcStore.arcSecondsPerPixel }}
              </p>
            </div>

            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Max Exposure Length
              </p>
              <p class="text-lg font-semibold">
                {{ calcStore.maxExposureLength }}
                <span
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                  >seconds</span
                >
              </p>
            </div>
          </div>

          <div v-else class="text-sm text-gray-500 dark:text-gray-400">
            Fill in the inputs to see calculation results.
          </div>
        </UCard>
      </div>
    </ClientOnly>
  </UContainer>
</template>
