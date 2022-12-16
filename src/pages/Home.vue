<script setup>
import { ref, computed, Transition } from "vue";
import { createConfirmDialog } from 'vuejs-confirm-dialog'

// Components
import ToDoModal from "../components/ToDoModal.vue";
import ToDo from "../components/ToDo.vue";
import ModalDialog from '../components/ModalDialog.vue'

//Composables
import { useGetToDos } from "../composables/useGetToDos.js";
import { useValidation } from "../composables/useValidation.js";
import { useStorageAvailable } from "../composables/useStorageAvailable.js";
import { useMakeId } from "../composables/useMakeId.js"

// Check for local storage availability
if (useStorageAvailable("localStorage")) {
    if (!localStorage.getItem("toDos")) {
        localStorage.setItem("toDos", '{ "data": [] }');
    }
} else {
    storageError.value = !useStorageAvailable("localStorage");
}

const { reveal, onConfirm } = createConfirmDialog(ModalDialog)

let showFormModal = ref(false);
let toDos = ref(useGetToDos().data);
let formError = ref();
let storageError = ref();
const modalShowed = computed(() => {
    return showFormModal.value ? "max-height: 100vh; overflow: hidden;" : ""
});

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
    <main class="container" :style="modalShowed">
        <div v-if="!storageError">
            <div v-if="(toDos.length > 0)">
                <button @click="showFormModal = !showFormModal" class="submit">Add new to-do</button>
                <div class="to-dos-container">
                    <ToDo 
                        v-for="toDo in toDos"
                        :key="JSON.parse(toDo).id"
                        :title="JSON.parse(toDo).title"
                        :description="JSON.parse(toDo).description"
                        :to-do-id="JSON.parse(toDo).id"
                        @delete="deleteToDo(JSON.parse(toDo).id)"
                        @mark-as-done="markAsDone(JSON.parse(toDo).id)"
                    />
                </div>
            </div>
            <div v-else class="empty-container">
                <h1>You don't have any to-do list<br>&gt;﹏&lt;</h1>
                <button @click="showFormModal = !showFormModal" class="submit">Add new to-do</button>
            </div>
        </div>
        <div v-else class="empty-container">
            <h1>We're sorry, but your browser doesn't support local storage<br>&gt;﹏&lt;</h1>
        </div>
    </main>
    <Transition name="fade">
        <div class="overlay" v-if="showFormModal">
            <ToDoModal class="form" @close="(showFormModal = false)" @create="create" :error-msg="formError"
                @clear-err="formError = ''" />
        </div>
    </Transition>
</template>

<style scoped>
.overlay {
    position: absolute;
    height: 100vh;
    inset: 0;
    background-color: #00000077;
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.container > div {
    width: 100%;
}

.submit {
    margin: 16px 0;
    padding: 8px 24px;
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