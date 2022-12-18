<script setup>
import { ref } from 'vue';
import { createConfirmDialog } from 'vuejs-confirm-dialog'

import Layout from './layout/Layout.vue';
import ToDo from '../components/ToDo.vue';
import ModalDialog from '../components/ModalDialog.vue'

import { useGetToDos } from "../composables/useGetToDos.js";

const { reveal, onConfirm } = createConfirmDialog(ModalDialog)

let toDos = ref(useGetToDos("archived").data);
function deleteToDo(id) {
    reveal()
    onConfirm(() => {
        let existingData = useGetToDos();
        let parsedToDos = existingData.data.map((e) => JSON.parse(e));
        let stringToDos = [];
        for (let i = 0; i < parsedToDos.length; i++) {
            if (parsedToDos[i].id == id) {
                parsedToDos.splice(i, 1);
            }
        }
        parsedToDos.forEach(e => stringToDos.push(JSON.stringify(e)));
        existingData.data = stringToDos;
        localStorage.setItem("toDos", JSON.stringify(existingData));
        toDos.value = useGetToDos().data;
    })
}
</script>

<template>
    <Layout>
        <div v-if="(toDos.length > 0)">
            <div class="to-dos-container">
                <ToDo v-for="toDo in toDos" :key="JSON.parse(toDo).id" :title="JSON.parse(toDo).title"
                    :description="JSON.parse(toDo).description" :to-do-id="JSON.parse(toDo).id">
                    <template #list>
                        <ul>
                            <li @click="deleteToDo(JSON.parse(toDo).id)">Delete</li>
                        </ul>
                    </template>
                </ToDo>
            </div>
        </div>
        <div v-else class="empty-container">
            <h1>You don't have any archived to-do list<br>&gt;﹏&lt;</h1>
        </div>
    </Layout>
</template>

<style scoped>
.menu li {
    list-style-type: none;
    margin: 6px 0;
    color: #222;
    cursor: pointer;
}
.to-dos-container {
    margin-top: 16px;
    width: 100%;
    padding: 0 32px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
}
.empty-container {
    margin-top: 25vh;
}
</style>