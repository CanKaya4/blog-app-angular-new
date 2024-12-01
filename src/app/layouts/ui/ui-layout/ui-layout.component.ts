import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ui-layout',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './ui-layout.component.html',
  styleUrl: './ui-layout.component.css'
})
export class UiLayoutComponent {

}
