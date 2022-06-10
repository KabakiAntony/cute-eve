<template>
 <div class="page">
   <Spinner />
    <Transition name="toast">
      <ShowAlert  v-if='show' :class='type' :message='message'/>
    </Transition>
    <h1>Set a new password to regain access to your account.</h1>
    <div class="holder">
      <img alt="forgot password" class="side-img" src="../assets/cute_eve_update_password.svg">
      <div id="form-container">
        <h2 class="form-header">Update your password</h2>
        <form @submit.prevent="handleSubmit">
            <p class="password-error" id="pass-error">Passwords do not match.</p>
            <label>Password</label>
            <input type="password" v-model="password" id="password" required>
            <label>Confirm Password</label>
            <input type="password" v-model="confirm_password" id="confirm-password" required>
            <div>
                <button type="submit" class="submit" :class="action">
                {{ submit_text }}
                </button>
            </div>
        </form>
    </div>
    </div>
 </div>
</template>

<script>
import ShowAlert  from "@/components/ShowAlert.vue"
import Spinner from "@/components/Spinner.vue"
import { loadToast, loadSpinner, unloadSpinner, comparePasswords } from "../utils"

export default {
    name:'Update',
    components : { ShowAlert, Spinner },
    props:['query'],
    data(){
    return {
      submit_text:"Set new password",
      action:null,
      type:null,
      message:null,
      show:false,
      password:null,
      confirm_password:null,
    }
  },
   methods:{
        loadSpinner,
        unloadSpinner,
        loadToast,
        comparePasswords,
        async handleSubmit(){
          const user_data = {
              "password":this.password,
              "origin":"forgot"
          }
          if(this.comparePasswords()){
            this.action="submitting";
            this.submit_text=" ";
            this.loadSpinner();
            try{
                const url = `${this.$api}users/update`;
                const res = await fetch(url,{
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.query
                },
                body: JSON.stringify(user_data)
                })
                const response = await res.json()
                if (response.status === 200){
                this.unloadSpinner();
                this.message = response.data;
                this.type = "success";
                this.loadToast(this.message, "success");
                setTimeout(()=>{
                this.$router.push({name: 'Dashboard'})
                },3000)
                }
                else{
                this.message = response.error;
                this.type ="error";
                this.unloadSpinner();
                this.loadToast(this.message, this.type);
                }
            }
            catch(err){
               let error = "The server is offline or unreachable."
                return err
            }
            this.action = "";
            this.submit_text="Save";

          }
          else{
            // later might want to change this implementation I find it dirty
            const error =  document.getElementById('pass-error');
            const pass_one = document.getElementById('password');
            const pass_two = document.getElementById('confirm-password');

            error.style.display = "block";

            setTimeout(()=>{
              error.style.display = "none";
              pass_one.style.border = "";
              pass_two.style.border = ""
            }, 5000)
          }
        },
    }
}
</script>

<style>
.password-error{
  color:#b8251b;
  display:none;
  padding:2px;
  border-radius:0.5em;
  background-color: #f0a19c;
  border: 2px solid rgb(231, 24, 9);
  text-align: center;
}
</style>