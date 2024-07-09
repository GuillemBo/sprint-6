import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompleteBudget } from '../models/budget';
import { BudgetService } from './../services/budget.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent implements OnInit{

  budgetForm2: FormGroup;

  fechaActual?: Date;

  @Input() totalPrice: number = 0;
  pressupostos: CompleteBudget[] = []

  constructor(private fb: FormBuilder ,public BudgetService: BudgetService) {
    this.budgetForm2 = this.fb.group({
      name: new FormControl ('', [Validators.required]),
      phone: new FormControl ('', [Validators.required, Validators.pattern("[0-9 ]{9}")]),
      email: new FormControl ('', [Validators.required, Validators.email])
    });

  }


  ngOnInit(): void {
    console.log(this.BudgetService.pressupostos);

    this.pressupostos = this.BudgetService.getPressupostos();
  }

  onSubmit() {
    if (this.budgetForm2.valid) {

      const budgetForm = this.BudgetService.getBudgetForm();

      const selectedServices = this.BudgetService.getSelectedServices(budgetForm);
      this.fechaActual = new Date();

      const newPresupuesto = {
        name: this.budgetForm2.get('name')?.value,
        phone: this.budgetForm2.get('phone')?.value,
        email: this.budgetForm2.get('email')?.value,
        services: selectedServices,
        totalPrice: this.totalPrice,
        fechaActual: this.fechaActual
      };

      this.BudgetService.addPresupuesto(newPresupuesto);

    } else {
      console.log('Form is invalid');
    }
  }


  searchTerm: string = '';

  ordenarPorNombre() {
    this.pressupostos.sort((a, b) => a.name > b.name ? 1 : -1);
  }

  ordenarPorPrecio() {
    this.pressupostos.sort((a, b) => b.totalPrice - a.totalPrice);
  }

  ordenarPorFecha() {
    this.pressupostos.sort((a, b) => b.fechaActual.getTime() - a.fechaActual.getTime());
  }

  filterItems() {
    if (!this.searchTerm.trim()) {
      return this.pressupostos;
    }

    const filtered = this.pressupostos.filter(pressupost =>
      pressupost.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filtered.length > 0 ? filtered : [{ name: 'No hay resultados' } as CompleteBudget];
  }

}
