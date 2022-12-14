<template>
    <nav>
        <h1>To Do List</h1>
        <div>
            <router-link :to="{name: 'home'}">Home</router-link>
            <router-link :to="{name: 'archive'}">Archive</router-link>
        </div>
    </nav>
</template>

<style scoped>
nav {
    background-color: #ffffff33;
}
h1 {
    color: #fff;
    padding: 4px 0;
}
div {
    display: flex;
    justify-content: center;
    padding: 4px 0;
    gap: 8px;
    background-color: #00000033;
}
div > * {
    color: #ffffffaa;
    text-decoration: none;
}
.router-link-active, 
.router-link-exact-active {
    color: #fff;
}
</style>