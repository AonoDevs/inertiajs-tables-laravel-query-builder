<template>
  <div class="w-full flex gap-2 justify-between items-center">
    <Switch
      :class="getTheme('toggle')"
      :model-value="filter.value"
      @update:model-value="(event) => onFilterChange(filter.key, event ? '1' : '0')"
    />
    <button
      :class="getTheme('reset_button')"
      @click.prevent="onFilterChange(filter.key, null)"
    >
      <span class="sr-only">Remove search</span>
      <X class="size-4.5" />
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { get_theme_part } from "../../helpers.js";
import { Switch } from "../../components/ui/switch";
import { X } from "lucide-vue-next";

const props = defineProps({
    filter: {
        type: Object,
        required: true,
    },

    onFilterChange: {
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
    toggle: {
        color: {
            primary: "data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-destructive",
            disabled: "data-[state=unchecked]:bg-input",
        },
    },
    reset_button: {
        color: {
            primary: "text-input hover:text-muted-foreground focus:ring-muted-foreground",
        },
    },
};
const themeVariables = inject("themeVariables");
const getTheme = (item) => {
    let color = props.color;
    if (item === "toggle" && props.filter.value === null) {
        color = "disabled";
    }
    return twMerge(
        get_theme_part([item, "base"], fallbackTheme, themeVariables?.inertia_table?.table_filter?.toggle_filter, props.ui),
        get_theme_part([item, "color", color], fallbackTheme, themeVariables?.inertia_table?.table_filter?.toggle_filter, props.ui),
    );
};
</script>
