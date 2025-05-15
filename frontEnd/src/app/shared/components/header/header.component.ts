import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'shared-header',
  imports: [
    DropdownComponent,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  decodedToken: any;

  constructor(private adminService: AdminService){}

  ngOnInit() {
    const token = this.adminService.obtenerToken();
    if (token) {
      this.decodedToken = this.adminService.decodeToken(token);
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('No token found');
    }
  }
}
