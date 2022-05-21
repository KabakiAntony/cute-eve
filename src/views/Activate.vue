<template>
 <Spinner />
    <Transition name="toast">
      <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <h1>Create a password to activate and use your account.</h1>
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
import Spinner from "@/components/Spinner.vue"
import CommonForm from "@/components/CommonForm.vue"
import ShowAlert from "@/components/ShowAlert.vue"
// import { loadSpinner, unloadSpinner } from "../utils"

export default {
    name: 'Verify',
    components:{ Spinner, CommonForm, ShowAlert },
    // props:['query'],
     data(){
    return {
      commonFormProps:{
        header_text:"Create password",
        submit_text:"Save Password",
      },
      action:null,
      type:null,
      message:null,
      show:false,
      disabled:true
    }
  },
    // methods:{
    //     loadSpinner,
    //     unloadSpinner,
    //     async verifyAccount(){
    //         const url = `${this.$api}users/verify`
    //         const res = await fetch(url,{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type': 'application/json',
    //                 'auth_token':this.query
    //                 },
    //                 })
    //         const data = await res.json()
    //         if(data.status === 200){
    //             this.waiting = false
    //             this.verified = true
    //             setTimeout(()=>{
    //             this.$router.push({name: 'SignIn'})
    //             },3000)
    //         } else {
    //             this.waiting = false
    //             this.failure_message = data.error
    //             this.failed = true
    //         }
    //     },
    // },
}
</script>

<style scoped>

</style>