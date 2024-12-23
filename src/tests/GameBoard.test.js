import { mount } from '@vue/test-utils';
import GameBoard from '../components/GameBoard.vue';
import { vi } from 'vitest';
import { useRouter } from 'vue-router';

// Mock do roteador
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('GameBoard.vue', () => {

    it('deve chamar router.push ao clicar no botão de voltar', async () => {
        const pushMock = vi.fn(); // Simula o método push do roteador
        useRouter.mockReturnValue({ push: pushMock });
    
        // Monta o componente
        const wrapper = mount(GameBoard, {
          props: {
            id: '123',
          },
        });
        expect(wrapper.exists()).toBe(true);
    
        // Simula o clique no botão de voltar
        await wrapper.find('[data-test="button-back"]').trigger('click');
    
        // Garante que o redirecionamento ocorreu com os parâmetros esperados
        expect(pushMock).toHaveBeenCalledWith({ name: 'HomePage' }); 
      });

    it('deve renderizar a imagem no background corretamente', () => {
        const wrapper = mount(GameBoard, {
        props: {
            id: '123',
        },
        });

        // Verifica se o componente renderizou corretamente
        expect(wrapper.exists()).toBe(true);

        const img = wrapper.find('[data-test="background-image"]');

        // Verifica se a imagem existe
        expect(img.exists()).toBe(true);

        // Verifica o atributo src
        expect(img.attributes('src')).toBe('/src/assets/img/background.png');
    });

    it('deve chamar o método resetGame ao clicar no botão de reiniciar', async () => {
        const wrapper = mount(GameBoard, {
        props: {
            id: '123',
        },
        });

        // Cria um mock da função resetGame
        const resetGameMock = vi.fn();
        wrapper.vm.resetGame = resetGameMock;

        const resetButton = wrapper.find('[data-test="reset-button"]');
        await resetButton.trigger('click');

        // Verifica se resetGame foi chamada
        expect(resetGameMock).toHaveBeenCalled();
    });

    it('deve chamar setPlay ao clicar em uma célula', async () => {
        // Monta o componente
        const wrapper = mount(GameBoard, {
        props: {
            id: '123', // forneça as props necessárias
        },
        });

        // Cria um mock da função setPlay
        const setPlayMock = vi.fn();
        wrapper.vm.setPlay = setPlayMock;

        // Encontra a célula e simula o clique
        const cell = wrapper.find('[data-test="cell"]');
        await cell.trigger('click');

        // Verifica se setPlay foi chamada
        expect(setPlayMock).toHaveBeenCalled();
    });
});
