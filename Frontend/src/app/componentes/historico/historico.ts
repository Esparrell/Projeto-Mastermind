    import { Component, OnInit } from '@angular/core';
    import { NgIf, NgFor, NgClass, } from '@angular/common';
    import { ChangeDetectorRef } from '@angular/core';
    import { servicesHistorico } from '../../services/historico';
    import { Router, RouterModule } from '@angular/router';

    @Component({
      selector: 'app-historico',
      standalone: true,
      imports: [NgIf, NgFor,NgClass, RouterModule],
      templateUrl: './historico.html',
      styleUrl: './historico.css',
    })


    export class HistoricoComponent implements OnInit{
        constructor(
          public historico: servicesHistorico,
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
        
        console.log('Histórico inicializado');
        await this.historico.carregarHistorico();
        this.cd.detectChanges();
    }


        async BotaoCarregarHistorico(){
          await this.historico.carregarHistorico()
          this.cd.detectChanges()
        }

        toggleExpand(i:number){
          this.historico.toggleExpand(i)
        }

        parseEstado(estado: string){  
          return this.historico.parseEstado(estado)
        }

        voltar(){
          this.router.navigate(['/dashboard'])
        }
        formataData(data: string){
          this.historico.formatarData(data);
        }
        }