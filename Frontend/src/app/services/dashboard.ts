import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Router, RouterModule } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class servicesDashboard {
  constructor(private router: Router){}
  pontuacao_total: any[] = [];
  intervalId: any;
  
  public barChartOptions: ChartConfiguration['options'] = { 
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: '#f77002',
        titleColor: 'white',
        bodyColor: 'white'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pontuação',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          color: '#e0e0e0'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Jogadores',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      }
    }
  };
  
  public barChartLabels = ['1º', '2º', '3º'];
  
  public barChartData = [
    { 
      data: [0, 0, 0], 
      label: 'Top 3 Pontuações',
      backgroundColor: ['#FFD700', '#C0C0C0', '#CD7F32'],
      borderColor: ['#FFD700', '#C0C0C0', '#CD7F32'],
      borderWidth: 2,
      borderRadius: 8,
      barPercentage: 0.7
    }
  ];

  async define_placar() {
    try {
      const idUsuario = localStorage.getItem('id_usuario');
      
      if (!idUsuario) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
      }
      
      console.log('Buscando dados para usuário:', idUsuario);
      const response = await fetch(`/api/dashboard/${idUsuario}`);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos do servidor:', data);
      
      this.pontuacao_total = data;
      this.atualizarGrafico();
      
      return data;
    } catch (err) {
      console.error('Erro ao carregar placar:', err);
      this.pontuacao_total = [];
    }
  }

  atualizarGrafico() {
    if (this.pontuacao_total && this.pontuacao_total.length > 0) {
      const top3 = this.pontuacao_total.slice(0, 3);
      this.barChartData = [
        { 
          data: top3.map(item => item.pontuacao_total), 
          label: 'Top 3 Pontuações',
          backgroundColor: ['#FFD700', '#C0C0C0', '#CD7F32'],
          borderColor: ['#FFD700', '#C0C0C0', '#CD7F32'],
          borderWidth: 2,
          borderRadius: 8,
          barPercentage: 0.7
        }
      ];
      this.barChartLabels = top3.map(item => item.nome || item.usuario);
      console.log('Gráfico atualizado:', this.barChartLabels, this.barChartData);
    }
  }

    acessaHistorico(){
    try{ 
      const response = fetch('api/historico');

      } catch (err) {
        console.error('Erro ao carregar placar:', err);
      }   
    }

    logout(){
      if (confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('id_usuario');
      localStorage.removeItem('usuario');
      localStorage.removeItem('lembrar_usuario');
      this.router.navigate(['/login']);
      }
    }
  }
