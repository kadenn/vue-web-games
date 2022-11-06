import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import routes from "~pages";
import "./style.css";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const messages = Object.fromEntries(
  Object.entries(import.meta.glob("./locales/*.json", { eager: true })).map(
    ([key, value]) => [key.slice(10, -5), value.default]
  )
);

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: messages,
});

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount("#app");
