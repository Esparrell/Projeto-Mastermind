import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { servicesJogo } from '../../services/jogo';
import { ChangeDetectorRef } from '@angular/core';  
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-jogo',
  imports: [NgClass, NgForOf, NgIf, RouterModule],
  templateUrl: './jogo.html',
  styleUrl: './jogo.css',
})

export class JogoComponent implements OnInit, OnDestroy {
  tempoAtual: string = '00:00';
  timerVisualInterval: any;

  constructor(
      public jogo: servicesJogo,
      private cd: ChangeDetectorRef,
      private router: Router
  ) {}

  async ngOnInit() {
    const idUsuario = localStorage.getItem('id_usuario');
    
    if (!idUsuario) {
      console.log('Usuário não autenticado, redirecionando...');
      this.router.navigate(['/login']);
      return;
    }
    
    this.jogo.resetarJogo();
    
    await this.jogo.iniciarJogo();
    
    this.iniciarTimerVisual();
    
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.timerVisualInterval) {
      clearInterval(this.timerVisualInterval);
    }
  }

  iniciarTimerVisual() {
    if (this.timerVisualInterval) {
      clearInterval(this.timerVisualInterval);
    }
    

    this.timerVisualInterval = setInterval(() => {
      this.tempoAtual = this.jogo.formatarTempo(this.jogo.tempoDecorrido);
      this.cd.detectChanges();
    }, 1000);
  }

  getClasse(botao: any) {
    return this.jogo.getClasse(botao);
  }

  mudarCor(i: number, j: number) {
    this.jogo.mudarCor(i, j);
    this.cd.detectChanges();
  }

  async enviarLinha(i: number) {
    const venceu = await this.jogo.enviarLinha(i);
    this.cd.detectChanges();
    
    if (venceu) {
      if (this.timerVisualInterval) {
        clearInterval(this.timerVisualInterval);
        this.timerVisualInterval = null;
      }
      
      const tempoFinal = this.jogo.formatarTempo(this.jogo.tempoDecorrido);
      setTimeout(() => {
        alert(`🎉 Parabéns! Você venceu o jogo em ${tempoFinal}! 🎉`);
        this.router.navigate(['/dashboard']);
      }, 100);
    }
  }
    
  voltar(){
    this.router.navigate(['/dashboard']);
  }

  async reiniciarJogo() {
    if (this.timerVisualInterval) {
      clearInterval(this.timerVisualInterval);
      this.timerVisualInterval = null;
    }
    
    this.jogo.resetarJogo();
    await this.jogo.iniciarJogo();
    this.iniciarTimerVisual();
    this.cd.detectChanges();
  }
}