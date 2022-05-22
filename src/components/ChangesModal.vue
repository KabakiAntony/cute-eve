<template>
    <div class="backdrop"  @click.self="closeModal">
        <div class="modal">
        <div class="item-to-update">
        <h3>You can change the <span>Units / Price /Name</span> of this item</h3>
        <form  @submit.prevent="updateItem" class="dashboard update-form">
        <label>Item</label>
        <input type="text">
        <label>Units Available</label>
        <input type="text">
        <label>Selling Price</label>
        <input type="text">
        <label>Buying Price</label>
        <input type="text">
        <button :class="action" class="submit list-left">{{ update_item_submit }}</button>
        </form>
    </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChangesModal",
    props: {
        update_item_submit: String,
    },
    data(){
        return{

        }
    },
    methods:{
        closeModal(){
            this.$emit('close')
        }
    }
}
</script>

<style>
.modal{
    width:80%;
    margin: 50px auto;
    background-color: #dbdbdb;
    border-radius: 10px;
}
.backdrop{
    left:0;
    top:0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    min-height: 100vh;
}
</style>