<template>
  <div class="relative">
    <Input
      class="pl-8"
      :placeholder="label"
      :model-value="value"
      type="text"
      name="global"
      @update:model-value="onChange"
    />
    <div class="absolute inset-y-0 start-0 pl-2 flex items-center pointer-events-none">
      <Search class="size-4.5" />
    </div>
  </div>
</template>

<script setup>
import { Input } from "../components/ui/input/index.js";
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
</script>

