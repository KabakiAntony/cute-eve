<template>
<main>
  <Spinner />
     <Transition name="toast">
       <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <h4 class="center-text view-port-margin">Welcome, login to use the system.</h4>
    <div class="holder">
        <img
            alt="landing page image"
            class="side-img"
            src="../assets/cute_eve_login.svg"
        />
        <CommonForm  
      v-bind="commonFormProps" 
      @on_submit="handleSubmit" 
      :action="action"/>
    </div>
    
</main>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue"
import ShowAlert from "@/components/ShowAlert.vue"
import Spinner from '@/components/Spinner.vue'
import { loadToast, loadSpinner, unloadSpinner } from "../utils"

export default{
    name: "Index",
    components:{
        CommonForm,
        ShowAlert,
        Spinner,
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
      }

  },
  methods:{
    loadSpinner,
    unloadSpinner,  
    loadToast,
    async handleSubmit(theForm){
            this.action="submitting"
            this.commonFormProps.submit_text =" "
            this.loadSpinner()
              let response = await this.$store.dispatch('logIn',theForm)
              if(response.status === 200){
                this.unloadSpinner()
                this.loadToast(response.data.message, "success")
                setTimeout(()=>{
                this.$router.push({name: 'Dashboard'})
                },3000)
            } else {
              this.unloadSpinner()
              let error = response.error ? response.error : response;
              this.loadToast(error, "error")
              }
            this.action = ""
            this.commonFormProps.submit_text = "Login"
        },

  },
}
</script>