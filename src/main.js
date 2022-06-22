import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/base.css";

const app = createApp(App);

app.use(store)
app.use(router);
app.mount("#app");

// app.config.globalProperties.$api = import.meta.env.VITE_API_URL
// store.$api = import.meta.env.VITE_API_URL
app.config.globalProperties.$api = import.meta.env.VITE_API_URL
store.$api = import.meta.env.VITE_API_URL


