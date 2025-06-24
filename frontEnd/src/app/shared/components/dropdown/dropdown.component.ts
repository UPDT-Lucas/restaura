import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { LinkStackService } from '../../../services/link-stack.service';

@Component({
    selector: 'shared-dropdown',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
    constructor(private adminService: AdminService, private router: Router, private linkStack: LinkStackService) {}

    isOpen = false;

    @ViewChild('menu') menuRef!: ElementRef;
    @ViewChild('toggle') toggleRef!: ElementRef;

    toggleDropdown() {
        this.isOpen = !this.isOpen;

        this.linkStack.clear();
    }

    @Input()
    token: any;

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
        const clickedInsideMenu = this.menuRef?.nativeElement.contains(event.target);
        const clickedToggle = this.toggleRef?.nativeElement.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            this.isOpen = false;
        }
    }

    leave() {
        this.adminService.logout();
        this.router.navigate(['/']);
    }
}
