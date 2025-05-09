import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputTextComponent } from "../../../shared/components/input-text/input-text.component";
import { AdminService } from '../../../services/admin.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    InputTextComponent,
    ConfirmDialogComponent,
    CommonModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  id: string = '';
  private name: string = '';
  private lastName: string = '';
  private email: string = '';
  private password: string = '';
  private confirmPassword: string = '';
  showNewUser: boolean = false;
  
  constructor(private adminService: AdminService) {}

  onIdChange(id: string) {
    this.id = id;
  }

  onNameChange(name: string) {
    this.name = name;
  }

  onLastNameChange(lastName: string) {
    this.lastName = lastName;
  }

  onEmailChange(email: string) {
    this.email = email;
  }

  onPasswordChange(password: string) {
    this.password = password;
  }

  onConfirmPasswordChange(confirmPassword: string) {
    this.confirmPassword = confirmPassword;
  }

  addUser() {
    if(this.id !== '' && this.name !== '' && this.lastName !== '' &&
        this.email !== '' && this.password !== '' &&
        this.confirmPassword !== ''){
    this.showNewUser = true;
  }
}

  onRegister(confirmed: boolean) {
    this.showNewUser = false;
    if (!confirmed) {
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }else{
      this.name = this.name.trim();
      this.lastName = this.lastName.trim();
      this.email = this.email.trim();
      this.password = this.password.trim();
      const fullName = this.name + ' ' + this.lastName;
      const newUser = {
        id: this.id,
        nombre: fullName,
        correo: this.email,
        contrasena: this.password,
        rol: "1" // 1 = Asistente, 2 = Administrador
      }
      this.adminService.addUser(newUser).subscribe((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log('Usuario registrado correctamente');
        }else{
          console.log('Error al registrar el usuario');
        }
      });
    }

  }
}
