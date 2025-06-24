import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputTextComponent } from '../../../shared/components/input-text/input-text.component';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { LinkStackService } from '../../../services/link-stack.service';

@Component({
    selector: 'app-login',
    imports: [ButtonComponent, InputTextComponent, RouterModule, DialogComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    //1 as
    //0 admin
    private email: string = '';
    private password: string = '';
    showDialog: boolean = false;
    dialogMessage: string = 'Email and password are required';
    constructor(private adminService: AdminService, private router: Router, private linkStack: LinkStackService) {}

    onEmailChange(email: string) {
        this.email = email;
    }

    onPasswordChange(password: string) {
        this.password = password;
    }
    login() {
        if (this.email && this.password) {
            this.adminService.login(this.email, this.password).subscribe({
                next: (response) => {
                    if (response.token) {
                        this.adminService.guardarToken(response.token);
                        this.router.navigate(['/log']);
                        this.linkStack.clear();
                    }
                },
                error: (error) => {
                    this.dialogMessage = 'El inicio de sesion falló. Intentelo de nuevo.'; // Mensaje de error
                    this.showDialog = true;
                    console.error('Login failed', error);
                },
            });
        } else {
            this.dialogMessage = 'El correo y la contraseña son requeridos';
            this.showDialog = true;
        }
    }
}
