<template>
<div class="page">
  <Spinner />
     <Transition name="toast">
      <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <h1>Forgot your password ?</h1>
    <p>We got you, just enter your email below and we will send you a link to update your password shortly.</p>
    <div class="holder">
      <img alt="forgot password" class="side-img" src="../assets/cute_eve_forgot.svg">
      <ForgotForm  v-bind="forgotFormProps" @on_submit="handleSubmit" :action="action" />
    </div>
</div>
</template>

<script>
import ForgotForm from "@/components/ForgotForm.vue"
import ShowAlert from "@/components/ShowAlert.vue"
import Spinner from '@/components/Spinner.vue'
// import { unloadToast, loadToast, loadSpinner, unloadSpinner } from "../utils"

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
          submit_text:"Send email"
        }
      }
    },
  }
</script>