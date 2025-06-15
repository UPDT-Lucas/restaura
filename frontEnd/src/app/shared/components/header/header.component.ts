import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { LinkStackService } from '../../../services/link-stack.service';
import { LogService } from '../../../services/log.service';

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

  constructor(
    private adminService: AdminService,
    private linkStackService: LinkStackService,
    private router: Router,
    private logService: LogService
  ) { }

  ngOnInit() {
    const token = this.adminService.obtenerToken();
    if (token) {
      this.decodedToken = this.adminService.decodeToken(token);
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('No token found');
    }
  }

  clearDate(){
    this.logService.removeSavedDate(); 
  }
  

  goBack() {
    const currentUrl = this.router.url;
    let lastPage = this.linkStackService.popLink();
    if (lastPage === currentUrl) {
      lastPage = this.linkStackService.popLink();
    }
    if (lastPage) {
      this.router.navigate([lastPage]);
    } else {
      this.router.navigate(['/log']);
    }
  }
}
