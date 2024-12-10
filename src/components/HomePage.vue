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
  
  <div class="home-div">
    <img src="../assets/img/home-background.png" alt="" class="home-background">
    <img class="home-game-img" src="../assets/img/game.png"/>
    <div class="home-buttons">
      <button @click="startGame" class="buttons home-play">Iniciar Jogo</button>
      <button @click="showTable" class="buttons home-table">Ver Historico</button>
    </div>
  </div>
</template>

<style scoped>
  .home-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .home-div {
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .home-game-img {
    margin-top: 340px;
    margin-bottom: 40px;
  }

  .home-buttons {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .buttons {
    font-size: 25px;
    font-weight: 600;
    color: white;
    width: 260px;
    height: 60px;
    border-radius: 20px;
  }

  .home-play {
    background-color: #8e68e6;
  }

  .home-play:hover {
    background-color: #6b3f9e;
  }

  .home-table {
    background-color: #007d2a;
  }

  .home-table:hover {
    background-color: #005b1f;
  }

</style>
