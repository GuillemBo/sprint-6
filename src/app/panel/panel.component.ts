import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent{

  counterSignalPages = signal(0)
  counterSignalLanguages = signal(0)

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
