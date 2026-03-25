import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class servicesLogin {
  
  async login(usuario: string, senha: string) {
    try {
      console.log('Tentando login com:', usuario);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario,
          senha: senha
        })
      });

      console.log('Status da resposta:', response.status);
      
      if (!response.ok) {
        console.error('Erro na resposta:', response.status);
        const text = await response.text();
        console.error('Resposta texto:', text);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resposta do login:', data);
      
      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }
}