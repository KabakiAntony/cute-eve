import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/base.css";

const app = createApp(App);

app.use(store)
app.use(router);
app.mount("#app");

// app.config.globalProperties.$api = "http://127.0.0.1:5000/"
// store.$api = "http://127.0.0.1:5000/"
app.config.globalProperties.$api = "https://cute-eve-pos.herokuapp.com/"
store.$api = "https://cute-eve-pos.herokuapp.com/"


