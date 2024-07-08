import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompleteBudget } from '../models/budget';
import { BudgetService } from './../services/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent implements OnInit{

  budgetForm2: FormGroup;

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

      // Obtener el formulario principal desde el servicio
      const budgetForm = this.BudgetService.getBudgetForm();

      // const totalPrice = this.BudgetService.calculateTotalPrice(budgetForm);
      const selectedServices = this.BudgetService.getSelectedServices(budgetForm);

      // Crear un nuevo presupuesto
      const newPresupuesto = {
        name: this.budgetForm2.get('name')?.value,
        phone: this.budgetForm2.get('phone')?.value,
        email: this.budgetForm2.get('email')?.value,
        services: selectedServices,
        totalPrice: this.totalPrice
      };

      // Agregar el nuevo presupuesto al array
      this.BudgetService.addPresupuesto(newPresupuesto);
      console.log(newPresupuesto)

    } else {
      console.log('Form is invalid');
    }
  }

}
