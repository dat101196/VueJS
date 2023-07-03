<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link :to="{ name: 'Brazil' }">Brazil</router-link>
        <router-link :to="{ name: 'Hawaii' }">Hawaii</router-link>
        <router-link :to="{ name: 'Panama' }">Panama</router-link>
    </div>
</template>