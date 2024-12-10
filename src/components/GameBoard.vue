<template>
  <div class="game-div">
    <img class="button-back" src="../assets/img/button2.png" alt="Imagem Clicável" @click="comeback()"/>
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
  import { useRouter } from 'vue-router';

  const router = useRouter();

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

  async function comeback() {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/games/${props.id}`, {});
      if (response.data.winner === "") {
        await axiosInstance.delete(`http://localhost:3000/games/${props.id}`, {});
      }
    } catch (error) {
      console.error('Erro ao voltar para a página inicial:', error);
    }
    router.push({ name: 'HomePage' });
  }

  async function setPlay(index){
    await makeMove(index);
    await checkWinner();
  }

  async function makeMove(index) {
    const cell = document.getElementsByClassName('cell')[index];
    const isValid = await sendData(index);

    if (cell.textContent == "" && winner.value == "" && isValid) {
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
    return true;
  } catch (error) {
    console.error('Erro ao enviar dados', error);
    return false;
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #1a022b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-back {
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  margin-left: -70%;
  margin-top: -40%;
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
