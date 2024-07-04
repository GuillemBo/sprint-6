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
      name:  ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("[0-9 ]{12}")]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.BudgetService.pressupostos.push();
    console.log(this.BudgetService.pressupostos);
  }

  onSubmit() {
    if (this.budgetForm2.valid) {
      console.log(this.budgetForm2.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
