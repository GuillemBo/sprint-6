import { Budget } from './../models/budget';
import { BudgetService } from './../services/budget.service';
import { Component, Input, OnInit, Signal, signal} from '@angular/core';
import { WelcomeComponent} from '../welcome/welcome.component';;
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  budgets: Budget[] = [];
  budgetForm: FormGroup;
  totalPrice = 0;

  counterSignalPages: Signal<number>;
  counterSignalLanguages: Signal<number>;


  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({});
    this.counterSignalPages = new Signal<number>(1); // Inicialización con valor inicial 1
    this.counterSignalLanguages = new Signal<number>(1);
  }

  ngOnInit(): void {
    this.budgets = this.budgetService.getServices();

    this.budgets.forEach(budget => {
      this.budgetForm.addControl(budget.controlName, this.fb.control(false));
    });

    this.budgetForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }


  calculateTotalPrice(): void {
    this.totalPrice = this.budgetService.calculateTotalPrice(this.budgetForm)
    this.totalPrice += this.budgetService.calculateExtraCost(this.counterSignalPages(), this.counterSignalLanguages());
  }


}
