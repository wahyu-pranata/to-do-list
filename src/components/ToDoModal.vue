<script setup>
import { ref, onMounted } from 'vue';
let form = ref({
    title: "",
    description: ""
});
const input = ref(null);

defineProps({
    errorMsg: String
});

// On modal mounted 
onMounted(() => {
    input.value.focus();
});
</script>

<template>
    <div class="input-container">
        <form>
            <header>
                <h2>Add new to-do</h2>
                <small v-if="errorMsg">{{ errorMsg }}</small>
            </header>
            <div>
                <label for="title">Title <span>*</span></label>
                <input type="text" id="title" v-model="form.title" @keypress="$emit('clearErr')" ref="input">
            </div>
            <div>
                <label for="description">Description</label>
                <textarea id="description" rows="4" v-model="form.description"></textarea>
            </div>
            <div>
                <button type="button" class="close" @click="$emit('close')">Close</button>
                <button type="button" @click.prevent="$emit('create', form)">Add</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.input-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 8px 0;
    padding: 8px 16px;
    background-color: #eedeee;
    color: #222;
    border-radius: 2px;
}
header {
    margin-bottom: 8px;
}
header h2 {
    color: #1e293b;
}
header small {
    color: #f00;
}
form div {
    margin-bottom: 16px;
}
label {
    text-align: left;
    display: block;
    font-weight: 600;
}
label span {
    color: #f00;
}
input, textarea {
    min-width: 480px; 
    margin-right: 2px;
    padding: 4px 8px;
    background-color: #ffffff;
    color: #000;
    font-size: 0.8rem;
    font-family: "Proza Libre", Helvetica, Arial, sans-serif;
    border: 1px solid #4f0147;
    border-radius: 2px;
    transition: all 0.3s ease;
}
input:focus, textarea:focus {
    outline: none;
    box-shadow: 0 0 0 1px #a855f7;
}
textarea {
    resize: vertical;
}
button {
    margin: 0 2px;
    padding: 8px 24px;
    background-color: #3a015c;
    color: #fff;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
button.close {
    background-color: #fff;
    color: #3a015c;
    border: 1px solid #3a015c;
}
.error {
    display: block;
    margin: 4px 0;
    color: #f00;
    text-align: left;
}
</style>