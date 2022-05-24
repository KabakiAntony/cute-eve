<script>
import { mapGetters } from "vuex";

export default {
  methods:{
    async logOut(){
      try{
          this.$store.commit('SET_IS_LOGGED_IN',false)
          this.$store.commit('SET_AUTH_TOKEN',null)
          this.$store.commit('SET_SCREEN_NAME',null)
          this.$router.push({name:"SignIn"})
      }
      catch(err){
        console.log(err)
      }
    }
  },
  computed:{
    ...mapGetters({
      isLoggedIn:"IsLoggedIn", 
      screen_name:"ScreenName",
      }),
  },  
}
</script>

<template>
  <nav>
    <ul>
      <li class="logo">Cute Eve</li>
      <div class="right-nav">
        <li v-if="isLoggedIn">
          <router-link :to="{ name: 'Dashboard'}">Hello {{ screen_name }}</router-link>
          <a class="Signout" @click="logOut">Logout</a>
        </li>
        <li v-else>
          <router-link :to="{ name: 'Index' }">Home</router-link>
        </li>
      </div>
    </ul>
  </nav>
  <router-view/>
  <footer>
    <p>&copy; Cute Eve Limited  2022&nbsp;&nbsp;<a href="https://twitter.com/kabakiantony">Developed by</a></p>
  </footer>
</template>

<style>
</style>
