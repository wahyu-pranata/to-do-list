<script setup>
import { ref, Transition } from 'vue';
import Navbar from './components/Navbar.vue';
import AddToDo from './components/AddToDo.vue';

let show = ref(false);
</script>

<template>
  <Navbar/>
  <main class="container">
    <h1>You don't have any to-do list<br>&gt;﹏&lt;</h1>
    <button @click="show = !show" class="submit">Add new to-do</button>
      <div v-if="show">
        <AddToDo @close="show = false" class="form"/>
      </div>
  </main>
</template>

<style>
.container {
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.submit {
  margin: 16px 0;
  padding: 4px 8px;
  font-family: "Proza Libre", Helvetica, Arial, sans-serif;
  background-color: #fff;
  color: #3a015c;
  font-size: 1rem;
  border-radius: 2px;
  border-width: 1px;
}
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
