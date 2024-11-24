import { Component, Input } from '@angular/core';
import { addDoc, collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Firestore } from "@angular/fire/firestore"; // Make sure Firestore is properly imported
import { UserServiceService } from '../services/user-service.service';
import {ExpertServiceService} from '../services/expert-service.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-expert',
  templateUrl: './chat-expert.component.html',
  styleUrls: ['./chat-expert.component.scss']
})
export class ChatExpertComponent {

  id_expert:any;
  chat_id:any;
  chat_details:any;
  expert_Name:any;
  

  constructor(private userService:UserServiceService, private router:Router,
    private firestore: Firestore,private route:ActivatedRoute,private expertService:ExpertServiceService){
      this.id_expert = this.route.snapshot.paramMap.get('expert_id');
    }


    getPrivateChatByParticipants(participantId1: number, participantId2: number): Observable<any[]> {
      const privateChatsRef = collection(this.firestore, 'privateChats');
    
      // Query for chats containing participantId1
      const q = query(
        privateChatsRef,
        where('Membres', 'array-contains', participantId1),
        orderBy('last_message_date_sent', 'desc') // Order by last_message_date_sent
      );
    
      return from(getDocs(q)).pipe(
        switchMap((querySnapshot) => {
          // Filter to check if Membres contains both participantId1 and participantId2
          const filteredChats = querySnapshot.docs.filter((doc) => {
            const membres = doc.data()['Membres'] || [];
            return membres.includes(participantId2); // Check for participantId2
          });
    
          if (filteredChats.length === 0) {
            // No chat exists, create a new one
            const newChat = {
              Membres: [participantId1, participantId2],
              last_message_date_sent: Timestamp.now(),
              message_list: [] // Empty message list initially
            };
    
            // Add the new chat document to Firestore
            return from(addDoc(privateChatsRef, newChat)).pipe(
              switchMap((docRef) => {
                // Return the newly created document as an observable with the ID
                return of([{ id: docRef.id, ...newChat }]);
              })
            );
          } else {
            // If a chat exists, map the filtered results to an array
            const existingChats = filteredChats.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            return of(existingChats); // Return as an observable
          }
        })
      );
    }
    
  ngOnInit(){
    let user_id = localStorage.getItem("user_id")
    let u_id = Number(user_id)
    let e_id = Number(this.id_expert)
    this.expertService.getExpertInfo(e_id).subscribe(
      (res:any)=>{
        console.log(res)
        this.expert_Name = res.Nom
      }
    )
    console.log(user_id);
    console.log(this.id_expert);
    this.getPrivateChatByParticipants(u_id,e_id).subscribe(
      (data:any)=>{
        console.log(data[0].id)
        this.chat_id=data[0].id;
        this.chat_details=data[0];

      }
    )
  }

  goBackToExpertList(){
    this.router.navigateByUrl("consulter-expert")
  }
    
}
