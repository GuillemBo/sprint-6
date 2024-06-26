import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgets: Budget[] = [
    { title: 'Seo', description: 'Programació d una web responsive completa', price: 300, selector: false},
    { title: 'Ads', description: 'Programació d una web responsive completa', price: 400, selector: false},
    { title: 'Web', description: 'Programació d una web responsive completa', price: 500, selector: false}
  ];
  constructor() { }

  getServices(): Budget[]{
    return this.budgets;
  }
}
