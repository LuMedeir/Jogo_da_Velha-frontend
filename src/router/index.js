// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';  // Importando HomePage
import GameBoard from '../components/Game.vue';  // Importando GameBoard
import GameHistory from '../components/GameHistory.vue';  // Importando GameHistory

const routes = [
  {
    path: '/',
    name: 'HomePage',  // Rota para HomePage
    component: HomePage
  },
  {
    path: '/game',
    name: 'GameBoard',  // Rota para GameBoard
    component: GameBoard
  },
  {
    path: '/history',
    name: 'GameHistory',  // Rota para Historico
    component: GameHistory
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;