<template>
  <div
    v-for="(searchInput, key) in searchInputs"
    v-show="searchInput.value !== null || isForcedVisible(searchInput.key)"
    :key="key"
  >
    <div class="flex relative">
      <Label
        :for="searchInput.key"
        class="inline-flex items-center gap-2 px-4 rounded-l-md border border-r-0 border-input bg-muted text-primary text-sm shadow-xs w-fit shrink-0"
      >
        <Search class="size-4.5" />
        <span>{{ searchInput.label }}</span>
      </Label>
      <Input
        :id="searchInput.key"
        :ref="skipUnwrap.el"
        :key="searchInput.key"
        :name="searchInput.key"
        :model-value="searchInput.value"
        type="text"
        class="rounded-l-none"
        @update:model-value="onChange(searchInput.key, $event)"
      />
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <button
          :dusk="`remove-search-row-${searchInput.key}`"
          @click.prevent="onRemove(searchInput.key)"
        >
          <span class="sr-only">Remove search</span>
          <X class="size-4.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from "vue";
import find from "lodash-es/find";
import { Search, X } from "lucide-vue-next";
import { Input } from "../components/ui/input/index.js";

const skipUnwrap = { el: ref([]) };
let el = computed(() => skipUnwrap.el.value);

const props = defineProps({
    searchInputs: {
        type: Object,
        required: true,
    },

    forcedVisibleSearchInputs: {
        type: Array,
        required: true,
    },

    onChange: {
        type: Function,
        required: true,
    },

    onRemove: {
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

function isForcedVisible(key) {
    return props.forcedVisibleSearchInputs.includes(key);
}

watch(props.forcedVisibleSearchInputs, (inputs) => {
    const latestInput = inputs.length > 0 ? inputs[inputs.length -1] : null;

    if(!latestInput) {
        return;
    }

    nextTick().then(() => {
        const inputElement = find(el.value, (el) => {
            return el.name ===  latestInput;
        });

        if(inputElement) {
            inputElement.focus();
        }
    });
}, { immediate: true });
</script>

