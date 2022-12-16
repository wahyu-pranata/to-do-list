<script setup>
import { ref } from 'vue';

import { useGetToDos } from "../composables/useGetToDos.js";

let toDos = ref(useGetToDos("archived").data);
</script>

<template>
    <div v-for="toDo in toDos">{{ toDo }}</div>
</template>

<style>

</style>