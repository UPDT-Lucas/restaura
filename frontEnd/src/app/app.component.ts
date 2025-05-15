import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaura-app'; 
  showHeader = false;

  constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const hiddenRoutes = ['/', '/register']; // '' para login
      this.showHeader = !hiddenRoutes.includes(event.urlAfterRedirects);
    });
  }
}
