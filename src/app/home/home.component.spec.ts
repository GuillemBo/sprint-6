import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BudgetService } from '../services/budget.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HomeComponent],
      providers: [FormBuilder, BudgetService]
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
      { title: 'Seo', description: 'Programación web completa', price: 300, controlName: 'Seo' },
      { title: 'Ads', description: 'Programación web completa', price: 400, controlName: 'Ads' },
      { title: 'Web', description: 'Programación web completa', price: 500, controlName: 'Web' }
    ];
    spyOn(budgetService, 'getServices').and.returnValue(budgets);

    component.ngOnInit();

    component.budgetForm.patchValue({
      'Seo': true,
      'Ads': true
    });

    component.calculateTotalPrice();

    expect(component.totalPrice).toEqual(700); // 300 + 400
  });
});