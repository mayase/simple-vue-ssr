<style></style>
<template>
    <div class="item">
        <div class="title">{{item.title}}</div>
    </div>
</template>
<script>
    export default{
        props: {
            item:{default:{
                title: 'Title placeholder'
            }}
        }
    }
</script>