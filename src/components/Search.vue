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