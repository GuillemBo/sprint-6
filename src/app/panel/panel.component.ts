import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent{

  @Input() counterSignalPages!: WritableSignal<number>;
  @Input() counterSignalLanguages!: WritableSignal<number>;

  @Output() counterSignalPagesChange = new EventEmitter<number>();
  @Output() counterSignalLanguagesChange = new EventEmitter<number>();

  constructor() {}

  incrementPages() {
    this.counterSignalPages.set(this.counterSignalPages() + 1)
    this.counterSignalPagesChange.emit(this.counterSignalPages());
  }

  decrementPages() {
    if(this.counterSignalPages() > 1)
      this.counterSignalPages.set(this.counterSignalPages() - 1)
      this.counterSignalPagesChange.emit(this.counterSignalPages());
    }

  incrementLanguages(){
    this.counterSignalLanguages.set(this.counterSignalLanguages() + 1)
    this.counterSignalLanguagesChange.emit(this.counterSignalLanguages());
  }

  decrementLanguages(){
    if (this.counterSignalLanguages() > 1) {
      this.counterSignalLanguages.set(this.counterSignalLanguages() - 1)
      this.counterSignalLanguagesChange.emit(this.counterSignalLanguages());
    }
  }

}
