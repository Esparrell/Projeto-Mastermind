import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { servicesLogin } from '../../services/login';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({ template: '' })
class MockComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    loginServiceSpy = {
      fazerLogin: vi.fn().mockResolvedValue({ success: true }),
    };

    routerSpy = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, LoginComponent],
      providers: [
        { provide: servicesLogin, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([
          { path: 'dashboard', component: MockComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});