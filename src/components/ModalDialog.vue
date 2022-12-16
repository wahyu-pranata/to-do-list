<script setup>
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
    <div class="overlay">
        <div class="alert-container">
            <header>
                Are you sure want to delete this to-do?
            </header>
            <footer>
                <div>
                    <button class="secondary" @click="emit('cancel')">No</button>
                    <button class="primary" @click="emit('confirm')">Yes</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: absolute;
        height: 100vh;
        inset: 0;
        background-color: #00000077;
}
.alert-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 8px 0;
    padding: 8px 16px;
    background-color: #eedeee;
    border-radius: 2px;
}

header {
    margin-bottom: 8px;
    color: #1e293b;
    font-weight: 600;
    font-size: 1.2em;
}

header::after {
    display: block;
    margin: 4px auto;
    content: "";
    width: 80%;
    height: .7px;
    background-color: #1e293bdd;
}

footer {
    margin-top: 8px;
}

footer div {
    display: flex;
    justify-content: center;
    gap: 8px;
}

button {
    padding: 4px 12px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.primary {
    background-color: #3a015c;
    color: #fff;
}

.secondary {
    background-color: #fff;
    color: #3a015c;
    border: 1px solid #3a015c;
}

.primary:hover {
    background-color: #3a015cdd;
}

.secondary:hover {
    background-color: #ddd;
}
</style>