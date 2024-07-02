import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent{

  @Input() counterSignalPages = signal(1)
  @Input() counterSignalLanguages = signal(1)

  @Output() counterSignalPagesChange = new EventEmitter<number>();
  @Output() counterSignalLanguagesChange = new EventEmitter<number>();

  constructor(private budgetService: BudgetService) {}

  incrementPages() {
    this.counterSignalPages.set(this.counterSignalPages() + 1)
  }

  decrementPages() {
    if(this.counterSignalPages() > 0)
      this.counterSignalPages.set(this.counterSignalPages() - 1)
    }

  incrementLanguages(){
    this.counterSignalLanguages.set(this.counterSignalLanguages() + 1)
  }

  decrementLanguages(){
    if (this.counterSignalLanguages() > 0) {
      this.counterSignalLanguages.set(this.counterSignalLanguages() - 1)
    }
  }

}
