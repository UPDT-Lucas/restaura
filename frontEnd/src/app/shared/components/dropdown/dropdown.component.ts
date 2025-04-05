import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  @ViewChild('menu')
  menu!: ElementRef;

  @ViewChild('toggle')
  toggle!: ElementRef;
  
  isOpen: boolean =  false;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e:Event) => {
      if(!this.menu) return;
      if(!this.menu.nativeElement.contains(e.target) && !this.toggle.nativeElement.contains(e.target)) {
          this.isOpen=false;
      }
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
