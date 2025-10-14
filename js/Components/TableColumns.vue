<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Eye class="size-5" />
        <span v-if="hasHiddenColumns">({{ hiddenColumnsCount }})</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <template
        v-for="(column, key) in props.columns"
        :key="key"
      >
        <DropdownMenuCheckboxItem
          v-if="column.can_be_hidden"
          :model-value="!column.hidden"
          @update:model-value="onChange(column.key, column.hidden)"
        >
          {{ column.label }}
        </DropdownMenuCheckboxItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { computed } from "vue";
import { Eye } from "lucide-vue-next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "../components/ui/dropdown-menu/index.js";
import { Button } from "../components/ui/button/index.js";

const props = defineProps({
    columns: {
        type: Object,
        required: true,
    },

    hasHiddenColumns: {
        type: Boolean,
        required: true,
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
});

const hiddenColumnsCount = computed(() => {
    return props.columns.filter((c) => c.hidden).length;
});
</script>
