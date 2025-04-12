import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'shared-dropdown',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
    isOpen = false;

    @ViewChild('menu') menuRef!: ElementRef;
    @ViewChild('toggle') toggleRef!: ElementRef;

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
        const clickedInsideMenu = this.menuRef?.nativeElement.contains(event.target);
        const clickedToggle = this.toggleRef?.nativeElement.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            this.isOpen = false;
        }
    }
}
