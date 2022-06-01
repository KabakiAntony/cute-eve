<script>
import { mapGetters } from "vuex";

export default {
  methods:{
    async logOut(){
      try{
          this.$store.commit('SET_IS_LOGGED_IN',false)
          this.$store.commit('SET_AUTH_TOKEN',null)
          this.$store.commit('RESET_ITEMS')
          this.$router.push({name:"Index"})
      }
      catch(err){
        console.log(err)
      }
    }
  },
  computed:{
    ...mapGetters({ token:"AuthToken", isLoggedIn:"IsLoggedIn" }),
    screenName(){
      if(this.token){
        const tokenParts = this.token.split('.')
        const tokenBody = JSON.parse(atob(tokenParts[1]))
        return tokenBody.screen_name
      }
    }
  },  
}
</script>

<template>
  <nav>
    <ul>
      <li class="logo">Cute Eve</li>
      <div class="right-nav">
        <li v-if="isLoggedIn">
          <router-link :to="{ name: 'Dashboard'}">Hi {{ screenName }}</router-link>
          <a class="logout" @click="logOut">Logout</a>
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
