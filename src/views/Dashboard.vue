<template>
    <Spinner/>
    <DashNotifications v-if='show' :class='type' :message='message'/>
    <div v-if="role === 'admin'">
        <AdminDash @actionFeedback="actionNotification"/>
    </div>
    <div v-if="role === 'procurement'">
        <ProcurementDash @actionFeedback="actionNotification"/>
    </div>
    <div v-if="role === 'sales'">
        <SalesDash @actionFeedback="actionNotification"/>
    </div>
</template>

<script>
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
      role:"admin",
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
//   computed:{
//     ...mapGetters({role:"returnUserRole"})
//   }    
}

</script>
<style>
.dashboard .submit{
    width:20%;
    margin-top:20px;
    margin-bottom: 20px;
    margin-left:15%;
    font-size: 14px;
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
</style>