import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: '<div>Login Page</div>' })
class MockLoginComponent {}

@Component({ template: '<div>Dashboard Page</div>' })
class MockDashboardComponent {}

@Component({ template: '<div>Jogo Page</div>' })
class MockJogoComponent {}

@Component({ template: '<div>Historico Page</div>' })
class MockHistoricoComponent {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([
          { path: 'login', component: MockLoginComponent },
          { path: 'dashboard', component: MockDashboardComponent },
          { path: 'jogo', component: MockJogoComponent },
          { path: 'historico', component: MockHistoricoComponent }
        ])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});