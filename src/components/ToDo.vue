<script setup>
import {ref} from 'vue';
import { directive as vClickOutside } from 'click-outside-vue3'
import {getDataFromStorage,saveIntoStorage} from '../composables/saveData.js'
defineProps({
    title: String,
    description: String,
    menuStatus: Boolean,
  index: Number
})
let menuShowed = ref();

/* Remove Todos list from Storage */
const deleteTodo = (index) => {
  /* Get the Data from LocalStorage */
  let currentData = JSON.parse(getDataFromStorage(1))
  /* Delete the data, base from the loop index number */
  delete currentData[index]
  /* Because the "delete" keyword will return the "deleted value" into "null"
  * We need to remove the null value from the array, so we will get only an
  * Empty array otherwise the app will crash*/
  let filtered = currentData.filter(function (elements) {
    return elements !== null
  })
  /* Overwrite old data with the new one */
  saveIntoStorage(filtered, 1)
}
const clickOusideTheBox =  () => {
  menuShowed.value = false
}
</script>

<template>
    <div class="to-do-container" v-click-outside="clickOusideTheBox" @click.capture="(menuShowed = false)">
        <h2>{{ title }}</h2>
        <p v-html="description ? description : '<span>no description provided</sp>'"></p>
        <div class="kebab-menu" @click="(menuShowed = true)">
            <span></span>
            <span></span>
            <span></span>
        </div>
            <Transition>
                <div class="menu" v-if="menuShowed">
                    <ul>
                        <li @click="deleteTodo(index); $emit('refreshData')">Delete</li>
                        <hr/>
                        <li>Mark as done</li>
                    </ul>
                </div>
            </Transition>
        </div>
</template>

<style scoped>
.to-do-container {
    position: relative;
    min-height: 100px;
    padding: 8px 16px;
    text-align: left;
    background-color: #eedeee;
    border-radius: 2px;
}
.to-do-container h2 {
    color: #4f0147;
    line-height: 24px;
}
.to-do-container p {
    margin: 8px 0;
    color: #4f0147aa;
    font-size: 0.9rem;
}
.to-do-container p span {
    font-style: italic;
}
.kebab-menu {
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 8px;
    right: 8px;
    cursor: pointer;
}
.kebab-menu span {
    width: 4px;
    height: 4px;
    margin-bottom: 2px;
    border-radius: 50%;
    background-color: #222;
}
.menu {
    position: absolute;
    padding: 8px 12px;
    top: -4px;
    right: -4px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 16px #4f0147aa;
    user-select: none;
}
.menu li {
    list-style-type: none;
    margin: 6px 0;
    color: #222;
    cursor: pointer;
}
.v-enter-from, .v-leave-to {
    transform: scale(0);
    opacity: 0;
    transform-origin: top right;
}
.v-enter-active, .v-leave-active {
    transform: scale(0);
    transition: all 0.1s ease-in-out;
}
.v-enter-to, .v-leave-from {
    opacity: 1;
    transform: scale(1);
    transform-origin: top right;
}
</style>