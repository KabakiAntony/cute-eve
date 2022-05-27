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
    <p>You can make changes to stock that is change things like <span>Units, Prices, Name</span></p>
    <p>First step is to search for the item in the search bar, then select it on the table.</p>
    <Search/>
    <hr>
    <div class="items-list">
        <ul>
            <li><label class="li-label">Item</label></li>
            <li><label class="li-label">Units Available</label></li>
            <li><label class="li-label">Buying Price</label></li>
            <li><label class="li-label">Selling Price</label></li>
            <li><label class="li-label">Added On</label></li>
        </ul>
    </div>
    <div class="items-list">
        <ul>
            <li>Comely bleach</li>
            <li>40</li>
            <li>120</li>
            <li>180</li>
            <li>23/05/2022</li>
        </ul>
    </div>
    <div v-if="showChangesModal">
        <ChangesModal v-bind="changesModalProps" @close="closeModal"/>
    </div>
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
            new_stock_submit: "Upload",
            update_stock_submit: "Modify",
            generate_report_submit: "Suspend",
            update_item_submit: "Save changes",
            showChangesModal:true,
            action:null,
            changesModalProps:{
                update_item_submit:"Save changes"
            }
        }
    },
    methods:{
        openAction,
        loadToast,
        loadSpinner,
        unloadSpinner,
        closeModal(){
            this.showChangesModal = !this.showChangesModal;
        },
        async uploadStockFile(){
            this.action="submitting";
            // this.loadSpinner();
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
    }
}
</script>
<style></style>