import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [],
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.css'
})
export class DahsboardComponent {
  authServie = inject(AuthService);

  logout() {
    this.authServie.logOut();
  }
}
