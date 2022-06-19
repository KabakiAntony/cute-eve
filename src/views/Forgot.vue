<template>
<main>
  <Spinner />
     <Transition name="toast">
      <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <h4 class="center-text view-port-margin">Forgot your password ?</h4>
    <p class="center-text view-port-margin">We got you, just enter your email below and we will send you a link to update your password shortly.</p>
    <div class="holder">
      <img alt="forgot password" class="side-img" src="../assets/cute_eve_forgot.svg">
      <ForgotForm  v-bind="forgotFormProps" @on_submit="handleSubmit" :action="action" />
    </div>
</main>
</template>

<script>
import ForgotForm from "@/components/ForgotForm.vue"
import ShowAlert from "@/components/ShowAlert.vue"
import Spinner from '@/components/Spinner.vue'
import { loadToast, loadSpinner, unloadSpinner } from "../utils"

export default {
    name:'Forgot',
    components : { ForgotForm, ShowAlert, Spinner },
    data(){
      return{
        type: null,
        message:null,
        show:false,
        action:null,
        forgotFormProps:{
          submit_text:"Send reset email"
        }
      }
    },
    methods:{
      loadSpinner,
      unloadSpinner,
      loadToast,
     async handleSubmit(theForm){
            this.action="submitting"
            this.forgotFormProps.submit_text =" "
            this.loadSpinner()
            try{
              const url = `${this.$api}users/forgot`
              const res = await fetch(url,{
                  method:'POST',
                  headers:{
                      'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(theForm)
                      })
              const response = await res.json()
              if(response.status === 202){
                  this.unloadSpinner();
                  this.loadToast(response.data.message, "success");
                  theForm.email="";
                  setTimeout(()=>{
                  this.$router.push({name: 'Index'})
                  },3000)
              } else {
                this.unloadSpinner();
                this.loadToast(response.error, "error");
                }
              this.action=""
              this.forgotFormProps.submit_text ="Send reset email"
            }
            catch(err)
            {
               this.loadToast(err, "error");
            }
        },
    }
  }
</script>