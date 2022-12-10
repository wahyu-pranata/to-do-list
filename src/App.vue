<script setup>
import { ref, computed, Transition } from 'vue';

// Components
import Navbar from './components/Navbar.vue';
import ToDoModal from './components/ToDoModal.vue';
import ToDo from './components/ToDo.vue';

//Composables
import { useValidation } from './composables/useValidation.js';
import { useStorageAvailable } from './composables/useStorageAvailable.js';

let showModal = ref(false);
let toDos = ref([]);
let formError = ref();
let storageError = ref();
let indexs = ref();
const modalShowed = computed(() => {
	return showModal.value ? 'max-height: 100vh; overflow: hidden;' : ''
});

// Check for local storage availability
storageError.value = !useStorageAvailable('localStorage');

// Create new to-do
function create(form) {
	if(useValidation(form)) {
		formError.value = useValidation(form);
	} else {
		let toDo = {title: null, description: null };
		toDo.title = form.title;
		toDo.description = form.description;
		toDos.value.push(toDo);
		showModal.value = false;
	}
}
</script>

<template>
	<Navbar />
	<main class="container" :style="modalShowed">
		<div v-if="!storageError">
			<div v-if="(toDos.length > 0)">
				<button @click="showModal = !showModal" class="submit">Add new to-do</button>
				<div class="to-dos-container" >
					<ToDo v-for="(toDo, index) in toDos" :key="toDo" :title="toDo.title" :index="index" :description="toDo.description"/>
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
	<Transition name="fade">
		<div class="overlay" v-if="showModal">
			<ToDoModal class="form" @close="(showModal = false)" @create="create" :error-msg="formError" @clear-err="formError = ''" />
		</div>
	</Transition>
</template>

<style>
.overlay {
	position: absolute;
	inset: 0;
	background-color: #00000077;
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
