<template>
   <div :class="type" id="showAlert">{{ message }}</div>
</template>

<script> 
export default {
  name:'ShowAlert',
  props:{
      type: String,
      message:String,
  }
}
</script>