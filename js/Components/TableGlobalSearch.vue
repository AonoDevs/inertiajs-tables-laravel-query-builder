<template>
  <div class="relative">
    <Input
      class="pl-8"
      :placeholder="label"
      :value="value"
      type="text"
      name="global"
      @input="onChange($event.target.value)"
    />
    <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
      <Search class="size-5" />
    </div>
  </div>
</template>

<script setup>
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
</script>

