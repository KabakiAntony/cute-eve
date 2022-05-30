<template>
<div class="actions">
    <button class="action-links" @click="openAction($event,'newStock')">New Stock</button>
    <button class="action-links" @click="openAction($event, 'updateStock')">Update Stock</button>
    <button class="action-links" @click="openAction($event, 'generateReports')">Generate Reports</button>
</div>
<div class="actionContent" id="newStock">
    <h3>Upload new stock file</h3>
    <p><span>New stock is stock that did not exist before and now your are introducing it.</span></p>
    <hr>
  <form @submit.prevent="uploadStockFile" class="dashboard">
    <label>New stock file</label>
    <input type="file"  class="file" id="newItemFile" accept=".xlsx, .xls" required/>
    <button :class="action" class="submit list-left">{{ new_stock_submit }}</button>
    </form>
</div>
<div class="actionContent" id="updateStock">
    <h3>Make changes to stock</h3>
    <p>You can make changes to an item that is change things like <span>Units, Prices, Name</span></p>
    <p>First step is to search for the item in the search bar.</p>
    <p><span>If the item is found select it by clicking on it.</span></p>
    <Search @on_click_search="handleSearch"/>
    <hr>
    <div class="items-list">
        <ul>
            <li><label class="li-label">Item</label></li>
            <li><label class="li-label">Units Available</label></li>
            <li><label class="li-label">Buying Price</label></li>
            <li><label class="li-label">Selling Price</label></li>
        </ul>
    </div>
    <div class="items" v-for=" item in search_result" :key="item.item_sys_id" @click="item_to_update(item)">
        <ul>
            <li>{{ item.item }}</li>
            <li>{{ item.units }}</li>
            <li>{{ item.buying_price}}</li>
            <li>{{ item.selling_price }}</li>
        </ul>
    </div>
    <ChangesModal v-bind="changesModalProps" :action="action" @clearSearchResult="clearTableAndUpdate"/>
</div>
<div class="actionContent" id="generateReports">
    <p>generate reports</p>
</div>
</template>

<script>
import Search from  "@/components/Search.vue"
import ChangesModal  from "@/components/ChangesModal.vue"
import { openAction, loadToast, loadSpinner, unloadSpinner } from "../utils"

export default{
    name: "ProcurementDash",
    emits:['actionFeedback'],
    components:{
        Search,
        ChangesModal,
    },
    data(){
        return{
            changesModalProps:{
                item_id:"",
                item_name:"",
                item_units:0,
                item_buying_price:0,
                item_selling_price:0,
            },
            new_stock_submit: "Upload",
            update_stock_submit: "Modify",
            generate_report_submit: "Suspend",
            update_item_submit: "Save changes",
            showChangesModal:false,
            action:null,
            items:[],
            search_result:[],
        }
    },
    methods:{
        openAction,
        loadToast,
        loadSpinner,
        unloadSpinner,
        async uploadStockFile(){
            this.action="submitting";
            this.loadSpinner();
            this.new_stock_submit = "";
            let fileInput = document.getElementById('newItemFile');
            const theFile = new FormData();
            theFile.append('newItemFile',fileInput.files[0]);
            try{
                    const url = `${this.$api}items/upload`
                    const res = await fetch(url,{
                    method:'POST',
                    headers:{
                        'auth_token':this.$store.getters.AuthToken
                    },
                    body: theFile
                    })
                    const data = await res.json()
                    if (data.status === 200){
                        this.unloadSpinner();
                        this.message = data.data
                        this.type = "success"
                        this.$emit('actionFeedback', this.message,this.type)
                    }
                    else{
                        this.unloadSpinner();
                        this.message = data.error
                        this.type ="error"
                        this.$emit('actionFeedback', this.message,this.type)
                    }
                }
                catch(err){
                    let error = "The server is offline or unreachable."
                    return err
                }
                this.action = ""
                this.new_stock_submit="Upload"
        },
        handleSearch(searchItem){
            const filter_result = this.items.filter((arr)=>{
            return arr.item.toLowerCase().includes(`${searchItem}`.toLowerCase())
        });
        this.search_result = filter_result
        },
        item_to_update(this_item){
            document.getElementById("changes-modal").style.display = "block";
            this.changesModalProps.item_id = this_item.item_sys_id;
            this.changesModalProps.item_name = this_item.item;
            this.changesModalProps.item_units = this_item.units;
            this.changesModalProps.item_buying_price = this_item.buying_price;
            this.changesModalProps.item_selling_price = this_item.selling_price;
        },
        async clearTableAndUpdate(){
            // clear search result and update table
            this.search_result.length = 0;
            await this.$store.dispatch('getItems');
            this.items = this.$store.getters.Items;
        }
        // other methods come here
    },
    // lifecycle hooks below here.
    async created(){
        await this.$store.dispatch('getItems')
        this.items = this.$store.getters.Items
    },
    mounted(){
        // we don't want the modal showing on load
        // the reason is we don't want to use v-show or v-if
        document.getElementById("changes-modal").style.display = "none";
    }
}
</script>
<style>
.items{
    overflow: hidden;
    background-color:#DBDBDB;
    font-weight: bold;
    border-bottom:1px solid #000000;
}
.items li{
  width: 25%;
}
.items:hover{
    background-color:#3c9b3c;
    color:#ffffff;
}
.no-border{
    border: none;
}
</style>