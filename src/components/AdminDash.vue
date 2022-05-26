<template>
<div class="actions">
    <button class="action-links" @click="openAction($event,'createUser')">Create User</button>
    <button class="action-links" @click="openAction($event, 'suspendUser')">Suspend User</button>
    <button class="action-links" @click="openAction($event, 'modifyRole')">Modify Role</button>
</div>
<div class="actionContent" id="createUser">
    <h3>Create system user here</h3>
    <p>Easy just fill the simple form below, on success a user will recieve an email with further instructions.</p>
    <hr>
    <form  @submit.prevent="createUser" class="dashboard">
        <div class="select-block">
        <label >Select role </label>
        <select  v-model="role" required>
        <option value="admin">Admin</option>
        <option value="procurement">Procurement</option>
        <option value="Sales">Sales</option>
        </select>
        </div>
        <label >Email </label>
        <input  type="email" v-model="email" required>
        <button :class="action" class="submit list-left">{{ create_user_submit }}</button>
        </form>
</div>
<div class="actionContent" id="suspendUser">
    <h3>Suspend system user here</h3>
    <p>Just enter the email of the user you want to suspend.</p>
    <hr>
    <form  @submit.prevent="suspendUser" class="dashboard">
        <div class="select-block">
        </div>
        <label >Email </label>
        <input  type="email" v-model="email" required>
        <button :class="action" class="submit list-left">{{ suspend_user_submit }}</button>
        </form>
</div>
<div class="actionContent" id="modifyRole">
    <h3>Change the role of a user here.</h3>
    <p>Select the new role you want to give a user, enter their email and click update role.</p>
    <hr>
    <form  @submit.prevent="modifyRole" class="dashboard">
        <div class="select-block">
        <label >Select role </label>
        <select  v-model="role" required>
        <option value="admin">Admin</option>
        <option value="procurement">Procurement</option>
        <option value="Sales">Sales</option>
        </select>
        </div>
        <label >Email </label>
        <input  type="email" v-model="email" required>
        <button :class="action" class="submit list-left">{{ modify_user_submit }}</button>
        </form>
</div>
</template>

<script>
import { openAction, loadToast, loadSpinner, unloadSpinner } from "../utils"

export default{
    name: "AdminDash",
    emits:['actionFeedback'],
    data(){
        return{
            create_user_submit: "Create",
            modify_user_submit: "Modify",
            suspend_user_submit: "Suspend",
            role:null,
            email:null,
            action:null,
        }
    },
    methods:{
        openAction,
        loadToast,
        loadSpinner,
        unloadSpinner, 
        async createUser(){
            this.action="submitting";
            this.create_user_submit=" ",
            this.loadSpinner();
             const user_data={
                email:this.email,
                role:this.role
            }
            try{
                const url = `${this.$api}users/create`;
                const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth_token':this.$store.getters.AuthToken
                },
                body: JSON.stringify(user_data)
                })
                const data = await res.json()
                if (data.status === 201){
                this.message = data.data.message
                this.type = "success"
                this.$emit('actionFeedback', this.message,this.type)
                this.unloadSpinner();
                }
                else{
                this.message = data.error
                this.type ="error"
                this.unloadSpinner();
                this.$emit('actionFeedback', this.message,this.type)
                }
            }
            catch(err){
               let error = "The server is offline or unreachable."
                return err
            }
            this.action = "";
            this.create_user_submit ="Create";
        },
        async suspendUser(){
            // this action will be aded later
            this.action="submitting";
        },
        async modifyRole(){
            // this action will be added later
            this.action="submitting";
        },
    }
}
</script>
<style></style>