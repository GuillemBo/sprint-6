import { Injectable } from '@angular/core';
import { Budget, CompleteBudget } from '../models/budget';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgets: Budget[] = [
    { title: 'Seo', description: 'Programació d una web responsive completa', price: 300, controlName: 'Seo'},
    { title: 'Ads', description: 'Programació d una web responsive completa', price: 400, controlName: 'Ads'},
    { title: 'Web', description: 'Programació d una web responsive completa', price: 500, controlName: 'Web'}
  ];
  constructor() { }

  getServices(): Budget[]{
    return this.budgets;
  }

  private budgetForm!: FormGroup;

  totalSelection = 0

  calculateTotalPrice(budgetForm: FormGroup): number {
    return this.budgets
      .filter(budget => budgetForm.get(budget.controlName)?.value)
      .reduce((total, budget) => total + budget.price, 0);
    }

    calculateExtraCost(counterSignalPages: number, counterSignalLanguages: number) {
      const ExtraCost = (counterSignalPages * counterSignalLanguages) * 30
      return ExtraCost
    }

    public pressupostos: CompleteBudget[] = [];


    addPresupuesto(budget: CompleteBudget) {
      this.pressupostos.push(budget);
    }

    getSelectedServices(budgetForm: FormGroup): Budget[] {
      return this.budgets.filter(budget => budgetForm.get(budget.controlName)?.value);
    }

    setBudgetForm(form: FormGroup) {
      this.budgetForm = form;
    }

    getBudgetForm(): FormGroup {
      return this.budgetForm;
    }

}
