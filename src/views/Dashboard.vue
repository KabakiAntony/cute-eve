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
      show:false
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
<style></style>