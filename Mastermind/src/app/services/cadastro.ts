import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class servicesCadastro {
  
  async cadastrar(usuario: string, senha: string, email: string = '') {
    try {
      console.log('Tentando cadastrar:', usuario);
      
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario,
          senha: senha,
          email: email
        })
      });

      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Resposta texto:', text);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resposta do cadastro:', data);
      
      return data;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  }
}