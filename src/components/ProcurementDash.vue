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
  <form @submit.prevent="uploadEmployeeFile" class="dashboard">
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
            <li><label class="li-label">Item</label></li>
            <li><label class="li-label">Units Available</label></li>
            <li><label class="li-label">Buying Price</label></li>
            <li><label class="li-label">Selling Price</label></li>
            <li><label class="li-label">Added On</label></li>
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
import { openAction }  from '../utils'
import Search from  "@/components/Search.vue"
import ChangesModal  from "@/components/ChangesModal.vue"

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
            changesModalProps:{
                update_item_submit:"Save changes"
            }
        }
    },
    methods:{
        openAction,
        closeModal(){
            this.showChangesModal = !this.showChangesModal;
        },
    }
}
</script>
<style></style>