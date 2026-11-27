<script setup>
import { cn } from "cn";
import { buttonGroupVariants } from ".";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
  orientation: { type: null, required: false },
});
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="
      cn(buttonGroupVariants({ orientation: props.orientation }), props.class)
    "
  >
    <slot />
  </div>
</template>
