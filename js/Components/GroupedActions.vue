<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <EllipsisVertical class="size-4.5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuSub
        v-if="'searchFields' in actions && actions.searchFields.show"
      >
        <DropdownMenuSubTrigger>
          <Search />
          {{ translations.add_search_fields ?? 'Add search field' }}
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem
                v-for="(searchInput, key) in actions.searchFields.searchInputs"
                :key="key"
                @select.prevent
                @click.prevent="actions.searchFields.onClick(searchInput.key)"
            >
              {{ searchInput.label }}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger
            v-if="'toggleColumns' in actions && actions.toggleColumns.show"
        >
          <Eye />{{ translations.show_hide_columns ?? 'Show / Hide columns' }}</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
                v-for="(column, key) in actions.toggleColumns.columns"
                v-show="column.can_be_hidden"
                :key="key"
              :model-value="!column.hidden"
                @select.prevent
              @click.prevent="actions.toggleColumns.onChange(column.key, column.hidden)"
            >

                {{ column.label }}
              </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-if="'reset' in actions"
        variant="destructive"
        @click="actions.reset?.onClick"
      >
        <X />
        {{ translations.grouped_reset ?? 'Reset' }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { getTranslations } from "../translations.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Search, EllipsisVertical, X, Eye } from "lucide-vue-next";

const translations = getTranslations();

const props = defineProps({
    actions: {
        type: Object,
        required: true,
    },

    color: {
        type: String,
        default: "primary",
        required: false,
    },
});
</script>
