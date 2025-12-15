<template>
  <nav
    v-if="hasPagination"
    class="py-3 flex items-center justify-between"
  >
    <p
      v-if="!hasData || pagination.total < 1"
      class="text-primary"
    >
      {{ translations.no_results_found }}
    </p>

    <!-- simple and mobile -->
    <div
      v-if="hasData"
      class="flex-1 flex justify-between"
      :class="{'sm:hidden': hasLinks}"
    >
      <Pagination
        :items-per-page="pagination.per_page"
      >
        <PaginationContent>
          <PaginationPrevious
            :disabled="!pagination.prev_page_url"
            @click="onClick(pagination.prev_page_url)"
          />
          <PerPageSelector
            dusk="per-page-mobile"
            :value="perPage"
            :options="perPageOptions"
            :on-change="onPerPageChange"
            :color="color"
          />
          <PaginationNext
            :disabled="!pagination.next_page_url"
            @click="onClick(pagination.next_page_url)"
          />
        </PaginationContent>
      </Pagination>
    </div>

    <!-- full pagination -->
    <div
      v-if="hasData && hasLinks"
      class="hidden sm:flex-1 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-4"
    >
      <div class="flex flex-row space-x-4 items-center grow">
        <PerPageSelector
          dusk="per-page-full"
          :value="perPage"
          :options="perPageOptions"
          :on-change="onPerPageChange"
          :color="color"
        />

        <p class="hidden lg:block text-sm text-primary grow">
          <span class="font-medium">{{ pagination.from }}</span>
          {{ translations.to }}
          <span class="font-medium">{{ pagination.to }}</span>
          {{ translations.of }}
          <span class="font-medium">{{ pagination.total }}</span>
          {{ translations.results }}
        </p>
      </div>
      <div>
        <Pagination
          v-slot="{ page }"
          show-edges
          :page="pagination.current_page"
          :items-per-page="pagination.per_page"
          :total="pagination.total"
          @update:page="(value) => onClick(pagination.links.find(link => link.label === value.toString())?.url)"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template
              v-for="(item, index) in items"
              :key="index"
            >
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>

              <PaginationEllipsis v-else />
            </template>

            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </nav>
</template>

<script setup>
import PerPageSelector from "./PerPageSelector.vue";
import { computed } from "vue";
import { getTranslations } from "../translations.js";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "../components/ui/pagination";

const translations = getTranslations();

const props = defineProps({
    onClick: {
        type: Function,
        required: false,
    },
    perPageOptions: {
        type: Array,
        default() {
            return [15, 30, 50, 100];
        },
        required: false
    },
    onPerPageChange: {
        type: Function,
        default() {
            return () => {};
        },
        required: false,
    },
    hasData: {
        type: Boolean,
        required: true,
    },
    meta: {
        type: Object,
        required: false,
    },
    color: {
        type: String,
        default: "primary",
        required: false,
    },
});

const hasLinks = computed(() => {
    if(!("links" in pagination.value)) {
        return false;
    }

    return pagination.value.links.length > 0;
});

const hasPagination = computed(() => {
    return Object.keys(pagination.value).length > 0;
});

const pagination = computed(() => {
    return props.meta;
});

const previousPageUrl = computed(() => {
    if ("prev_page_url" in pagination.value) {
        return pagination.value.prev_page_url;
    }

    return null;
});

const nextPageUrl = computed(() => {
    if ("next_page_url" in pagination.value) {
        return pagination.value.next_page_url;
    }

    return null;
});

const perPage = computed(() => {
    return parseInt(pagination.value.per_page);
});
</script>
