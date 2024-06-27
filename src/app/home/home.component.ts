import { Budget } from './../models/budget';
import { BudgetService } from './../services/budget.service';
import { Component, Input, OnInit, signal} from '@angular/core';
import { WelcomeComponent} from '../welcome/welcome.component';;
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  @Input() budgets: Budget[] = [];
  budgetForm: FormGroup = new FormGroup({});
  totalPrice = 0


  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
   this.budgets = this.budgetService.getServices()

    this.budgets.forEach(budget => {
      this.budgetForm.addControl(budget.controlName, new FormControl(false));
    });

    this.budgetForm.valueChanges.subscribe(values => {
      console.log(values);
      this.calculateTotalPrice();
    });

  }


  calculateTotalPrice() {
    this.totalPrice = this.budgets
      .filter(budget => this.budgetForm.get(budget.controlName)?.value)
      .reduce((total, Budget) => total + Budget.price, 0);
  }
}
