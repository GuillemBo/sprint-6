import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from './../services/budget.service';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent implements OnInit{

  budgetForm2: FormGroup;


  constructor(private fb: FormBuilder ,public BudgetService: BudgetService) {
    this.budgetForm2 = this.fb.group({
      name: new FormControl ('', [Validators.required]),
      phone: new FormControl ('', [Validators.required, Validators.pattern("[0-9 ]{9}")]),
      email: new FormControl ('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    console.log(this.BudgetService.pressupostos);
  }

  onSubmit() {
    if (this.budgetForm2.valid) {

      // Obtener el formulario principal desde el servicio
      const budgetForm = this.BudgetService.getBudgetForm();

      // Calcular el precio total


      const totalPrice = this.BudgetService.calculateTotalPrice(budgetForm);
      const selectedServices = this.BudgetService.getSelectedServices(budgetForm);

      // Crear un nuevo presupuesto
      const newPresupuesto = {
        name: this.budgetForm2.get('name')?.value,
        phone: this.budgetForm2.get('phone')?.value,
        email: this.budgetForm2.get('email')?.value,
        services: selectedServices,
        totalPrice: totalPrice
      };

      // Agregar el nuevo presupuesto al array
      this.BudgetService.addPresupuesto(newPresupuesto);
      console.log(newPresupuesto)

    } else {
      console.log('Form is invalid');
    }
  }




}
