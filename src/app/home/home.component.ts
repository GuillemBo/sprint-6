import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { PanelComponent } from '../panel/panel.component';
import { Budget } from './../models/budget';
import { BudgetService } from './../services/budget.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  budgets: Budget[] = [];
  budgetForm: FormGroup = this.fb.group({
  });
  totalPrice = 0;

  counterSignalPages: WritableSignal<number>;
  counterSignalLanguages: WritableSignal<number>;


  constructor(private fb: FormBuilder, private budgetService: BudgetService, private router: Router,
    private route: ActivatedRoute) {
    this.counterSignalPages = signal(0);
    this.counterSignalLanguages = signal(0);
    this.budgetService.setBudgetForm(this.budgetForm);
  }

  ngOnInit(): void {
    this.budgets = this.budgetService.getServices();

    this.budgets.forEach(budget => {
      this.budgetForm.addControl(budget.controlName, this.fb.control(false));
    });

    this.route.queryParams.subscribe(params => {
      Object.keys(params).forEach(key => {
        if (this.budgetForm.controls[key]) {
          this.budgetForm.controls[key].setValue(params[key] === 'true');
        }
        if (params['numPages']) {
          this.counterSignalPages.set(Number(params['numPages']));
        }
        if (params['numLanguages']) {
          this.counterSignalLanguages.set(Number(params['numLanguages']));
        }
      });
      
      this.calculateTotalPrice();
    });

    this.budgetForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
      this.updateUrl();
    });

    this.budgetForm.get('web')?.valueChanges.subscribe(value => {
      if (!value) {
        this.resetPagesLanguages();
      }
    });

  }


  calculateTotalPrice(): void {
    this.totalPrice = this.budgetService.calculateTotalPrice(this.budgetForm.value)
    this.totalPrice += this.budgetService.calculateExtraCost(this.counterSignalPages(), this.counterSignalLanguages());
  }

  updateUrl(): void {
    const queryParams: Params = {
      numPages: this.counterSignalPages().toString(),
      numLanguages: this.counterSignalLanguages().toString()
    };
    Object.keys(this.budgetForm.controls).forEach(key => {
      queryParams[key] = this.budgetForm.controls[key].value.toString();
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }


  onCounterSignalPagesChange(newCount: number): void {
    this.counterSignalPages.set(newCount);
    this.calculateTotalPrice();
    this.updateUrl();
  }

  onCounterSignalLanguagesChange(newCount: number): void {
    this.counterSignalLanguages.set(newCount);
    this.calculateTotalPrice();
    this.updateUrl();
  }

  resetPagesLanguages() {
    this.counterSignalLanguages.set(0)
    this.counterSignalPages.set(0)
  }

  getTotalPrice() {
    return this.totalPrice
  }


}
