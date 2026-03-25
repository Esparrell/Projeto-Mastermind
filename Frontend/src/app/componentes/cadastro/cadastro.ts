import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { servicesCadastro } from '../../services/cadastro';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  usuario: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  email: string = '';
  carregando: boolean = false;
  erro: string = '';
  sucesso: string = '';

  constructor(
    private cadastroService: servicesCadastro,
    private router: Router
  ) {}

  async cadastrar() {
    if (!this.usuario || !this.senha) {
      this.erro = 'Por favor, preencha todos os campos obrigatórios!';
      setTimeout(() => this.erro = '', 3000);
      return;
    }

    if (this.usuario.length < 3) {
      this.erro = 'Usuário deve ter pelo menos 3 caracteres!';
      setTimeout(() => this.erro = '', 3000);
      return;
    }

    if (this.senha.length < 4) {
      this.erro = 'Senha deve ter pelo menos 4 caracteres!';
      setTimeout(() => this.erro = '', 3000);
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem!';
      setTimeout(() => this.erro = '', 3000);
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    try {
      const resultado = await this.cadastroService.cadastrar(
        this.usuario, 
        this.senha, 
        this.email
      );
      
      console.log('Resultado do cadastro:', resultado);
      
      if (resultado && resultado.status === 'sucesso') {
        this.sucesso = resultado.mensagem || 'Cadastro realizado com sucesso!';
        
        setTimeout(() => {
          localStorage.setItem('id_usuario', resultado.id_usuario.toString());
          localStorage.setItem('usuario', resultado.usuario);
          
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.erro = resultado?.mensagem || 'Erro ao cadastrar. Tente novamente!';
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

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}