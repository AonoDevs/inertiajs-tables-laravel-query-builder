<script setup lang="ts">
//import { Table } from "@aonodevs/inertiajs-tables-laravel-query-builder";

// use this one for development:
import Table from "../../../../js/Components/Table.vue";

defineProps<{
    users: any;
}>();
</script>

<template>
    <Table
        :resource="users"
        :input-debounce-ms="50"
        :with-button-grouped-menu="true"
        :withGroupedMenu="true"
    >
        <template #cell(actions)="{ item: user }">
            <a
                :href="`/users/${user.id}/edit`"
            >
                Edit
            </a>
        </template>
    </Table>
</template>
