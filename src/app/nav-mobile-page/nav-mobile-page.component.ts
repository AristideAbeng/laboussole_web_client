import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-mobile-page',
  templateUrl: './nav-mobile-page.component.html',
  styleUrls: ['./nav-mobile-page.component.scss']
})
export class NavMobilePageComponent {

  @Output() menuIconClicked = new EventEmitter<void>();

  showDropdown = false;
  showSearchBar = false;
  // Call this method when you want to close the menu
  closeMenu() {
    this.menuIconClicked.emit();
  }
}
