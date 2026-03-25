import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login';
import { DashboardComponent } from './componentes/dashboard/dashboard';
import { JogoComponent } from './componentes/jogo/jogo';
import { HistoricoComponent } from './componentes/historico/historico';
import { CadastroComponent } from './componentes/cadastro/cadastro';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'jogo', 
    component: JogoComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'historico', 
    component: HistoricoComponent,
    canActivate: [AuthGuard] 
  },
  
  { path: 'cadastro', component: CadastroComponent}, 

  { path: '**', redirectTo: '/login' }
];