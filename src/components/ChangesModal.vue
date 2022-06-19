<template>
    <div class="backdrop" id="changes-modal">
        <div class="modal">
        <div class="close"  @click.self="closeModal">+</div>
        <div class="item-to-update">
            <h4 class="text-center">Update the item below</h4>
            <div class="items-list">
            <ul class="larger-screens">
                <li><label class="li-label">Item</label></li>
                <li><label class="li-label">Units Available</label></li>
                <li><label class="li-label">Buying Price</label></li>
                <li><label class="li-label">Selling Price</label></li>
            </ul>
            <ul class="smaller-screens">
            <li><label class="li-label">Item</label></li>
            <li><label class="li-label">Available</label></li>
            </ul>
        </div>
        <div class="items no-border">
            <ul class="larger-screens">
                <li>{{ item_name }}</li>
                <li>{{ item_units }}</li>
                <li>{{ item_buying_price}}</li>
                <li>{{ item_selling_price }}</li>
            </ul>
            <ul class="smaller-screens">
                <li>{{ item_name }}</li>
                <li>{{ item_units }}</li>
            </ul>
        </div>
        <hr>
        <DashNotifications v-if='show' :class='type' :message='message'/>
        <form  @submit.prevent="updateItem" class="dash">
        <input type="hidden" v-model="item_id">
        <label>Name</label>
        <input type="text" v-model="item_name">
        <label>Units Available</label>
        <input type="number" v-model="item_units" min="0" step="0.01">
        <label>Buying Price</label>
        <input type="number" v-model="item_buying_price" min="0" step="0.01">
        <label>Selling Price</label>
        <input type="number" v-model="item_selling_price" min="0" step="0.01">
        <button :class="action" class="submit dashboard-submit">{{ update_item_submit }}</button>
        </form>
        <p class="center-text"><span>Make sure you save your changes to the database</span></p>
    </div>
    </div>
    </div>
</template>

<script>
import DashNotifications from "@/components/DashNotifications.vue"

export default {
    name: "ChangesModal",
    emits:['clearSearchResult'],
    components:{DashNotifications},
    props: {
        item_id:String,
        item_name:String,
        item_units:Number,
        item_buying_price:Number,
        item_selling_price:Number,
        },
    data(){
        return{
            update_item_submit:"Save changes",
            action:null,
            show:false,
            type:"",
            message:"",
        }
    },
    methods:{
        async closeModal(){
            this.$emit('clearSearchResult');            
            document.getElementById("changes-modal").style.display = "none";
        },
        async updateItem(){
            this.action="submitting";
            this.update_item_submit = "";
            const item_data = {
                "item_sys_id":this.item_id,
                "item":this.item_name,
                "units":this.item_units,
                "buying_price":this.item_buying_price,
                "selling_price":this.item_selling_price
            };
            try{
                    const url = `${this.$api}items/${this.item_id}`
                    const res = await fetch(url,{
                    method:'PATCH',
                    headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken
                    },
                    body: JSON.stringify(item_data)
                    })
                    const data = await res.json()
                    if (data.status === 200){
                        this.message = data.data;
                        this.type = "success";
                        this.show = true;
                        setTimeout(()=>{
                            this.type = "none"
                            this.message = ""
                        }, 5000)
                    }
                    else{
                        this.message = data.error;
                        this.type ="error";
                        this.show = true;
                    }
                }
                catch(err){
                    let error = "The server is offline or unreachable."
                    return err
                }
                this.action = "";
                this.update_item_submit="Save changes";
        }
    }
}
</script>

<style>
.modal{
    width:90%;
    margin: 10px auto;
    background-color: #dbdbdb;
    padding:2px 10px;
}
.backdrop{
    left:0;
    top:0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    min-height: 100vh;
}
.modal-size{
  width: 100%;
}
</style>