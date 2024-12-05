<template>
  <router-link to="/">
    <img class="button-back" src="../assets/img/button2.png" alt="Imagem Clicável"/>
  </router-link>
  <div class="game-div">
    <div class="game-container">
      <table class="game-board">
        <tbody>
          <tr>
            <td @click="setPlay(0)" class="cell"></td>
            <td @click="setPlay(1)" class="cell"></td>
            <td @click="setPlay(2)" class="cell"></td>
          </tr>
          <tr>
            <td @click="setPlay(3)" class="cell"></td>
            <td @click="setPlay(4)" class="cell"></td>
            <td @click="setPlay(5)" class="cell"></td>
          </tr>
          <tr>
            <td @click="setPlay(6)" class="cell"></td>
            <td @click="setPlay(7)" class="cell"></td>
            <td @click="setPlay(8)" class="cell"></td>
          </tr>
        </tbody>
      </table>
      <p id="status">
        <span v-if="winner === 'draw' "> Empate </span>
        <span v-else-if="winner !== ''">O jogador {{ winner }} venceu!</span>
        <span v-else>Vez do jogador {{ player === 0 ? 'X' : 'O' }}</span>
      </p>
      <button class="buttons game-reset" @click="resetGame()">Reiniciar</button>
    </div>
  </div>
</template>

<script setup>
  import axiosInstance from '../plugins/axios';
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  import { onMounted } from 'vue';

  onMounted(() => {
    resetGame();
    checkWinner();
  });

  let player = ref(0);
  let winner = ref("");

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
      console.log('Jogo reiniciado com sucesso:', response.data);

      const cells = document.getElementsByClassName('cell');
      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
      }
      winner.value = '';
      player.value = 0;
    } catch (error) {
      console.error('Erro ao reiniciar o jogo:', error);
    }
  }

  function setPlay(index){
    makeMove(index);
    setTimeout(checkWinner, 25);
  }

  function makeMove(index) {
    
    const cell = document.getElementsByClassName('cell')[index];
    if (cell.textContent == "" && !winner.value && sendData(index)) {
      console.log(`Você clicou na célula ${index}`);
      if (player.value == 0) {
        cell.textContent = 'X';
        player.value = 1;
      } else {
        cell.textContent = 'O';
        player.value = 0;
      }
      setCellColor(cell);
    }
  }

  const checkWinner = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/games/${props.id}`);
      winner.value = response.data.winner;
      
    } catch (error) {
      console.error('Erro ao verificar vencedor', error);
    }
  }

  const sendData = async (index) => {
  try {
    const response = await axiosInstance.patch(`http://localhost:3000/games/${props.id}/move`, {
      player: player.value == 0 ? 'X' : 'O',
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

#status {
  font-size: 30px;
  font-weight: 600;
  color: #440e6b;
}

</style>
