import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from '@angular/router';
import { servicesDashboard } from '../../services/dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective]
})
export class DashboardComponent implements OnInit, OnDestroy {
  intervalId: any;

  constructor(
    public dashboard: servicesDashboard,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const idUsuario = localStorage.getItem('id_usuario');
    if (!idUsuario) {
      console.log('Usuário não autenticado, redirecionando...');
      this.router.navigate(['/login']);
      return;
    }
    
    console.log('Dashboard inicializado');
    this.carregarPlacar();
    
    this.intervalId = setInterval(() => {
      this.carregarPlacar();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async carregarPlacar() {
    await this.dashboard.define_placar();
    this.cd.detectChanges();
  }

  acessaHistorico() {
    this.router.navigate(['/historico']);
  }

  logout() {
    if (confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('id_usuario');
      localStorage.removeItem('usuario');
      localStorage.removeItem('lembrar_usuario');
      this.router.navigate(['/login']);
    }
  }
}