import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Archive from "../pages/Archive.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/archive",
        name: "archive",
        component: Archive
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;