<template>
    <Spinner/>
    <DashNotifications v-if='show' :class='type' :message='message'/>
    <div v-if="userRole === 'admin'">
        <AdminDash @actionFeedback="actionNotification"/>
    </div>
    <div v-if="userRole === 'procurement'">
        <ProcurementDash @actionFeedback="actionNotification"/>
    </div>
    <div v-if="userRole === 'sales'">
      <SalesDash @actionFeedback="actionNotification"/>
    </div>
    <h4 class="text-center bigger-font" id="profileInstruction">Click on any option to carry out the task.</h4> 
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
.dashboard .submit{
    width:20%;
    margin-top:20px;
    margin-bottom: 20px;
    margin-left:15%;
}
.dashboard input{
    width:50%;
    display:block;
}
.dashboard .list-left{
  margin-left: 0%;
}
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
/* item list headings */
.items-list{
  margin-top:0.3em;
  overflow: hidden;
  background-color:#3493DF;
  text-transform: uppercase;
}
.items-list li{
  width:25%;
}
.li-label{
  color:#ffffff;
  text-transform: capitalize;
}
</style>