<template>
  <router-link to="/">
    <img class="button-back" src="../assets/img/button2.png" alt="Imagem Clicável"/>
  </router-link>
  <div class="game-div">
    <div class="game-container">
      <table class="game-board">
        <tbody>
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
        </tbody>
      </table>
      <p id="status"></p>
        <button class="buttons game-reset" @click="resetGame()">Reiniciar</button>
    </div>
  </div>
</template>

<script setup>
  import axiosInstance from '../plugins/axios';
  import { defineProps } from 'vue';

  // Recebe a prop `id` da rota
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });

  const resetGame = async () => {
    try {
    const response = await axiosInstance.patch(`http://localhost:3000/games/${props.id}/reset`, {});
      console.log('Dados apagados com sucesso:', response.data);
      const cell = document.getElementsByClassName('cell');
      cell[0].textContent = '';
      cell[1].textContent = '';
      cell[2].textContent = '';
      cell[3].textContent = '';
      cell[4].textContent = '';
      cell[5].textContent = '';
      cell[6].textContent = '';
      cell[7].textContent = '';
    } catch (error) {
      console.error('Erro ao apagar dados', error);
    }
  }

  function makeMove(index) {
    if (sendData(index)) {
      const cell = document.getElementsByClassName('cell')[index];
      console.log(`Você clicou na célula ${index}`);
      cell.textContent = 'O';
      setCellColor(cell);
    }
  }

  const sendData = async (index) => {
  try {
    const response = await axiosInstance.patch(`http://localhost:3000/games/${props.id}/move`, {
      player: "X",
      position: index
    });
    console.log('Dados enviados com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao enviar dados', error);
  }
};

  function setCellColor(cell) {
    if (cell.innerHTML == 'X') {
      cell.style.color = '#440e6b';
    } else {
      cell.style.color = '#38b71b';
    }
  }

</script>


<style scoped>
.game-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
}

.button-back {
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  margin-left: 18%;
}

.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 825px;
  background-color: #ffffffcc;
  border-radius: 55px;
  gap: 20px;
 
}

.game-board {
  border-collapse: collapse;
  width: 550px;
  height: 550px;
  background-color: ffffffcc;
}

.game-board td {
  border: 8px solid #38b71b;
  text-align: center;
  cursor: pointer;
}

.cell {
  width: 100px;
  height: 100px;
  font-size: 80px;
  font-style: bold;
  color: #440e6b;
}

.cell:hover {
  background-color: #ddd;
}

.buttons {
  font-size: 25px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  width: 180px;
  height: 55px;
  border-radius: 20px;
}

.game-reset {
  background-color: #440e6b;
}

</style>
