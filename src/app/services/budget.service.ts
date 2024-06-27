import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';

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
}
