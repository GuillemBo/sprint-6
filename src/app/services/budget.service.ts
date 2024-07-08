import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Budget, CompleteBudget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgets: Budget[] = [
    { title: 'Seo', description: 'Programació d una web responsive completa', price: 300, controlName: 'seo'},
    { title: 'Ads', description: 'Programació d una web responsive completa', price: 400, controlName: 'ads'},
    { title: 'Web', description: 'Programació d una web responsive completa', price: 500, controlName: 'web'}
  ];
  constructor() { }

  getServices(): Budget[]{
    return this.budgets;
  }

  private budgetForm!: FormGroup;

  totalSelection = 0

  calculateTotalPrice(servicesFormValues:any): number {
    return this.budgets
      .filter(budget => servicesFormValues[budget.controlName])
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

    getPressupostos() {
      return this.pressupostos
    }

}
