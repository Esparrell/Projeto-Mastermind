import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { servicesDashboard } from '../../services/dashboard';
import { Router, provideRouter } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({ template: '' })
class MockComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardServiceSpy: any;
  let routerSpy: any;
  let cdrSpy: any;

  beforeEach(async () => {
    dashboardServiceSpy = {
      getDados: vi.fn().mockReturnValue({}),
    };

    routerSpy = {
      navigate: vi.fn()
    };

    cdrSpy = {
      detectChanges: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, BaseChartDirective, DashboardComponent],
      providers: [
        { provide: servicesDashboard, useValue: dashboardServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        provideRouter([
          { path: 'jogo', component: MockComponent },
          { path: 'historico', component: MockComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});