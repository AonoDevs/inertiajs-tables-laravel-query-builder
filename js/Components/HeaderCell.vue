<template>
  <TableHead v-if="!cell.hidden">
    <component
      :is="cell.sortable ? Button : 'div'"
      variant="ghost"
      :class="cell.sortable ? 'w-fit' : 'w-full'"
      :dusk="cell.sortable ? `sort-${cell.key}` : null"
      @click="onClick"
    >
      <slot name="label">
        {{ cell.label }}
      </slot>

      <slot name="sort">
        <template v-if="cell.sortable">
          <component
            :is="sortIcon"
            :aria-hidden="!cell.sorted"
            :class="[cell.sorted ? 'size-3.5' : 'size-4', {
              'text-green-500': cell.sorted,
            }]"
          />
        </template>
      </slot>
    </component>
  </TableHead>
</template>

<script setup>
import { TableHead } from "./ui/table/index.js";
import { Button } from "./ui/button/index.js";
import { ArrowDownUp, MoveUp, MoveDown } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
    cell: {
        type: Object,
        required: true,
    },
});

function onClick(event) {
    if (props.cell.sortable) {
        props.cell.onSort(props.cell.key);
    }
    if (!props.cell.clickable) {
        event.preventDefault();
    }
}

const sortIcon = computed(() => {
    if (props.cell.sorted === "asc") return MoveUp;
    if (props.cell.sorted === "desc") return MoveDown;
    return ArrowDownUp;
});
</script>
