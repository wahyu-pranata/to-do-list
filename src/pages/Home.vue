<script setup>
import Layout from "./layout/Layout.vue";

import { ref, Transition } from "vue";
import { createConfirmDialog } from 'vuejs-confirm-dialog'

// Components
import ToDoModal from "../components/ToDoModal.vue";
import ToDo from "../components/ToDo.vue";
import ModalDialog from '../components/ModalDialog.vue'

//Composables
import { useGetToDos } from "../composables/useGetToDos.js";
import { useValidation } from "../composables/useValidation.js";
import { useMakeId } from "../composables/useMakeId.js"

const { reveal, onConfirm } = createConfirmDialog(ModalDialog)

let showFormModal = ref(false);
let toDos = ref(useGetToDos().data);
let formError = ref();

// Create new to-do
function create(form) {
    if (useValidation(form)) {
        formError.value = useValidation(form);
    } else {
        let existingData = useGetToDos() ?? { "data": [] };
        let toDo = {
            id: useMakeId(8),
            title: form.title,
            description: form.description,
            is_archived: false
        }
        existingData.data.push(JSON.stringify(toDo));
        localStorage.setItem("toDos", JSON.stringify(existingData));
        toDos.value = useGetToDos().data;
        showFormModal.value = false;
    }
}

// Delete selected to-do
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

function markAsDone(id) {
    let existingData = useGetToDos();
    let parsedToDos = existingData.data.map((e) => JSON.parse(e));
    let stringToDos = [];
    for (let i = 0; i < parsedToDos.length; i++) {
        if (parsedToDos[i].id == id) {
            parsedToDos[i].is_archived = true;
        }
    }
    parsedToDos.forEach(e => stringToDos.push(JSON.stringify(e)));
    existingData.data = stringToDos;
    localStorage.setItem("toDos", JSON.stringify(existingData));
    toDos.value = useGetToDos().data;
}
</script>

<template>
    <Layout>
        <div v-if="(toDos.length > 0)">
            <button @click="showFormModal = !showFormModal" class="toggle-form">Add new to-do</button>
            <div class="to-dos-container">
                <ToDo v-for="toDo in toDos" :key="JSON.parse(toDo).id" :title="JSON.parse(toDo).title"
                    :description="JSON.parse(toDo).description" :to-do-id="JSON.parse(toDo).id">
                    <template #list>
                        <ul>
                            <li @click="deleteToDo(JSON.parse(toDo).id)">Delete</li>
                            <hr />
                            <li @click="markAsDone(JSON.parse(toDo).id)">Mark as done</li>
                        </ul>
                    </template>
                </ToDo>
            </div>
        </div>
        <div v-else class="empty-container">
            <h1>You don't have any to-do list<br>&gt;﹏&lt;</h1>
            <button @click="showFormModal = !showFormModal" class="toggle-form">Add new to-do</button>
        </div>
        <Transition name="fade">
            <div class="overlay" v-if="showFormModal">
                <ToDoModal class="form" @close="(showFormModal = false)" @create="create" :error-msg="formError"
                    @clear-err="formError = ''" />
            </div>
        </Transition>
    </Layout>
</template>

<style scoped>
.overlay {
    overflow: hidden;
    position: absolute;
    min-height: 100vh;
    inset: 0;
    background-color: #00000077;
}

.toggle-form {
    padding: 8px 24px;
    margin: 16px;
    font-family: "Proza Libre", Helvetica, Arial, sans-serif;
    background-color: #fff;
    color: #3a015c;
    font-size: 1rem;
    border: 1px solid #3a015c;
    border-radius: 2px;
    cursor: pointer;
}

.form {
    z-index: 1;
}

.vh {
    height: 100vh;
}

.to-dos-container {
    width: 100%;
    padding: 0 32px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
}

.empty-container {
    margin-top: 25vh;
}
.menu li {
    list-style-type: none;
    margin: 6px 0;
    color: #222;
    cursor: pointer;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.1s ease-in-out;
}
</style>