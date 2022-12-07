<script setup>
import { ref, computed, Transition } from 'vue';
import Navbar from './components/Navbar.vue';
import ToDoModal from './components/ToDoModal.vue';

let show = ref(false);
let modalShowed = computed(() => {
	return show.value ? 'max-height: 100vh; overflow: hidden;' : ''
})

function create(form) {
	//
}
</script>

<template>
	<Navbar />
	<main class="container" :style="modalShowed">
		<h1>You don't have any to-do list<br>&gt;﹏&lt;</h1>
		<button @click="show = !show" class="submit">Add new to-do</button>
		<Transition name="fade-down">
			<div v-if="show">
				<ToDoModal class="form" @close="show = false" @create="create" />
			</div>
		</Transition>
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
