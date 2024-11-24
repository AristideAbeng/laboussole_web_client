import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Expert } from '../Models/expert';
import { ExpertServiceService } from '../services/expert-service.service';
import { Firestore, collection, query, where, collectionData,orderBy } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-expert-dashboard-panel-home',
  templateUrl: './expert-dashboard-panel-home.component.html',
  styleUrls: ['./expert-dashboard-panel-home.component.scss']
})
export class ExpertDashboardPanelHomeComponent {
  userName: string="";
  date?: Date;
  d!:string;
  totalgains:any;

  @Input() exp_id:any;

  @Output() privateMessageEvent = new EventEmitter<any>();
  @Output() groupMessageEvent = new EventEmitter<any>();

  groupChats: Array<any> = [];
  privateChats:Array<any> = [];
  privateChatsLastMessage:Array<any> = [];
  groupChatsLastMessage:Array<any> = [];
  private firestore: Firestore;
  private chatsMap = new Map<string,any>();

  constructor(private expertService:ExpertServiceService,private expertRoute:ActivatedRoute,
    private mfirestore: Firestore, private router:Router,private userService:UserServiceService){
    this.firestore = mfirestore;
 
  }

  ngOnInit(){
    this.d =  this.date ? this.date.toLocaleDateString() : new Date().toLocaleDateString();
    let res:string | null = localStorage.getItem('is_expert');
    this.exp_id = this.expertRoute.snapshot.paramMap.get('expert_id');

    if(res == 'yes'){
      this.expertService.getExpertInfo(this.exp_id).subscribe(
        (data: any)=>{
          console.log(data);
          let expert:Expert = data as Expert;
          console.log(expert);
          this.userName = expert.nom;
          this.totalgains = expert.montant_commission;
        },
        (error: any)=>{
          console.error(error);
          this.router.navigateByUrl("/expert-login");
        }
      )

      let p_id:any = localStorage.getItem('expert_id');
    p_id = Number(p_id)
    const participantId =  p_id // Replace with the actual participant ID
      this.getGroupChatsByParticipant(participantId).subscribe((groupChats: any) => {
        console.log('****************Group Chats**************************')
        this.groupChats=groupChats;
        console.log(this.groupChats);
        let user_id:any = localStorage.getItem('user_id');
        console.log("user id is ",user_id);
        for(let pc of this.groupChats){
          this.chatsMap.set(pc.id,pc)
          let standChat:any;
          let membs = pc.Participants;
          console.log(membs);
          let last_message = pc.message_list[0];
          console.log("last group message id is",pc.id);

          const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
          // Create Date object
          const date = new Date(milliseconds);

          console.log("date is ",date)
          console.log(pc.Nom);
          this.groupChatsLastMessage.push({
            name:pc.Nom,
            content:last_message.content,
            date:date,
            id:pc.id
          });
        }
        console.log(this.privateChats);

      });
      this.getPrivateChatsByParticipant(participantId).subscribe((privateChats: any) => {
        console.log('****************Private Chats**************************')
        this.privateChats = privateChats;
        let standardisedChats:Array<any> = [];
        let user_id:any = localStorage.getItem('user_id');
        console.log("user id is ",user_id);
        for(let pc of this.privateChats){
          this.chatsMap.set(pc.id,pc)
          let standChat:any;
          let membs = pc.Membres;
          let recipient_id:any;
          if(membs[0]==user_id){
            
            recipient_id = membs[1];
            console.log("recipient id is ",recipient_id)
          }else{
            recipient_id=membs[0];
          }
          console.log(membs);
          let last_message = pc.message_list[0];
          console.log("last group message id is",pc.id);

          const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
          // Create Date object
          const date = new Date(milliseconds);

          console.log("date is ",date)

          this.userService.getUserNameById(recipient_id).subscribe((name:any)=> {
            this.privateChatsLastMessage.push({
              name:name.username,
              content:last_message.content,
              date:date,
              id:pc.id
            });

            console.log("last message private chats ",this.privateChatsLastMessage)
          },
          (error: any)=>{
            console.error(error);
          }
          )
        }
        console.log(this.privateChats);
      });
     
    }

    const date = this.date ? this.date.toLocaleDateString() : new Date().toLocaleDateString();
    const greeting = `Welcome sur votre tableau de bord ${this.userName}!`;

    
  }

  getGroupChatsByParticipant(participantId: number): Observable<any[]> {
    const groupChatsRef = collection(this.firestore, 'groupChats');
    const q = query(
      groupChatsRef,
      where('Participants', 'array-contains', participantId),
      orderBy('last_message_date_sent', 'desc') // Adds ordering by last_message_date_sent in descending order
    );
    return collectionData(q, { idField: 'id' });
  }

  getPrivateChatsByParticipant(participantId: number): Observable<any[]> {
    const privateChatsRef = collection(this.firestore, 'privateChats');
    const q = query(
      privateChatsRef,
      where('Membres', 'array-contains', participantId),
      orderBy('last_message_date_sent', 'desc') // Adds ordering by last_message_date_sent in descending order
    );
    return collectionData(q, { idField: 'id' });
  }

  privateMessageClicked(e:any){
    console.log("private message clicked with id",e)
    this.privateMessageEvent.emit(this.chatsMap.get(e));
    
  }

  groupMessageClicked(e:any){
    console.log("group message clicked with id",e)
    this.groupMessageEvent.emit(this.chatsMap.get(e));
  }
}
