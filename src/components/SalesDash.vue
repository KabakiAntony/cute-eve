<template>
<div class="actions">
    <button class="action-links" @click="openAction($event,'makeSale')">Sell</button>
    <button class="action-links" @click="openAction($event, 'generateReports')">Reports</button>
</div>
<div class="actionContent" id="makeSale">
    <p>Search for the item you want to sell below & select it by clicking on it.</p>      
    <Search class="float-right" @on_click_search="handleSearch"/>
    <hr>
    <div class="search-item-display">
        <div class="search-item-result">
            <div class="search-result-list">
                <ul>
                    <li><label class="li-label">Item</label></li>
                    <li><label class="li-label">Available Units</label></li>
                </ul>
            </div>
            <div class="possible-item">
                <div class="item" v-for=" item in search_result" :key="item.item_sys_id" @click="item_to_sell(item)">
                <ul>
                    <li>{{ item.item }}</li>
                    <li>{{ item.units }}</li>
                </ul>
                </div>
            </div>
        </div>
        <div class="item-on-sale">
            <form  @submit.prevent="add_to_cart" class="add-to-cart-form">
                <input type="hidden" v-model="item_id">
                <label>Item</label>
                <input type="text" class="item-name" disabled v-model="item_name">
                <label>Selling Price</label>
                <input type="text" v-model="item_selling_price" disabled>
                <p class="units-error" id="error_para">You can't sell more units than you have in stock</p>
                <label>Available Units</label>
                <input type="text" id="available_units" v-model="item_units" disabled>
                <label>Units to sell</label>
                <input type="number" id="units_to_sell" v-model="units_to_sell" min="0" step="0.01">
                <button type="submit" class="submit btn-add">Add to cart</button>
            </form>
        </div>
    </div>
    <hr>
    <div class="cart">
        <div class="cart-heading">
        <ul>
            <li><label class="li-label">Item</label></li>
            <li><label class="li-label">Units</label></li>
            <li><label class="li-label">Price</label></li>
            <li><label class="li-label">Total</label></li>
        </ul>
    </div>
    <div class="cart-holder">
        <div class="cart-items" v-for=" item in items_on_cart" :key="item.item_sys_id">
            <ul>
                <li>{{ item.item }}</li>
                <li>{{ item.units }}</li>
                <li>{{ item.selling_price }}</li>
                <li>{{ item.total }}</li>
            </ul>
        </div>
    </div>
    <div class="total">
        <ul>
            <li class="color">.</li>
            <li class="color">.</li>
            <li>Total</li>
            <li>{{ cartTotal }}</li>
        </ul>
    </div>
    <div class="post-sale">
        <button 
        type="submit" 
        class="submit post-sale" 
        :class="action" 
        @click="postSale" 
        :disabled="disabled">
                {{ post_sale }}
        </button>
        <button 
        type="submit" 
        class="submit clear-cart"  
        @click="clearCart" 
        :disabled="disabled">Clear cart</button>
    </div>
    </div>
</div>
<div class="actionContent" id="generateReports">
    <h3>Generate your sales report for the day</h3>
    <p>You will only be able to generate your own report.</p>
    <button type="submit" class="submit get-report" :class="action" @click="getReport()">
                {{ get_report }}
    </button>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import Search from  "@/components/Search.vue"
import { 
    openAction, 
    loadToast, 
    loadSpinner, 
    unloadSpinner, 
    formatNumber,
    dailySalesReport } from "../utils"

