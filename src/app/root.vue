<style src="./styles/styles.scss" lang="scss"></style>
<template>
    <div id="root">
        <div class="header">
            <h1>Hello! This is SSR test app</h1>
            <div class="nav">
                <router-link :to="{path: '/'}">Main</router-link>
                <router-link :to="{path: 'list'}">About</router-link>
            </div>
        </div>
        <div id="page">
            <router-view></router-view>
        </div>
    </div>
</template>