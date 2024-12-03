<script setup>
  // Importação do useRouter para navegação
  import { useRouter } from 'vue-router';

  // Definição da função startGame
  const router = useRouter();
  const startGame = () => {
    router.push({ name: 'GameBoard' });
  };

  const showTable = () => {
    router.push({ name: 'GameHistory' });
  };
</script>

<template>
  <div class="home-div">
    <img class="home-game-img" src="../assets/img/game1.png"/>
    <div class="home-buttons">
      <button @click="startGame" class="buttons home-play">Iniciar Jogo</button>
      <button @click="showTable" class="buttons home-table">Ver Tabela</button>
    </div>
  </div>
</template>

<style scoped>

  @font-face {
    font-family: 'MinhaFonte';
    src: url('../assets/fonts/minha-fonte2.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .home-div {
    background-image: url('../assets/img/home-background.png');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }

  .home-game-img {
    width: 700px;
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

  .home-table {
    background-color: #007d2a;
  }

</style>
