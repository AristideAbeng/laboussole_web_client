import { Component, ElementRef, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Notification } from '../Models/notification';
import { NotificationsService } from '../services/notifications.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-details-notifications',
  templateUrl: './details-notifications.component.html',
  styleUrls: ['./details-notifications.component.scss']
})
export class DetailsNotificationsComponent {

  currentNotification!:Notification;
  bannerImage:string = "";
  statut:string = "";

  contentHtml:string = "";
  hideAll:boolean = false;
  pdfSrc:any = '';
  isPdf:boolean = false;

  constructor(private notificationsService:NotificationsService,private domSanitizer:DomSanitizer,
    private elementRef: ElementRef,
    private userService:UserServiceService){

  }

  ngOnInit(){
    this.fetchNotification();
  }

  fetchNotification(){
    this.notificationsService.getNotificationById(this.notificationsService.currentNotificationId).subscribe(
      (data:any)=>{
        console.log(data);
        this.currentNotification = data as Notification
        this.bannerImage =this.currentNotification.image_pc;
        this.contentHtml = `${this.currentNotification.contenu}`;
        this.statut = data.statut;
        console.log(this.statut);
        if(this.statut=='pdf'){
          this.isPdf=true;
          this.pdfSrc=data.image_telephone
        }
        if(!this.userService.user_email){
          const fortyPercentElement:HTMLDivElement = this.elementRef.nativeElement.querySelector('#blurMark1');
          fortyPercentElement.style.filter = 'blur(7.5px)';
          this.hideAll=true;
        }else{
          this.hideAll=false;
        }
      }
    )
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

}