export default{
    name: "SalesDash",
    emits:['actionFeedback'],
    components: {
        Search,
    },
    data(){
        return{
            action:null,
            items:[],
            search_result:[],
            items_on_cart:[],
            item_id:null,
            item_name:null,
            item_units:null,
            item_selling_price:null,
            units_to_sell:null,
            post_sale:"Post sale",
            disabled:true,
            get_report:"Get report",
        }
    },
    computed:{
        cartTotal(){
            let cart_total = 0;
            this.items_on_cart.forEach((item) =>{
                cart_total +=item.total
            })
            return this.formatNumber(cart_total);
        },
        ...mapGetters({ token:"AuthToken" }),
        screenName(){
        if(this.token){
            const tokenParts = this.token.split('.')
            const tokenBody = JSON.parse(atob(tokenParts[1]))
            return tokenBody.screen_name
        }
    }
    },
    methods:{
        openAction,
        loadToast,
        loadSpinner,
        unloadSpinner,
        formatNumber,
        dailySalesReport,
        handleSearch(searchItem){
            const filter_result = this.items.filter((arr)=>{
            return arr.item.toLowerCase().includes(`${searchItem}`.toLowerCase())
        });
        this.search_result = filter_result
        },
        item_to_sell(item){
            this.item_id = item.item_sys_id;
            this.item_name = item.item;
            this.item_units = item.units;
            this.item_selling_price = item.selling_price;
        },
        add_to_cart(){
            const available_units = document.getElementById("available_units").value;
            const units_to_sell = document.getElementById("units_to_sell").value;

            if(parseFloat(available_units) >= parseFloat(units_to_sell)){
                const item_to_cart = {
                "item_sys_id":this.item_id,
                "item":this.item_name,
                "selling_price":this.item_selling_price,
                "units":this.units_to_sell,
                "total":(this.item_selling_price * this.units_to_sell)
            };
            this.items_on_cart.push(item_to_cart)
            this.disabled = false;
            this.item_id = "";
            this.item_name = "";
            this.item_units = "";
            this.item_selling_price = "";
            this.units_to_sell = "";
            }
            else
            {
               const error_para = document.getElementById('error_para');
               error_para.style.display = "block";

                setTimeout(()=>{
                error_para.style.display = "none";
                }, 5000)
            }

            // this cart is not persistent if the user was to close
            // the window then it would get lost
            // also if an item is on car instead of adding
            // it afresh just add the new instance to the
            // existing one.
        },
        clearCart(){
            this.items_on_cart.length = 0;
        },
        async postSale(){
            this.action="submitting";
            this.post_sale=" ",
            this.loadSpinner();
            try{
                const url = `${this.$api}sales/record`;
                const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken
                },
                body: JSON.stringify(this.items_on_cart)
                })
                const response = await res.json()
                if (response.status === 201){
                    this.unloadSpinner();
                    this.message = response.data;
                    this.type = "success";
                    this.$emit('actionFeedback', this.message,this.type);
                    this.search_result.length = 0;
                    this.items_on_cart.length = 0;
                    await this.$store.dispatch('getItems');
                    this.items = this.$store.getters.Items;
                }
                else{
                    this.unloadSpinner();
                    this.message = response.error;
                    this.type ="error";
                    this.$emit('actionFeedback', this.message,this.type);
                }
            }
            catch(err){
               let error = "The server is offline or unreachable."
                return err
            }
            this.action = "";
            this.post_sale = "Post sale";
        },
        async getTodaysSales(){
            this.action="submitting";
            this.get_report=" ",
            this.loadSpinner();
            try{
                   const url = `${this.$api}sales`
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
                      this.message = "Report data fetched successfully, please wait for report to render."
                      this.type = "success"
                      this.$emit('actionFeedback', this.message,this.type)
                      return response.data
                    }
                    else{
                        this.unloadSpinner();
                      this.message = response.error
                      this.type ="error"
                      this.$emit('actionFeedback', this.message,this.type)
                    }
                }
                catch(err){
                    let error = "The server is offline or unreachable."
                    return error
                }
        },
        async getReport(){
            let body_data = await this.getTodaysSales();
            this.action="";
            this.get_report="Get report";
            let columns =  [
              { header:'ITEM', dataKey: 'item' },
              { header:'UNITS SOLD', dataKey: 'units_sold'},
              { header:'UNIT PRICE', dataKey: 'unit_price'},
              { header:'TOTAL', dataKey: 'total' },
              ]
            this.dailySalesReport(body_data, columns, this.screenName);
        }
        
    },
    // lifecyclehooks
    async created(){
        await this.$store.dispatch('getItems')
        this.items = this.$store.getters.Items
    }, 
}

</script>
<style>
.float-right{
    margin-top:20px;
}
.search-item-display{
    width:100%;
    margin:20px auto;
    display: flex;
    flex-wrap: wrap;
}
.cart{
    width:100%;
    margin:10px auto;
}
.item-on-sale{
    flex:50%;
}
.search-item-result{
    flex:50%;
}
.search-result-list, .cart-heading{
  overflow: hidden;
  background-color:#3493DF;
}
.cart-heading li{
    width:25%;
}
.total{
    overflow: hidden;
    background-color:#ffffff;
    font-weight: bold;
    font-size:x-large;
    color:#008cff;
}
.color{
    /* this is a hack*/
    color:#ffffff;
}
.total li{
    width:25%;
}
.search-result-list li{
  width:50%;
}
.possible-item{
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
}
.item, .cart-items{
    overflow: hidden;
    font-weight: bold;
    border-bottom:1px solid #000000;
}
.item li{
  width: 50%;
}
.cart-items li{
    width:25%;
}
.item:hover, .cart-items:hover{
    background-color:#3c9b3c;
    color:#ffffff;
}
.item-on-sale .item-name{
    width: 65%;
}
.add-to-cart-form{
    padding:0%;
    padding-left:5%;
}
.add-to-cart-form .submit{
    width:50%;
    margin-top:20px;
}
.add-to-cart-form input{
    width:50%;
    display:block;
    padding:5px;
    color:#000000;
}
.cart-holder{
    max-height:400px;
    overflow-x: hidden;
    overflow-y: auto;
}
.post-sale{
    width:30%;
    margin-top:10px;
}
.clear-cart{
    width:30%;
    background-color: #24292F;
    float:right;
}
.units-error{
  color:#24292F;
  display:none;
  padding:2px;
  border-radius:0.5em;
  background-color: #f0a19c;
  border: 2px solid rgb(231, 24, 9);
  text-align: center;
  width:50%;
  font-size:12px;
}
.get-report{
    width: 10%;
}
</style>