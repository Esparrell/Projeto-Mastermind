import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { servicesLogin } from '../../services/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';
  lembrar: boolean = false;
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private loginService: servicesLogin,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async login() {
    if (!this.usuario || !this.senha) {
      this.erro = 'Por favor, preencha todos os campos!';
      setTimeout(() => this.erro = '', 3000);
      return;
    }

    this.carregando = true;
    this.erro = '';

    try {
      const resultado = await this.loginService.login(this.usuario, this.senha);
      
      console.log('Resultado do login:', resultado);
      
      if (resultado && resultado.status === 'sucesso' && resultado.id_usuario) {
        localStorage.setItem('id_usuario', resultado.id_usuario.toString());
        localStorage.setItem('usuario', resultado.usuario);
        
        if (this.lembrar) {
          localStorage.setItem('lembrar_usuario', this.usuario);
        }
        
        console.log('Login realizado com sucesso!');
        
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        
        this.router.navigate([returnUrl]);
      } else {
        this.erro = resultado?.mensagem || 'Usuário ou senha inválidos!';
        setTimeout(() => this.erro = '', 3000);
      }
    } catch (error) {
      console.error('Erro detalhado:', error);
      this.erro = 'Erro ao conectar com o servidor. Tente novamente!';
      setTimeout(() => this.erro = '', 3000);
    } finally {
      this.carregando = false;
    }
  }
}