<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <ul>
      <li class="logo">Cute Eve</li>
      <div class="right-nav">
        <!-- <li v-if="isLoggedIn">
          <RouterLink>Hello</RouterLink>
        <a class="Signout">Logout</a>
        </li>
        <li v-else>
          <RouterLink>Home</RouterLink>
          <RouterLink>Home</RouterLink>
          <RouterLink>Home</RouterLink>
        </li> -->
      </div>
    </ul>
  </nav>
  <RouterView />
  <footer>
    <p>&copy; Cute Eve Limited  2022&nbsp;&nbsp;<a href="https://twitter.com/kabakiantony">Developed by</a></p>
  </footer>
</template>

<style>
</style>
