// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router configurado
import './assets/tailwind.css'; // Importa o arquivo de estilo do TailwindCSS

createApp(App)
  .use(router) // Registra o router no Vue
  .mount('#app');