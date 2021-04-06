import { createApp } from "vue";
import App from "./App.vue";

// 全局CSS
import "@/style/main.css";

// 启动配置文件
import bootstrap from "@/config/bootstrap";

const app = createApp(App);

bootstrap.start(app);

app.mount("#app");
