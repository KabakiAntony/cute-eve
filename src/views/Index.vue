<template>
    <!-- <Spinner /> -->
     <!-- <Transition name="toast">
       <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition> -->
    <div class="holder">
        <h1 class="index-h1">Welcome, login to use the system.</h1>
        <img
            alt="landing page image"
            class="side-img"
            src="../assets/cute_eve_login.svg"
        />
    <CommonForm  
      v-bind="commonFormProps" 
      @on_submit="handleSubmit" 
      :action="action"
      :disabled="disabled" />
    </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue"
// import ShowAlert from "@/components/ShowAlert.vue"
// import Spinner from '@/components/Spinner.vue'
// import { unloadToast, loadToast, loadSpinner, unloadSpinner } from "../utils"

export default{
    name: "Index",
    components:{
        CommonForm
    },
    data(){
      return {
        commonFormProps:{
        header_text:"Login",
        submit_text:"Login",
        bottom_text:"Forgot Password ?",
        bottom_link_text:"Send link",
        route_name:"Forgot"
      },
      type:null,
      message:null,
      show:false,
      action:null,
      disabled:false,
      }

  },
}
</script>

<style>
</style>