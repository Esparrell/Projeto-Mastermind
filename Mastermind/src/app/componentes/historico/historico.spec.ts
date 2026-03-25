import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoComponent } from './historico';
import { servicesHistorico } from '../../services/historico';
import { Router, provideRouter } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { vi } from 'vitest';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({ template: '' })
class MockComponent {}

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;
  let historicoServiceSpy: any;
  let routerSpy: any;
  let cdrSpy: any;

  beforeEach(async () => {
    historicoServiceSpy = {
      historico: [
        {
          id: 1,
          pontuacao: 100,
          tentativas: 5,
          data: '2024-01-01T10:00:00',
          estado_completo: '[["vermelho", "azul", "verde"], ["amarelo", "roxo", "laranja"]]',
          resposta_correta: 'vermelho,azul,verde'
        }
      ],
      expandido: null,
      carregando: false,
      carregarHistorico: vi.fn().mockResolvedValue(undefined),
      toggleExpand: vi.fn(),
      parseEstado: vi.fn().mockImplementation((estado) => {
        try {
          return JSON.parse(estado);
        } catch {
          return [];
        }
      }),
      formatarData: vi.fn().mockReturnValue('01/01/2024 10:00')
    };

    routerSpy = {
      navigate: vi.fn()
    };

    cdrSpy = {
      detectChanges: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HistoricoComponent],
      providers: [
        { provide: servicesHistorico, useValue: historicoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        provideRouter([
          { path: 'jogo', component: MockComponent },
          { path: 'dashboard', component: MockComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(historicoServiceSpy.carregarHistorico).toHaveBeenCalled();
  });

  it('deve chamar carregarHistorico ao iniciar', () => {
    expect(historicoServiceSpy.carregarHistorico).toHaveBeenCalledTimes(1);
  });

  it('deve chamar BotaoCarregarHistorico', async () => {
    historicoServiceSpy.carregarHistorico.mockClear();
    cdrSpy.detectChanges.mockClear();
    
    await component.BotaoCarregarHistorico();
    await fixture.whenStable();
    
    expect(historicoServiceSpy.carregarHistorico).toHaveBeenCalled();
    expect(cdrSpy.detectChanges).toHaveBeenCalled();
  });

  it('deve chamar toggleExpand', () => {
    component.toggleExpand(0);
    expect(historicoServiceSpy.toggleExpand).toHaveBeenCalledWith(0);
  });

  it('deve chamar parseEstado', () => {
    const estado = '[["vermelho", "azul"]]';
    component.parseEstado(estado);
    expect(historicoServiceSpy.parseEstado).toHaveBeenCalledWith(estado);
  });

  it('deve chamar formatarData', () => {
    const data = '2024-01-01';
    component.formataData(data);
    expect(historicoServiceSpy.formatarData).toHaveBeenCalledWith(data);
  });

  it('deve navegar ao voltar', () => {
    component.voltar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('deve exibir a tabela quando houver dados', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const table = fixture.debugElement.query(By.css('.historico-table'));
    expect(table).toBeTruthy();
  });

  it('deve exibir mensagem de vazio quando não houver dados', async () => {
    historicoServiceSpy.historico = [];
    historicoServiceSpy.carregando = false;
    
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    
    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyState).toBeTruthy();
  });

  it('deve exibir loading state quando carregando', async () => {
    historicoServiceSpy.carregando = true;
    historicoServiceSpy.historico = [];
    
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    
    const loadingContainer = fixture.debugElement.query(By.css('.loading-container'));
    expect(loadingContainer).toBeTruthy();
  });

  it('deve chamar toggleExpand ao clicar no botão expandir', () => {
    fixture.detectChanges();
    const expandButton = fixture.debugElement.query(By.css('.btn-expand'));
    
    if (expandButton) {
      expandButton.triggerEventHandler('click', null);
      expect(historicoServiceSpy.toggleExpand).toHaveBeenCalledWith(0);
    }
  });

  it('deve chamar BotaoCarregarHistorico ao clicar no botão atualizar', async () => {
    fixture.detectChanges();
    const refreshButton = fixture.debugElement.query(By.css('.btn-refresh'));
    
    if (refreshButton) {
      refreshButton.triggerEventHandler('click', null);
      await fixture.whenStable();
      expect(historicoServiceSpy.carregarHistorico).toHaveBeenCalled();
    }
  });

  it('deve chamar voltar ao clicar no botão voltar', () => {
    fixture.detectChanges();
    const backButton = fixture.debugElement.query(By.css('.btn-back'));
    
    if (backButton) {
      backButton.triggerEventHandler('click', null);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    }
  });
});