<script setup>
import { reactiveOmit } from "@vueuse/core";
import { cn } from "cn";
import { Separator } from '@/components/ui/separator';

const props = defineProps({
  orientation: { type: String, required: false, default: "vertical" },
  decorative: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: [String, Object, Function], required: false },
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});
const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="delegatedProps"
    :orientation="props.orientation"
    :class="
      cn(
        'bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto',
        props.class,
      )
    "
  />
</template>
