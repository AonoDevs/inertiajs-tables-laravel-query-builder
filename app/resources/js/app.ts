import "../css/app.css";
import { createInertiaApp } from "@inertiajs/vue3";
import BreezeGuestLayout from "@/Layouts/Guest.vue";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    layout: (name) => {
        return BreezeGuestLayout;
    },
    progress: {
        color: "#4B5563",
    },
});
