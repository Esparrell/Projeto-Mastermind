import { TestBed } from '@angular/core/testing';
import { servicesJogo } from './jogo';

describe('servicesJogo', () => {
  let service: servicesJogo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(servicesJogo);
  });

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve resetar o jogo', () => {
    service.linhaAtual = 5;
    service.acertos = [1,2,3];

    service.resetarJogo();

    expect(service.linhaAtual).toBe(0);
    expect(service.acertos.length).toBe(0);
  });

  it('deve mudar cor do botão', () => {
    service.mudarCor(0, 0);

    expect(service.botoes[0][0].estado).toBe(0);
  });
});