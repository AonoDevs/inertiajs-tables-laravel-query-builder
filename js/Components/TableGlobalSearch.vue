<template>
  <InputGroup>
    <InputGroupAddon align="inline-start">
      <Search />
    </InputGroupAddon>
    <InputGroupInput
        v-model="model"
        :placeholder="label"
        type="text"
        name="global"
        @update:model-value="handleChange"
    />
  </InputGroup>
</template>

<script setup>
import { Search } from "@lucide/vue";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../components/ui/input-group";

const model = defineModel({
  required: true,
  default: () => [],
});

const props = defineProps({
  label: {
    type: String,
    default: "Search...",
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

const handleChange = (value) => {
  model.value = value;
  props.onChange(value);
}
</script>

