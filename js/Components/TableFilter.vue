<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Funnel class="size-4.5" />
        <span
          v-if="hasEnabledFilters"
        >({{ activeFiltersCount }})</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <template
        v-for="(filter, key) in filters"
        :key="key"
      >
        <DropdownMenuLabel>{{ filter.label }}</DropdownMenuLabel>
        <DropdownMenuSub>
          <Select
            v-if="filter.type === 'select'"
            :model-value="filter.value"
            @update:model-value="(value) => onFilterChange(filter.key, value)"
          >
            <SelectTrigger class="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <template
                v-for="(option, optionKey) in filter.options"
              >
                <SelectItem
                  v-if="!optionKey || optionKey === ''"
                  :key="optionKey"
                  :value="null"
                >
                  {{ option }}
                </SelectItem>
              </template>
              <template
                v-for="(option, optionKey) in filter.options"
              >
                <SelectItem
                  v-if="optionKey && optionKey !== ''"
                  :key="optionKey"
                  :value="optionKey"
                >
                  {{ option }}
                </SelectItem>
              </template>
            </SelectContent>
          </Select>
          <ToggleFilter
            v-if="filter.type === 'toggle'"
            :filter="filter"
            :on-filter-change="onFilterChange"
            :color="color"
          />
          <div
            v-if="filter.type === 'number_range'"
            class="py-4 px-8"
            style="min-width: 250px;"
          >
            <NumberRangeFilter
              v-model="filter.value"
              :max="filter.max"
              :min="filter.min"
              :prefix="filter.prefix"
              :suffix="filter.suffix"
              :step="filter.step"
              :color="color"
              @update:model-value="updateNumberRangeFilter(filter)"
            />
          </div>
          <div v-if="filter.type === 'custom'">
            <slot
              :name="`custom_filter(${filter.key})`"
              :filter="filter"
              :on-filter-change="onFilterChange"
              :color="color"
            >
              <p class="text-gray-500">
                No custom filter provided. Slot name: {{ `custom_filter(${filter.key})` }}
              </p>
            </slot>
          </div>
        </DropdownMenuSub>
        <DropdownMenuSeparator v-if="key < Object.keys(filters).length - 1" />
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { computed } from "vue";
import ToggleFilter from "./TableFilters/ToggleFilter.vue";
import NumberRangeFilter from "./TableFilters/NumberRangeFilter.vue";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button/index.js";
import { Funnel } from "lucide-vue-next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

const props = defineProps({
    hasEnabledFilters: {
        type: Boolean,
        required: true,
    },

    filters: {
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

const activeFiltersCount = computed(() => {
    return props.filters.filter((f) => !filterIsNull(f)).length;
});

function filterIsNull(filter) {
    if (filter.value === null) return true;
    switch (filter.type) {
    case "number_range":
        return  Number(Math.max(...filter.value)) === Number(filter.max) && Number(Math.min(...filter.value)) === Number(filter.min);
    case "select":
        return filter.value === "";
    case "toggle":
        return false;
    default:
        return !filter.value;
    }
}

function updateNumberRangeFilter(filter) {
    let value = filter.value;
    if (filter.value) {
        if (Number(Math.max(...filter.value)) === Number(filter.max) && Number(Math.min(...filter.value)) === Number(filter.min)) {
            value = null;
        } else if (Number(Math.min(...filter.value)) === 0 && Number(Math.max(...filter.value)) === 0) {
            value = ["0", "0"];
        }
    }
    props.onFilterChange(filter.key, value);
}
</script>

