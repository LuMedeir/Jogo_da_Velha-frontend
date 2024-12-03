<template>
  <div class="game-div">
    <div class="game-container">
      <table class="game-board">
        <tr>
          <td @click="makeMove(0)" class="cell"></td>
          <td @click="makeMove(1)" class="cell"></td>
          <td @click="makeMove(2)" class="cell"></td>
        </tr>
        <tr>
          <td @click="makeMove(3)" class="cell"></td>
          <td @click="makeMove(4)" class="cell"></td>
          <td @click="makeMove(5)" class="cell"></td>
        </tr>
        <tr>
          <td @click="makeMove(6)" class="cell"></td>
          <td @click="makeMove(7)" class="cell"></td>
          <td @click="makeMove(8)" class="cell"></td>
        </tr>
      </table>
      <p id="status"></p>
      <div class="home-buttons">
        <button class="buttons game-reset" @click="resetGame">Recomeçar</button>
        <button class="buttons home-page" @click="comeback">Voltar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const comeback = () => {
    router.push({ name: 'HomePage' });
  };

  const resetGame = () => {
    //
  };
  const makeMove = (index) => {
    console.log(`Célula ${index} clicada`);
  };

</script>

<style scoped>
.game-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  flex-direction:
}

.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 825px;
  background-color: white;
  border-radius: 20px;
  gap: 20px;
 
}

.game-board {
  border-collapse: collapse;
  width: 550px;
  height: 550px;
  background-color: white;
}

.game-board td {
  border: 6px solid #38b71b;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
}

.cell {
  width: 100px;
  height: 100px;
}

.cell:hover {
  background-color: #ddd;
}

.home-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.buttons {
  font-size: 25px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  width: 200px;
  height: 60px;
  border-radius: 20px;
}

.game-reset {
  background-color: #440e6b;
}

.home-page {
  background-color: #38b71b;
}
</style>
