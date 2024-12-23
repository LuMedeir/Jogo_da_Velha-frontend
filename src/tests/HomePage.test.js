import { mount } from '@vue/test-utils';
import HomePage from '../components/HomePage.vue';
import { vi } from 'vitest';
import { useRouter } from 'vue-router';
import axios from 'axios';


// Mock do axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}))

// Mock do useRouter
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));


describe('HomePage Component', () => {
  it('deve chamar axios.post ao clicar no botão de iniciar o jogo', async () => {
    const pushMock = vi.fn(); // Simula o método push do roteador
    useRouter.mockReturnValue({ push: pushMock });

    // Simula a resposta do axios
    const mockResponse = { 
      data: { 
        id: 123
      } 
    };
    axios.post.mockResolvedValue(mockResponse);

    // Monta o componente
    const wrapper = mount(HomePage);

    // Simula o clique no botão "Iniciar Jogo"
    await wrapper.find('button').trigger('click');

    // Garante que axios.post foi chamado com a URL e os parâmetros esperados
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/games', {});

    // Garante que o redirecionamento ocorreu com os parâmetros esperados
    expect(pushMock).toHaveBeenCalledWith({ name: 'GameBoard', params: { id: 123 } }); 
  });

  it('deve chamar router.push ao clicar no botão do histórico de jogos', async () => {
    // Mock do router.push
    const pushMock = vi.fn();
    useRouter.mockReturnValue({ push: pushMock });

    // Monta o componente
    const wrapper = mount(HomePage);

    // Simula o clique no botão "Ver Historico"
    await wrapper.findAll('button').at(1).trigger('click');

    // Garante que o redirecionamento ocorreu com os parâmetros esperados
    expect(pushMock).toHaveBeenCalledWith({ name: 'GameHistory' });
  });

  it('deve renderizar a imagem no background corretamente', () => {
    const wrapper = mount(HomePage);

    const img = wrapper.find('[data-test="background-image"]');

    // Verifica se a imagem existe
    expect(img.exists()).toBe(true);

    // Verifica o atributo src
    expect(img.attributes('src')).toBe('/src/assets/img/home-background.png');
  });

  it('deve renderizar a imagem game corretamente', () => {
    const wrapper = mount(HomePage);

    const img = wrapper.find('[data-test="game-image"]');

    // Verifica se a imagem existe
    expect(img.exists()).toBe(true);

    // Verifica o atributo src
    expect(img.attributes('src')).toBe('/src/assets/img/game.png');
  });
});
