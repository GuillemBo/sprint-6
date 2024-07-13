import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BudgetService } from '../services/budget.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HomeComponent, RouterTestingModule],
      providers: [
        FormBuilder,
        BudgetService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              numPages: '1',
              numLanguages: '1'
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price correctly', () => {
    const budgets = [
      { title: 'Seo', description: 'Programación web completa', price: 300, controlName: 'seo' },
      { title: 'Ads', description: 'Programación web completa', price: 400, controlName: 'ads' },
      { title: 'Web', description: 'Programación web completa', price: 500, controlName: 'web' }
    ];
    spyOn(budgetService, 'getServices').and.returnValue(budgets);

    component.ngOnInit();

    component.budgetForm.patchValue({
      'seo': true,
      'ads': true
    });

    component.calculateTotalPrice();

    expect(component.totalPrice).toEqual(700);
  });
});
