<template>
  <div :class="type"  id="dashboard_notification">{{message}}</div>
</template>

<script>
export default {
    name:"DashNotifications",
    props:['type', 'message']
}
</script>

<style>
.error{
  background-color: #e97971;
  border: 2px solid rgb(231, 24, 9);
}
.success {
  background-color: #d4edda;
  border: 2px solid rgb(44, 148, 2);
}
.none{
    display:none;
}
#dashboard_notification{
  color:black;
  text-align: left;
  padding: 0.3rem;
  font-size:100%;
}
</style>