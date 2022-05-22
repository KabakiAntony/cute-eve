<template>
    <div id="search-area">
        <input type="text" id="search_text" placeholder="Search item ..."  autocomplete="off">
        <button id="search_button"  type="button">Search</button>
    </div>
</template>
<script>
export default{
    name:"Search",
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
#search_button{
    width: 15%;
    color:#ffffff;
    background-color: #2C974B;
    height: 35px;
}
#search_button:hover{
  background-color: #689e77;
  color: #24292F;
  cursor: pointer;
}
</style>