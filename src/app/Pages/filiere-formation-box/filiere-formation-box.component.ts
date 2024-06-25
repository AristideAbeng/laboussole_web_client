import { Component, Input, OnInit } from '@angular/core';
import { Faculte } from 'src/app/Models/faculte';
import { Universite } from 'src/app/Models/universite';

@Component({
  selector: 'app-filiere-formation-box',
  templateUrl: './filiere-formation-box.component.html',
  styleUrls: ['./filiere-formation-box.component.scss']
})
export class FiliereFormationBoxComponent {
  @Input() formationBox!: Universite | Faculte;

  ngOnInit(){
    //console.log(this.formationBox.nom)
    //console.log(this.formationBox.images_pc)

    //console.log("IS FORMATION BOX INSTANCE OF FACULTE");
    //console.log((this.formationBox as Faculte).universite);
    

    if((this.formationBox as Faculte).universite){
      let im:string | null = this.convertDriveLinkToDirectDownloadLink(this.formationBox.images_pc);
     // console.log("-----------------------LOGGING FROM FACULTE----------------------------------")
     // console.log(im)
      this.formationBox.logo=im?im:this.formationBox.images_pc;
     // console.log(this.formationBox.logo)
    }else{
      let im:string | null = this.convertDriveLinkToDirectDownloadLink(this.formationBox.logo);
      //console.log(im)
      this.formationBox.logo=im?im:this.formationBox.logo;
      //console.log(this.formationBox.logo)
    }

   
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
