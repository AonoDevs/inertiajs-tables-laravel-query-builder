<template>
  <InputGroup>
    <InputGroupAddon align="inline-start">
      <Search />
    </InputGroupAddon>
    <InputGroupInput
      :placeholder="label"
      :model-value="value"
      type="text"
      name="global"
      @update:model-value="onChange"
    />
  </InputGroup>
</template>

<script setup>
import { Search } from "@lucide/vue";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../components/ui/input-group";

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

