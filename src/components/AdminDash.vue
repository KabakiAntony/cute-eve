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
import { openAction }  from '../utils'

export default{
    name: "AdminDash",
    emits:['actionFeedback'],
    data(){
        return{
            create_user_submit: "Create",
            modify_user_submit: "Modify",
            suspend_user_submit: "Suspend",
        }
    },
    methods:{
        openAction,
    }
}
</script>
<style></style>