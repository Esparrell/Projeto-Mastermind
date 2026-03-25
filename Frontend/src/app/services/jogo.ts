import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class servicesJogo{
  linhaAtual: number = 0;
  cores = ['vermelho', 'verde', 'azul', 'amarelo'];
  acertos: any[] = [];
  tempoInicio: number = 0;
  tempoDecorrido: number = 0;
  timerInterval: any;

  botoes = Array.from({ length: 10 }, () =>
    ['A', 'B', 'C', 'D'].map((letra) => ({
      label: letra,
      estado: -1
    }))
  );

  iniciarTimer() {

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    console.log('Iniciando timer...');
    this.tempoInicio = Date.now();
    this.tempoDecorrido = 0;
    
    this.timerInterval = setInterval(() => {
      this.tempoDecorrido = Math.floor((Date.now() - this.tempoInicio) / 1000);
      console.log('Tempo decorrido:', this.tempoDecorrido);
    }, 1000);
  }


  pararTimer(): number {
    console.log('Parando timer. Tempo final:', this.tempoDecorrido);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    return this.tempoDecorrido;
  }
  
  formatarTempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  }

  async iniciarJogo() {
    try {
      console.log('Iniciando jogo...');
      const response = await fetch('/api/iniciar_jogo', { method: 'POST' }); 
      const data = await response.json();
      console.log('Jogo iniciado pela API');
      
      this.iniciarTimer();
      
      return data;
    } catch (error) {
      console.error('Erro ao iniciar jogo:', error);
    }
  }

  getClasse(botao: any){ 
    return this.cores[botao.estado];
  }

  mudarCor(i: number, j: number) {
    let botao = this.botoes[i][j];
    botao.estado = (botao.estado + 1) % 4;
    console.log(`Botão [${i}][${j}] mudado para: ${this.cores[botao.estado]}`);
  }

  resetarJogo() {
    console.log('Resetando jogo...');
    this.linhaAtual = 0;
    this.acertos = [];
    this.tempoDecorrido = 0;
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    this.tempoInicio = Date.now();

    this.botoes = Array.from({ length: 10 }, () =>
      ['A', 'B', 'C', 'D'].map((letra) => ({
        label: letra,
        estado: -1
      }))
    );
  }

  async enviarLinha(i: number) {
    if (i !== this.linhaAtual) {
      console.log(`Linha ${i} não é a linha atual ${this.linhaAtual}`);
      return false;
    }
    
    const linha = this.botoes[i];

    if (linha.some(btn => btn.estado === -1)) {
      alert('Preencha todos os botões!');
      return false;
    }

    const estado_botoes = linha.map(btn => this.cores[btn.estado]);
    const idUsuario = localStorage.getItem('id_usuario');
    
    const tempoTotal = this.tempoDecorrido;
    console.log(`Enviando linha ${i} com tempo: ${tempoTotal}`);

    try {
      const response = await fetch(`/api/jogo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tentativas: i,
          estados_botoes: estado_botoes,
          id_usuario: idUsuario,
          tempo_total: tempoTotal
        })
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      this.acertos[i] = data.acertos;
      console.log('Resposta da API:', data);

      if (data.acertos.acertos == 4) {
        console.log('Vitória! Parando timer...');
        this.pararTimer();
        return true; 
      }

      this.linhaAtual++;
      console.log(`Linha atual agora: ${this.linhaAtual}`);

      if (this.linhaAtual >= 10) {
        console.log('Fim do jogo! Parando timer...');
        this.pararTimer();
        alert(`😔 Fim do jogo! Você não conseguiu adivinhar a sequência.\nTempo total: ${this.formatarTempo(tempoTotal)}`);
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao enviar linha:', error);
      alert('Erro ao enviar tentativa. Tente novamente!');
      return false
    }
  }

  async reiniciarJogo() {
    console.log('Reiniciando jogo...');
    this.resetarJogo();
    await this.iniciarJogo();
    console.log('Jogo reiniciado com sucesso!');
  }
}