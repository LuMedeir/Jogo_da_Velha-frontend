// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router configurado

createApp(App)
  .use(router) // Registra o router no Vue
  .mount('#app');