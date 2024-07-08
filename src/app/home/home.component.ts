import { Budget } from './../models/budget';
import { BudgetService } from './../services/budget.service';
import { Component, OnInit, WritableSignal, signal} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetListComponent } from '../budget-list/budget-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  budgets: Budget[] = [];
  budgetForm: FormGroup;
  totalPrice = 0;

  counterSignalPages: WritableSignal<number>;
  counterSignalLanguages: WritableSignal<number>;


  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({});
    this.counterSignalPages = signal(0); // Inicialización con valor inicial 1
    this.counterSignalLanguages = signal(0);
    this.budgetService.setBudgetForm(this.budgetForm);
  }

  ngOnInit(): void {
    this.budgets = this.budgetService.getServices();

    this.budgets.forEach(budget => {
      this.budgetForm.addControl(budget.controlName, this.fb.control(false));
    });

    this.budgetForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });

    this.budgetForm.get('Web')?.valueChanges.subscribe(value => {
      if (!value) {
        this.resetPagesLanguages();
      }
    });
  }


  calculateTotalPrice(): void {
    this.totalPrice = this.budgetService.calculateTotalPrice(this.budgetForm)
    this.totalPrice += this.budgetService.calculateExtraCost(this.counterSignalPages(), this.counterSignalLanguages());
  }


  onCounterSignalPagesChange(newCount: number): void {
    this.counterSignalPages.set(newCount);
    this.calculateTotalPrice();
  }

  onCounterSignalLanguagesChange(newCount: number): void {
    this.counterSignalLanguages.set(newCount);
    this.calculateTotalPrice();
  }

  resetPagesLanguages() {
    this.counterSignalLanguages.set(0)
    this.counterSignalPages.set(0)
  }

}
