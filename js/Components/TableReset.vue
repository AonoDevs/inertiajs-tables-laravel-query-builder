<template>
  <Button
    ref="button"
    variant="outline"
    type="button"
    dusk="reset-table"
    aria-haspopup="true"
    @click.prevent="onClick"
  >
    <X class="size-4.5" />
    {{ translations.reset ?? 'Reset' }}
  </Button>
</template>

<script setup>
import { getTranslations } from "../translations.js";
import { Button } from "../components/ui/button/index.js";
import { X } from "lucide-vue-next";

const translations = getTranslations();

const props = defineProps({
    onClick: {
        type: Function,
        required: true
    },

    color: {
        type: String,
        default: "primary",
        required: false,
    },

    ui: {
        required: false,
        type: Object,
        default: {},
    },
});
</script>
