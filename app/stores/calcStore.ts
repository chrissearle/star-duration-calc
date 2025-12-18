import {defineStore} from "pinia"

export const useCalcStore = defineStore(
    "calcStore",
    () => {
        const focalLength = ref("")
        const pixelSize = ref("")

        const arcMinutesPerMm = computed(() => {
            if (focalLength.value === "") {
                return 0
            }

            return 3438.0 / parseFloat(focalLength.value.replace(",", "."))
        })

        const arcSecondsPerMm = computed(() => {
            return arcMinutesPerMm.value * 60.0
        })

        const arcSecondsPerPixel = computed(() => {
            if (pixelSize.value === "") {
                return 0
            }

            return arcSecondsPerMm.value * parseFloat(pixelSize.value.replace(",", "."))
        })

        const maxExposureLength = computed(() => {
            return arcSecondsPerPixel.value / 15.0
        })

        const clear = () => {
            focalLength.value = ""
            pixelSize.value = ""
        }

        const result = computed(() => {
            return focalLength.value !== "" && pixelSize.value !== ""
        })

        return {
            focalLength,
            pixelSize,
            clear,
            arcMinutesPerMm,
            arcSecondsPerMm,
            arcSecondsPerPixel,
            maxExposureLength,
            result
        }
    },
)
