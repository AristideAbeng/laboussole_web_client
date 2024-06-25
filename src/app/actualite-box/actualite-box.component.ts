import { Component,Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-actualite-box',
  templateUrl: './actualite-box.component.html',
  styleUrls: ['./actualite-box.component.scss']
})
export class ActualiteBoxComponent {
@Input() image:string = ""
@Input() date:string = ""
@Input() title:string = ""
@Input() description:string = ""
@Input() tags:string = ""

descriptionHtml:any;


constructor(private sanitizer: DomSanitizer,){

}

ngOnInit(){
  
}
ngDoCheck(){
  this.descriptionHtml= this.sanitizeHTML(this.description)
}
convertDriveLinkToDirectDownloadLink(driveLink: string): string | null {
  if(driveLink){
    const regexDirectDownload = /https:\/\/drive\.google\.com\/thumbnail\?&id=([^/]+)/;
    const matchDirectDownload = driveLink.match(regexDirectDownload);

    if (matchDirectDownload && matchDirectDownload.length === 2) {
        // The link is already in the desired format, return it as is
        return driveLink;
    }

    // Check if the provided link matches the Google Drive file link pattern
    const regexFileLink = /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view\?usp=sharing/;
    const matchFileLink = driveLink.match(regexFileLink);

    if (matchFileLink && matchFileLink.length === 2) {
        const fileId = matchFileLink[1];
        const directDownloadLink = `https://drive.google.com/thumbnail?&id=${fileId}`;
        return directDownloadLink;
    } else {
        //console.error("Invalid Google Drive shareable link format.");
        return null;
    }
  }else{
    return null;
  }
}

 // Method to sanitize HTML content
 sanitizeHTML(htmlContent: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
}
}
