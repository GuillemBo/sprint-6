import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
