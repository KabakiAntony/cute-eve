<template>
    <div id="search-area">
        <input type="text" 
        id="search_text"
        v-model="search_text" 
        placeholder="Search item ..."
        @keyup="$emit('on_click_search', search_text)"
        autocomplete="off">
    </div>
</template>
<script>
export default{
    name:"Search",
    data(){
        return {
            search_text:null,
        }
    }
}
</script>
<style scoped>
#search-area {
    width:50%;
    height: 37px;
    bottom: 0;
    display:flex;
    flex-direction:row;
    text-align: right;
}
#search_text{
    border:1px solid #2C974B;
    flex:2;
    height: 35px;
}
</style>