<template>
    <Spinner />
    <Transition name="toast">
      <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <h1>Set a new password to regain access to your account.</h1>
    <div class="holder">
      <img alt="forgot password" class="side-img" src="../assets/cute_eve_update_password.svg">
      <CommonForm  
      v-bind="commonFormProps" 
      @on_submit="handleSubmit" 
      :action="action"
      :disabled="disabled" />
      </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue"
import ShowAlert  from "@/components/ShowAlert.vue"
import Spinner from "@/components/Spinner.vue"
// import { unloadToast, loadToast, loadSpinner, unloadSpinner } from "../utils"

export default {
    name:'Update',
    components : { CommonForm, ShowAlert, Spinner },
    // props:['query'],
    data(){
    return {
      commonFormProps:{
        header_text:"Set new password",
        submit_text:"Save Password",
      },
      action:null,
      type:null,
      message:null,
      show:false,
      disabled:true
    }
  },
 
//   created(){
//     {
      
//       if (this.query){
//         const tokenParts = this.query.split('.')
//         const tokenBody = JSON.parse(atob(tokenParts[1]))
//         this.email = tokenBody.email
//       }
      
      
//    }
//   }
}
</script>

<style scoped></style>