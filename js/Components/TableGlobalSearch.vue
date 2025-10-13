<template>
  <div class="relative">
    <Input
      :class="getTheme('input')"
      :placeholder="label"
      :value="value"
      type="text"
      name="global"
      @input="onChange($event.target.value)"
    />
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search class="size-5" />
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../helpers.js";
import { Input } from "./ui/input/index.js";
import { Search } from "lucide-vue-next";

const props = defineProps({
    label: {
        type: String,
        default: "Search...",
        required: false,
    },

    value: {
        type: String,
        default: "",
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

// Theme
const fallbackTheme = {
    input: {
        base: "block w-full pl-9 text-sm rounded-md border-gray-300 shadow-2xs focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
        color: {
            primary: "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-700 dark:text-gray-300",
            dootix: "focus:ring-cyan-500 focus:border-blue-500 border-gray-300 dark:border-gray-700 dark:text-gray-300",
        },
    },
};
const themeVariables = inject("themeVariables");
const getTheme = (item) => {
    return twMerge(
        get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.global_search, props.ui),
        get_theme_part([item, "color", props.color], fallbackTheme, themeVariables?.inertia_table?.global_search, props.ui),
    );
};
</script>

