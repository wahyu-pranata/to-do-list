<script setup>
import { ref, computed, Transition } from 'vue';
import Navbar from './components/Navbar.vue';
import ToDoModal from './components/ToDoModal.vue';
import { useValidation } from './composables/useValidation.js'
import { storageAvailable } from './composables/storageAvailable.js'

let show = ref(false);
let toDos = ref([]);
let formError = ref();
let storageError = ref();
let modalShowed = computed(() => {
	return show.value ? 'max-height: 100vh; overflow: hidden;' : ''
});

if(!storageAvailable('localStorage')) {
	storageError.value = true;
} else {
	storageError.value = false;
}

function create(form) {
	if(useValidation(form)) {
		formError.value = useValidation(form);
	} else {
		//
	}
}
</script>

<template>
	<Navbar />
	<main class="container" :style="modalShowed">
		<div v-if="!storageError">
			<h1>You don't have any to-do list<br>&gt;﹏&lt;</h1>
			<button @click="show = !show" class="submit">Add new to-do</button>
			<Transition name="fade-down">
				<div v-if="show">
					<ToDoModal class="form" @close="show = false" @create="create" :error-msg="formError"
						@clear-err="formError = ''" />
				</div>
			</Transition>
		</div>
		<div v-else>
			<h1>We're sorry, but your browser doesn't support local storage<br>&gt;﹏&lt;</h1>
		</div>
	</main>
	<div class="overlay" v-if="show"></div>
</template>

<style>
.overlay {
	position: absolute;
	inset: 0;
	background-color: #00000077;
}

.container {
	min-height: calc(100vh - 50px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
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
	position: relative;
	z-index: 1;
}

.vh {
	height: 100vh;
}

.fade-down-enter-from,
.fade-down-leave-to {
	opacity: 0;
}

.fade-down-enter-to,
.fade-down-leave-from {
	opacity: 1;
}

.fade-down-enter-active,
.fade-down-leave-active {
	transition: all 0.1s ease-in-out;
}
</style>
