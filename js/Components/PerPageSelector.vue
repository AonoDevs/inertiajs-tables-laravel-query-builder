<template>
  <NativeSelect
    name="per_page"
    :dusk="dusk"
    :model-value="value"
    @update:model-value="(v) => onChange(v)"
  >
    <NativeSelectOption
      v-for="option in perPageOptions"
      :key="option"
      :value="option"
    >
      {{ option }} {{ translations.per_page }}
    </NativeSelectOption>
  </NativeSelect>
</template>

<script setup>
import { computed } from "vue";
import uniq from "lodash-es/uniq";
import { getTranslations } from "../translations.js";
import { NativeSelect, NativeSelectOption } from "../components/ui/native-select/index";

const translations = getTranslations();

const props = defineProps({
    dusk: {
        type: String,
        default: null,
        required: false,
    },

    value: {
        type: Number,
        default: 15,
        required: false,
    },

    options: {
        type: Array,
        default() {
            return [15, 30, 50, 100];
        },
        required: false,
    },

    onChange: {
        type: Function,
        required: true,
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

const perPageOptions = computed(() => {
    let options = [...props.options];

    options.push(parseInt(props.value));

    return uniq(options).sort((a, b) => a - b);
});
</script>

