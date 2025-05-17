import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    InputTextComponent,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
}) 
export class LoginComponent {
  //1 as
  //0 admin
  private email: string = '';
  private password: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  onEmailChange(email: string) {
    this.email = email;
  }

  onPasswordChange(password: string) {
    this.password = password;
  }

  login() {
    if (this.email !== '' && this.password !== '') {
      this.adminService.login(this.email, this.password).subscribe(
        (response) => {
          if (response.token) {
            this.adminService.guardarToken(response.token);
            this.router.navigate(['/log']);
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.error('Email and password are required');
    }
  }
}
