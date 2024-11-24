import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Expert } from '../Models/expert';
import { ExpertServiceService } from '../services/expert-service.service';
import { Firestore, collection, query, where, collectionData,orderBy } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { ChatMessagesService } from '../services/chat-messages.service';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent {

  enter_discussion:boolean=false;
  groupChats: Array<any> = [];
  privateChats:Array<any> = [];
  privateChatsLastMessage:Array<any> = [];
  groupChatsLastMessage:Array<any> = [];
  AllChatsLastMessage:Array<any> = [];
  displayedMessages:Array<any> = [];
  private firestore: Firestore;
  total_unread:number=0;
  iterable_map = new Map<string,any>();

  chat_id:any;

  private chatsMap = new Map<string,any>();
 

  backToList(e:any){
    this.enter_discussion=false;
    this.chatMessage.enterChat=false;
    this.reinitialiseMessages();
  }
  
  reinitialiseMessages(){
    this.groupChats=[];
    this.privateChats=[];
    this.privateChatsLastMessage=[];
    this.groupChatsLastMessage = [];
    this.AllChatsLastMessage= [];
    this.displayedMessages = [];
    this.total_unread=0;
    let p_id:any = localStorage.getItem('expert_id');
    p_id = Number(p_id)
    const participantId =  p_id// Replace with the actual participant ID
    this.getGroupChatsByParticipant(participantId).subscribe((groupChats: any) => {
      this.groupChatsLastMessage = [];
      console.log('****************Group Chats**************************')
      this.groupChats=groupChats;
      console.log(this.groupChats);
      let user_id:any = localStorage.getItem('user_id');
      console.log("user id is ",user_id);
      for(let pc of this.groupChats){
        this.chatsMap.set(pc.id,pc);
        let standChat:any;
        let membs = pc.Participants;
        console.log(membs);
        let last_message = pc.message_list[pc.message_list.length-1];

        console.log("last group message id is",pc.id);

        const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
        // Create Date object
        const date = new Date(milliseconds);

        console.log("date is ",date)
        console.log(pc.Nom);
        let current_chat_messages = pc.message_list;
        let last_read_message_time_str = localStorage.getItem(pc.id);
        let last_read_message_time = new Date(1990, 0, 1);

        let unread_msgs_in_current_chat:number=0;
        if(last_read_message_time_str){
          last_read_message_time = new Date(last_read_message_time_str)
        }

        for(let msg of current_chat_messages){
          let millis = msg.date_sent.seconds * 1000 + msg.date_sent.nanoseconds / 1e6;
          let msgDate = new Date(millis);

          if(last_read_message_time.getTime()<msgDate.getTime()){
            unread_msgs_in_current_chat+=1;
          }
        }
        this.total_unread+=unread_msgs_in_current_chat;
        this.groupChatsLastMessage.push({
          name:pc.Nom,
          content:last_message.content,
          date:date,
          id:pc.id,
          unread:unread_msgs_in_current_chat
        });
        const existingChat = this.AllChatsLastMessage.find(chat => chat.id === pc.id);

        if (!existingChat) {
          this.AllChatsLastMessage.push({
            name: pc.Nom,
            content: last_message.content,
            date: date,
            id: pc.id,
            private: true,
            unread: unread_msgs_in_current_chat
          });
        }
        this.displayedMessages=this.AllChatsLastMessage;

      }

    });

    this.getPrivateChatsByParticipant(participantId).subscribe((privateChats: any) => {
      this.privateChatsLastMessage = [];
      console.log('****************Private Chats**************************')
      this.privateChats = privateChats;
      let standardisedChats:Array<any> = [];
      let expert_id:any = localStorage.getItem('expert_id');
      console.log("expert id is ",expert_id);
      for(let pc of this.privateChats){
        this.chatsMap.set(pc.id,pc);
        let standChat:any;
        let membs = pc.Membres;
        let recipient_id:any;
        console.log("membs 0 is "+membs[0])
        if(membs[0]==expert_id){
          recipient_id = membs[1];
          console.log("recipient id is ",recipient_id)
        }else if(membs[1]==expert_id){
          recipient_id = membs[0];
          console.log("recipient id is ",recipient_id)
        }
        console.log(membs);
        let last_message = pc.message_list[pc.message_list.length-1];
        console.log("last group message id is",pc.id);

        const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
        // Create Date object
        const date = new Date(milliseconds);

        console.log("date is ",date)

        let current_chat_messages = pc.message_list;
        let last_read_message_time_str = localStorage.getItem(pc.id);
        let last_read_message_time = new Date(1990, 0, 1);

        let unread_msgs_in_current_chat:number=0;
        if(last_read_message_time_str){
          last_read_message_time = new Date(last_read_message_time_str)
        }

        for(let msg of current_chat_messages){
          let millis = msg.date_sent.seconds * 1000 + msg.date_sent.nanoseconds / 1e6;
          let msgDate = new Date(millis);

          if(last_read_message_time.getTime()<msgDate.getTime()){
            unread_msgs_in_current_chat+=1;
          }
        }
        this.total_unread+=unread_msgs_in_current_chat;
        this.userService.getUserNameById(recipient_id).subscribe((name:any)=> {
          this.privateChatsLastMessage.push({
            name:name.username,
            content:last_message.content,
            date:date,
            id:pc.id,
            unread:unread_msgs_in_current_chat
          });
          this.iterable_map.set(pc.id,{
            name:name.username,
            content:last_message.content,
            date:date,
            id:pc.id,
            private:true,
            unread:unread_msgs_in_current_chat
          });
          const existingChat = this.AllChatsLastMessage.find(chat => chat.id === pc.id);

if (!existingChat) {
  this.AllChatsLastMessage.push({
    name: name.username,
    content: last_message.content,
    date: date,
    id: pc.id,
    private: true,
    unread: unread_msgs_in_current_chat
  });
}

          console.log("last message private chats ",this.privateChatsLastMessage)
        },
        (error: any)=>{
          console.error(error);
        }
        )
      }
      console.log(this.privateChats);
    });
    this.displayedMessages=this.AllChatsLastMessage;

  }

  constructor(private expertRoute:ActivatedRoute,private mfirestore: Firestore, private router:Router,
    private userService:UserServiceService, public chatMessage:ChatMessagesService){
    this.firestore = mfirestore;
    
  }
  ngOnInit(){ 

    this.reinitialiseMessages();
  }

  enterDiscussion(e:any){
    this.chat_id=e;
    this.enter_discussion = true;
    console.log(e);
    let chat:any = this.chatsMap.get(e);
    this.chatMessage.messages=chat
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
  getPrivateChatsFor2ParticipantsOrCreate(participantId1: number, participantId2: number): Observable<any[]> {
    const privateChatsRef = collection(this.firestore, 'privateChats');
    
    const q = query(
      privateChatsRef,
      where('Membres', 'array-contains', participantId1),  // Check for participantId1
      where('Membres', 'array-contains', participantId2),  // Check for participantId2
      orderBy('last_message_date_sent', 'desc')           // Order by 'last_message_date_sent' in descending order
    );
  
    return collectionData(q, { idField: 'id' });
  }
  filterUnreadMessages(allLastMessageArray: any[]): any[] {
    return allLastMessageArray.filter(chat => chat.unread > 0);
  }
  

  displayOnlyPrivate(e:any){
    if(e){
      this.displayedMessages=this.privateChatsLastMessage;
    }else{
      this.displayedMessages=this.AllChatsLastMessage;
    }
    
  }
  displayOnlyGroup(e:any){
    if(e){
      this.displayedMessages=this.groupChatsLastMessage;
    }else{
      this.displayedMessages=this.AllChatsLastMessage;
    }
  }
  onUnreadMessageFilter(e:any){
    this.displayedMessages = this.filterUnreadMessages(this.AllChatsLastMessage);
  }
  onGroupMessageFilter(e:any){
    if(e){
      this.displayedMessages=this.groupChatsLastMessage;
    }else{
      this.displayedMessages=this.AllChatsLastMessage;
    }
  }
  onPrivateMessageFilter(e:any){
    if(e){
      this.displayedMessages=this.privateChatsLastMessage;
    }else{
      this.displayedMessages=this.AllChatsLastMessage;
    }
  }
  onAllMessagesFilter(e:any){
    this.displayedMessages=this.AllChatsLastMessage;
  }
  onFavorisMessageFilter(e:any){

  }

  
}

interface Message {
  name: string;
  preview: string;
  time: string;
  favorite: boolean;
}
