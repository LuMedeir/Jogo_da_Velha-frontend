<script setup>
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const router = useRouter();
  const startGame = async () => {
    try {
    const response = await axios.post('http://localhost:3000/games', {});

    const gameId = response.data.id;

    router.push({ name: 'GameBoard', params: { id: gameId } });
    } catch (error) {
      console.error("Erro ao criar o jogo:", error);
    }
  };

  const showTable = () => {
    router.push({ name: 'GameHistory' });
  };
</script>

<template>
  
  <div class="bg-cover bg-center flex flex-col items-center w-screen h-screen overflow-x-hidden overflow-y-hidden">
    <img class="absolute top-0 left-0 -z-10 w-full h-full" src="../assets/img/home-background.png">
    <img class="mt-[340px] mb-[40px] pointer-events-none" src="../assets/img/game.png"/>
    <div class="flex flex-col gap-8">
      <button @click="startGame" class="text-2xl font-semibold text-white w-64 h-14 rounded-2xl bg-purple-400 hover:bg-purple-500">Iniciar Jogo</button>
      <button @click="showTable" class="text-2xl font-semibold text-white w-64 h-14 rounded-2xl bg-green-600 hover:bg-green-900">Ver Historico</button>
    </div>
  </div>
</template>

