import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class servicesHistorico{
  historico: any[] = [];
  expandido: number | null = null;
  carregando: boolean = true;
    
  async carregarHistorico() {
    this.carregando = true;
    const idUsuario = localStorage.getItem('id_usuario');
    console.log("ID do usuário:", idUsuario);
    try {
      const response = await fetch(`api/historico/${idUsuario}`);

      if (!response.ok) {
        console.error("Erro na resposta:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Histórico recebido:", data);

      this.historico = data;

    } catch (erro) {
      console.error("Erro ao buscar histórico:", erro);
    }
    this.carregando = false;
  }

  toggleExpand(index: number) {
    this.expandido = this.expandido === index ? null : index;
  }

  parseEstado(estado: string) {
    try {
      return JSON.parse(estado);
    } catch {
      return [];
    }
  }
  
  formatarData(data: string) {
    if (!data) return 'Data não disponível';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  formatarTempo(tempo: number): string {
    if (!tempo && tempo !== 0) return '—';
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }
}