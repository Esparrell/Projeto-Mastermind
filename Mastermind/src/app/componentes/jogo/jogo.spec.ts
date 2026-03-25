import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JogoComponent } from './jogo';
import { servicesJogo } from '../../services/jogo';
import { Router } from '@angular/router';
import { vi } from 'vitest';

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;
  let jogoSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    jogoSpy = {
      iniciarJogo: vi.fn(),
      resetarJogo: vi.fn(),
      mudarCor: vi.fn(),
      enviarLinha: vi.fn()
    };

    routerSpy = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [JogoComponent],
      providers: [
        { provide: servicesJogo, useValue: jogoSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar mudarCor', () => {
    component.mudarCor(0, 1);
    expect(jogoSpy.mudarCor).toHaveBeenCalledWith(0, 1);
  });

  it('deve navegar ao voltar', () => {
    component.voltar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});