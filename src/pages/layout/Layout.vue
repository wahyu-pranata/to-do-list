<script setup>
import { ref } from "vue";
import Navbar from "../../components/Navbar.vue"
import { useStorageAvailable } from "../../composables/useStorageAvailable.js";

let storageError = ref();

// Check for local storage availability
if (useStorageAvailable("localStorage")) {
    if (!localStorage.getItem("toDos")) {
        localStorage.setItem("toDos", '{ "data": [] }');
    }
} else {
    storageError.value = !useStorageAvailable("localStorage");
}

</script>

<template>
    <main class="container">
        <Navbar />
        <div v-if="!storageError">
            <slot></slot>
        </div>
        <div v-else class="empty-container">
            <h1>We're sorry, but your browser doesn't support local storage<br>&gt;﹏&lt;</h1>
        </div>
    </main>
</template>

<style scoped>
.container {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.container>div {
    width: 100%;
}
</style>
