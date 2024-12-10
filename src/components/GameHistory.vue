<script setup>
  import { ref, onMounted } from 'vue';
  import axiosInstance from '../plugins/axios';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const games = ref([]); // Lista de jogos
  const gameState = ref(null); // Mostrar o estado do jogo

  async function comeback() {
    router.push({ name: 'HomePage' });
  }

  // Buscar o histórico de jogos ao montar o componente
  const fetchGameHistory = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/games');
      games.value = response.data.sort((a, b) => b.id - a.id); // Atualiza a lista de jogos do maior id para o menor
    } catch (error) {
      console.error('Erro ao buscar histórico de jogos:', error);
    }
  };

  // Apagar um jogo pelo ID
  const deleteGame = async (id) => {
    if (confirm('Tem certeza que deseja apagar este registro?')) {
      try {
        await axiosInstance.delete(`http://localhost:3000/games/${id}`);
        games.value = games.value.filter(game => game.id !== id); // Remove o jogo da lista
        alert('Jogo apagado com sucesso!');
      } catch (error) {
        console.error('Erro ao apagar jogo:', error);
      }
    }
  };

  // Mostrar o estado do jogo
  async function showGameState(id) {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/games/${id}`);
      gameState.value = response.data.game_state;
      console.log('Estado do jogo:', gameState.value);
    } catch (error) {
      console.error('Erro ao pegar estado do jogo:', error);
    }
  }

  // Fechar o estado do jogo
  function closeGameState() {
    gameState.value = null;
  }

  // Formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function rematch(id) {
    router.push({ 
      name: 'GameBoard', 
      params: { 
        id
       } 
    });
  }

  onMounted(() => {
    fetchGameHistory(); // Carregar o histórico ao montar o componente
  });
</script>

<template>
  <img src="../assets/img/background.png" alt="" class="background">
  <img class="button-back" src="../assets/img/button.png" alt="Imagem Clicável" @click="comeback()"/>
      <div class="history-container">
        <div class="table-wrapper">
        <table class="history-table ">
          <thead>
            <tr class="table-row">
              <th>ID</th>
              <th>Vencedor</th>
              <th>Data</th>
              <th>Revanche</th>
              <th>Estado do Jogo</th>
              <th>Deletar partida</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row" v-for="game in games" :key="game.id">
              <td>{{ game.id }}</td>
              <td class="table-winner details-info"> {{  game.winner !== "draw" ? game.winner : "Empate" }}</td>
              <td class="details-info">{{ formatDate(game.updated_at) }}</td>
              <td>
                <button class="revanche-button" @click="rematch(game.id)">Iniciar Revanche</button>
              </td>
              <td>
                <img class="game-state-button" src="../assets/img/showGame.png" alt="Imagem Clicável" @click="showGameState(game.id)"/>
              </td>
              <td>
                <img class="delete-button" src="../assets/img/delete.png" alt="Imagem Clicável" @click="deleteGame(game.id)"/>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div v-if="gameState !== null">
      <div class="blackscreen"></div>
      <div class="container-game-state">
        <p class="close" @click="closeGameState()">X</p>
        <div class="board-game-row" v-for="(row, rowIndex) in [0, 1, 2]" :key="rowIndex">
          <div class="board-game-cell"
              v-for="(cell, cellIndex) in gameState.slice(rowIndex * 3, rowIndex * 3 + 3)" :key="cellIndex">{{ cell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  td,th {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 230px;
    color: #440e6b;
  } 

  th {
    border-bottom: 2px solid #38b71b;
    font-size: 28px;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .history-container {
    margin-top: 3%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    justify-content: center;
    width: 100vw;
    height: 80vh;
  }

  .table-wrapper {
    width: 80%;
    max-height: 60vh; 
    overflow-y: auto;
    margin-top: 80px;
    background-color: #ffffff;
    border-radius: 55px;
    padding: 30px;
    border-spacing: 0 30px;
    border: 2px solid #38b71b;
  } 

  .history-table {
    width: 100%;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
  }

  .table-row {
    display: flex;
    justify-content: space-around;
    font-weight: 900;
    font-size: 23px;
  }

  .table-winner {
    text-align: center;
  }

  .details-info {
    color: rgba(0, 0, 0, 0.562);
  }

  .game-state-button {
    border-radius: 10px;
    transition: ease 0.3s;
    filter: brightness(0.1);
    cursor: pointer;
  }

  .game-state-button:hover{
    background-color: rgba(109, 109, 104, 0.61);
    filter: brightness(1)
  }

  .revanche-button {
    height: 40px;
    border-radius: 20px;
    font-size: 70%;
    background-color:#38b71b;
    color:#ffffff;
    transition: ease 0.3s;
    padding: 5%;
  }

  .revanche-button:hover {
    background-color:#440e6b;
    color: white;
  }

  .delete-button{
    height: 40px;
    border-radius: 10px;
    transition: ease 0.3s;
    padding: 5%;
    filter: brightness(0.1);
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #b92a2aa9;
    filter: brightness(1);
  }

.button-back {
  width: 60px;
  height: 60px;
  cursor: pointer;
  position: absolute;
  margin-left: 7%;
}

.container-game-state {
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 38%;
  width: 480px;
  height: 450px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.925);
  margin-top: 8%;
}

.board-game-row {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0px;

}

.board-game-cell {
  width: 100px;
  height: 100px;
  font-size: 80px;
  font-style: bold;
  color: #440e6b;
  border: 5px solid #38b71b;
}

.close {
  cursor: pointer;
  font-size: 30px;
  color: rgb(209, 8, 8);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-left: -380px;
  margin-top: -30px;
}

.blackscreen {
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    transition: opacity 0.5s;
    pointer-events: none;
}

</style>    
