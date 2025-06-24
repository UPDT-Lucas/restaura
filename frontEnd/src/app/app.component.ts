import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LinkStackService } from './services/link-stack.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'restaura-app';
    showHeader = false;

    constructor(private router: Router, private linkStack: LinkStackService) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            const url = event.urlAfterRedirects;

            // Mostrar u ocultar el header
            const hiddenRoutes = ['/', '/register'];
            this.showHeader = !hiddenRoutes.includes(url);

            // Evitar duplicado consecutivo en la pila
            const last = this.linkStack.peekLink();
            const hasTypeResponseParam = url.includes('type-response=');

            if (!hasTypeResponseParam && last !== url) {
                this.linkStack.pushLink(url);
            }
            console.log('Pila de enlaces actualizada:', this.linkStack.getStackObject());
        });
    }
}
