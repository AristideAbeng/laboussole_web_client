import { Component, Input,OnInit} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Faculte } from 'src/app/Models/faculte';
import { Metier } from 'src/app/Models/metier';
import { Universite } from 'src/app/Models/universite';

@Component({
  selector: 'app-offre-formation-box',
  templateUrl: './offre-formation-box.component.html',
  styleUrls: ['./offre-formation-box.component.scss']
})
export class OffreFormationBoxComponent {

  @Input() metierBox!: Metier;

  ngOnInit(){
    //console.log(this.metierBox.nom)
    //console.log(this.metierBox.images_pc)
   // console.log(this.metierBox.logo)
    let im:string | null = this.convertDriveLinkToDirectDownloadLink(this.metierBox.logo);
    //console.log(im)
    this.metierBox.logo=im?im:this.metierBox.logo;
    //console.log(this.metierBox.logo)
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
    // Check if the provided link matches the Google Drive direct download link pattern
   
}
}
