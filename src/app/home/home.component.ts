import { Component, Input} from '@angular/core';
import { WelcomeComponent} from '../welcome/welcome.component';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @Input() budgets: Budget[] = [];
}

