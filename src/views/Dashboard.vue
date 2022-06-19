<template>
  <main>
    <Spinner/>
    <DashNotifications v-if='show' :class='type' :message='message'/>
    <div v-if="userRole === 'admin'">
        <AdminDash @actionFeedback="actionNotification"/>
    </div>
    <div v-if="userRole === 'procurement'">
        <ProcurementDash @actionFeedback="actionNotification"/>
    </div>
    <div v-if="userRole === 'sales'">
      <SalesDash />
    </div>
    <h4 class="center-text" id="profileInstruction">Click on any option to carry out the task.</h4> 
  </main>
</template>

<script>
import { mapGetters }  from 'vuex'
import Spinner from "@/components/Spinner.vue"
import AdminDash from "@/components/AdminDash.vue"
import SalesDash from "@/components/SalesDash.vue"
import ProcurementDash from "@/components/ProcurementDash.vue"
import DashNotifications from "@/components/DashNotifications.vue"

export default{
    name:"Dashboard",
    components:{
        Spinner,
        AdminDash,
        SalesDash,
        ProcurementDash,
        DashNotifications,
    },
    data(){
    return {
      type:"",
      message:"",
      show:false,
    }
  },
  methods:{
    actionNotification(...args){
      const [message,type] = args
      this.show = true,
      this.type = type,
      this.message = message
      setTimeout(()=>{
        this.type = "none"
        this.message = ""
      }, 5000)
    }
  },
  computed:{
    ...mapGetters({ token:"AuthToken" }),
    userRole(){
        if(this.token){
          const tokenParts = this.token.split('.');
          const tokenBody = JSON.parse(atob(tokenParts[1]));
          return tokenBody.role;
        }
    }
  }
}

</script>
<style>
label {
  padding-right:2%;
  color:#24292F;
  font-weight: bold;
}
.update-form{
  padding-bottom: 0.5%;
  width:80%;
}
.update-form .submit{
  width:50%;
}
</style>