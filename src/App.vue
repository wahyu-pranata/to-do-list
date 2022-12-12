<script setup>
import {ref, computed, Transition, onBeforeMount} from 'vue';

// Components
import Navbar from './components/Navbar.vue';
import ToDoModal from './components/ToDoModal.vue';
import ToDo from './components/ToDo.vue';

//Composables
import {useValidation} from './composables/useValidation.js';
import {useStorageAvailable} from './composables/useStorageAvailable.js';
import {getDataFromStorage, saveIntoStorage} from './composables/saveData.js'

let showModal = ref(false);
let toDos = ref([]);
let formError = ref();
let storageError = ref();
const modalShowed = computed(() => {
  return showModal.value ? 'max-height: 100vh; overflow: hidden;' : ''
});

// Check for local storage availability
storageError.value = !useStorageAvailable('localStorage');
// Get Data before any html element is loaded
onBeforeMount(() => {
  // Check if the old data still exists
  if (JSON.parse(getDataFromStorage(1)).length !== 0) {
    toDos.value = JSON.parse(getDataFromStorage(1))
  } else {
    // otherwise write with empty array
    saveIntoStorage([],1)
  }
})

/*Due to local storage is not reactive by default
we need to refresh the data everytime the data is changed
for example when deleting the data
 */
function updateData() {
  toDos.value = JSON.parse(getDataFromStorage(1))
}

// Create new to-do
function create(form) {
  if (useValidation(form)) {
    formError.value = useValidation(form);
  } else {
    let toDo = {title: null, description: null};
    toDo.title = form.title;
    toDo.description = form.description;
    toDos.value.push(toDo)
    saveIntoStorage(toDos.value, 1)
    showModal.value = false;
  }
}
</script>

<template>
  <div class="wrapper" :class="[{'blurbg_and_zoom_in':modalShowed},{'blurbg_and_zoom_out':!modalShowed}]">
    <Navbar/>
    <main class="container" :style="modalShowed">
      <div v-if="!storageError">
        <div v-if="(toDos.length > 0)">
          <button @click="showModal = !showModal" class="submit">Add new to-do</button>
          <div class="to-dos-container">
            <ToDo v-for="(toDo, index) in toDos" :key="toDo" @refreshData="updateData" :title="toDo.title"
                  :index="index" :description="toDo.description"/>
          </div>
        </div>
        <div v-else>
          <h1>You don't have any to-do list<br>&gt;﹏&lt;</h1>
          <button @click="showModal = !showModal" class="submit">Add new to-do</button>
        </div>
      </div>
      <div v-else>
        <h1>We're sorry, but your browser doesn't support local storage<br>&gt;﹏&lt;</h1>
      </div>
    </main>
  </div>
  <Transition name="fade">
    <div class="overlay" v-if="showModal">
      <ToDoModal class="form" @close="(showModal = false)" @create="create" :error-msg="formError"
                 @clear-err="formError = ''"/>
    </div>
  </Transition>
</template>

<style>
.wrapper {
  overflow: hidden;
}
/* Background Effect In */
.blurbg_and_zoom_in {
  filter: blur(4em);
  transform: scale(1.2) rotateX(40deg);
  transition: all 0.3s ease-in-out;
}
/* Background Effect Out */
.blurbg_and_zoom_out {
  filter: blur(0);
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

.overlay {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  min-height: 100vh;
  min-width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.container {
  min-height: calc(100vh - 50px);
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
