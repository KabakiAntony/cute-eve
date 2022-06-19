<template>
    <div id="form-container">
        <h4 class="form-header">Enter email</h4>
        <form @submit.prevent="$emit('on_submit', form)">
            <label>Email</label>
            <input type="email" v-model="form.email" required>
            <div>
                <button type="submit" class="submit" :class="action">
                {{ submit_text }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:'ForgotForm',
    props:{
        action:String,
        submit_text:String,
    },
    data(){
        return{
            form:{
                email:'',
            },
        }
    }
}
</script>