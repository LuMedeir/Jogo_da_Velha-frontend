<template>
  <img class="absolute top-0 left-0 -z-10 w-screen h-screen" src="../assets/img/background.png">
  <div class="absolute w-full h-full flex justify-center items-center">
    <img class="absolute cursor-pointer w-12 h-12 top-44 left-96" src="../assets/img/button2.png" alt="Imagem Clicável" @click="comeback()"/>
    <div class="flex flex-col justify-center items-center w-5/12 h-4/5 gap-3 rounded-2xl bg-white/90">
      <table class="border-collapse w-3/4 h-3/4 white-opacity">
        <tbody>
          <tr v-for="row in 3" :key="row">
            <td v-for="col in 3" :key="col" @click="setPlay((row - 1) * 3 + (col - 1))" 
              class="cell w-24 h-24 text-7xl font-bold text-purple-950 hover:bg-gray-hover border-8 border-green text-center cursor-pointer">
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-2xl font-bold text-purple-950">
        <span v-if="winner === 'draw' "> Empate </span>
        <span v-else-if="winner !== ''">O jogador {{ winner }} venceu!</span>
        <span v-else>Vez do jogador {{ player === 0 ? 'X' : 'O' }}</span>
      </p>
      <div class="flex flex-row gap-8">
        <button class="bg-purple-950 text-white font-semibold text-2xl rounded-2xl w-44 h-14 hover:bg-purple-500" @click="resetGame()">Reiniciar</button>
        <button class="bg-green text-white font-semibold text-2xl rounded-2xl w-44 h-14 hover:bg-green-800" @click="newGame()">Novo Jogo</button>
      </div>
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

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });

  const newGame = async () => {

    try {
      const response = await axiosInstance.post('http://localhost:3000/games', {});
      const gameId = response.data.id;
      if (winner.value === "") {
        await axiosInstance.delete(`http://localhost:3000/games/${props.id}`, {});
      }
      router.push({ name: 'GameBoard', params: { id: gameId } });
    } catch (error) {
      console.error('Erro ao criar novo jogo:', error);
    }
  }

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
