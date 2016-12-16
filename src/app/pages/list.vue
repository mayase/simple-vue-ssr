<style></style>
<template>
    <div class="page-about">
        <h1>This content fetched from server</h1>
        <div class="list">
            <item :item="item" v-for="item in listData"></item>
        </div>
    </div>
</template>
<script>
    import Item from './../components/item.vue'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        components: {Item},
        data(){return{}},
        computed: mapGetters(['listData']),
        mounted(){
            if (!this.listData.length) preFetch(this.$store);
        },
        ssrFetch:preFetch,
        methods:{
            ...mapActions(['fetchList'])
        }
    }

    function preFetch(store){
        return store.dispatch('fetchList');
    }
</script>