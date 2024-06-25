import { Component, OnInit,Renderer2} from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;

  isLoggedIn:boolean=false;

  currentProfileNumber:number=0;

  constructor(private renderer: Renderer2){
    
  }
  
  ngOnInit(){
    window.scrollTo(0,0);
    this.enableScroll();
  }
  nextImage(){
    this.currentProfileNumber = (this.currentProfileNumber+1)%9;
  }
  prevImage(){
    if(this.currentProfileNumber==0){
      this.currentProfileNumber=9;
    }
    this.currentProfileNumber--;
  }
  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }

  enableScroll(): void {
    // Retrieve the scroll position from the body's top style property
    const scrollY = parseInt(document.body.style.top || '0', 10);
  
    // Remove the applied CSS to enable scrolling
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'position');
    this.renderer.removeStyle(document.body, 'top');
  
    // Restore the scroll position
    window.scrollTo(0, Math.abs(scrollY));
  }

}
