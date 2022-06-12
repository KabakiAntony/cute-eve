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
    <div class="results-overflow">
        <div class="items" v-for=" item in search_result" :key="item.item_sys_id" @click="item_to_update(item)">
            <ul>
                <li>{{ item.item }}</li>
                <li>{{ item.units }}</li>
                <li>{{ item.buying_price}}</li>
                <li>{{ item.selling_price }}</li>
            </ul>
        </div>
    </div>
    <ChangesModal v-bind="changesModalProps" :action="action" @clearSearchResult="clearTableAndUpdate"/>
</div>
<div class="actionContent" id="generateReports">
    <h3>Generate various reports</h3>
    <hr>
    <div class="reports">
        <h4>Stock available report</h4>
        <p>Show a report of all stock</p>
        <button :class="action" class="submit get-report" @click="get_stock_report">{{ get_stock_submit }}</button>
    </div>
    <hr>
    <div class="reports">
        <h4>Sales reports by date</h4>
        <p>Show a sales report for a given duration, just enter the start and end date.</p>
        <label>Start date</label>
        <input type="date" class="get-report" v-model="start_date" required>
        <label>End date</label>
        <input type="date" class="get-report" v-model="end_date" required>
        <button :class="action" class="submit get-report get-report-top" @click="generate_dated_sale_report">{{ dated_sales_submit }}</button>
    </div>
</div>
</template>

<script>
import Search from  "@/components/Search.vue"
import ChangesModal  from "@/components/ChangesModal.vue"
import { 
    openAction,
    loadToast, 
    loadSpinner, 
    unloadSpinner, 
    stockInShop,
    salesReportByDate } from "../utils"

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
            get_stock_submit: "Get stock report",
            dated_sales_submit: "Get sales report",
            showChangesModal:false,
            start_date:"",
            end_date:"",
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
        stockInShop,
        salesReportByDate,
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
        },
        async get_stock_report(){
            this.action="submitting";
            this.get_stock_submit=" ",
            this.loadSpinner();

            // clear item list and reload
            this.items.length = 0;
            await this.$store.dispatch('getItems');
            this.items = this.$store.getters.Items;

            // generate report here
            let columns =  [
              { header:'ITEM', dataKey: 'item' },
              { header:'UNITS', dataKey: 'units'},
              { header:'UNIT PRICE', dataKey: 'buying_price'},
              { header:'COST', dataKey: 'cost' },
              ]

            // get the cost of each unit and return a new array
            this.stockInShop(this.items, columns);
            
            this.action="";
            this.get_stock_submit="Get stock report";
            this.unloadSpinner();
        },
        async get_dated_sales(){
            this.action="submitting";
            this.dated_sales_submit=" ",
            this.loadSpinner();
            try{
                    const url = `${this.$api}sales/${this.start_date}/${this.end_date}`
                    const res = await fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'auth_token':this.$store.getters.AuthToken
                    },
                    })
                    const response = await res.json()
                    if (response.status === 200){
                        this.unloadSpinner();
                        this.message = "Report data fetched successful, wait for report to render.";
                        this.type = "success";
                        this.$emit('actionFeedback', this.message,this.type);
                        return response.data;
                    }
                    else{
                        this.unloadSpinner();
                        this.message = response.error
                        this.type ="error"
                        this.$emit('actionFeedback', this.message,this.type)
                        this.action=" ";
                        this.dated_sales_submit="Get sales report";
                    }
                }
                catch(err){
                    let error = "The server is offline or unreachable."
                    return err
                }
        },
        async generate_dated_sale_report(){
            let sales_data = await  this.get_dated_sales();
            this.action=" ";
            this.dated_sales_submit="Get sales report";

            let columns =  [
              { header:'ITEM', dataKey: 'item' },
              { header:'UNITS SOLD', dataKey: 'units_sold'},
              { header:'UNIT PRICE', dataKey: 'unit_price'},
              { header:'TOTAL', dataKey: 'total' },
              ]
            this.salesReportByDate(sales_data, columns, this.start_date, this.end_date);
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
.results-overflow{
    max-height:400px;
    overflow-x: hidden;
    overflow-y: auto;
}
.get-report{
    width:20%;
    display: block;
}
.reports{
    padding:10px;
}
.get-report-top{
    margin-top:20px;
}
</style>