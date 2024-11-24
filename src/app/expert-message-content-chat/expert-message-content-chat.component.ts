


import { Component, EventEmitter, Input, Output,OnChanges, SimpleChanges  } from '@angular/core';
import { ChatMessagesService } from '../services/chat-messages.service';
import { UserServiceService } from '../services/user-service.service';
import { Firestore, doc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore'; // Firebase Timestamp
import { onSnapshot } from "firebase/firestore";
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-expert-message-content-chat',
  templateUrl: './expert-message-content-chat.component.html',
  styleUrls: ['./expert-message-content-chat.component.scss']
})
export class ExpertMessageContentChatComponent {

  @Input() chat_id:any;
  @Input() input_chat_details:any;
  @Input() privateChatName:any;

  downloadURL: string | null = null;

  messages:Array<any> = [];


  ffmpeg: any;
  audioURL: string | null = null;


  @Output() backToMessageList = new EventEmitter<string>();

  isGroupChat:boolean=false;


  unsubscribe:any;
  chatDetails:any;
  standardizedMessages:Array<any> = new Array();
  title:string="";

  isRecording = false;

  mediaRecorder: any;
  audioChunks: any[] = [];
  audioBlob: Blob | null = null;

  constructor(private chatMessage:ChatMessagesService,
    private userService:UserServiceService,
    private firestore: Firestore,private storage: Storage){
      
  }

  
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['input_chat_details']) {
        this.chatDetails = this.input_chat_details;
        console.log(this.chatDetails);
      
        if(this.chatDetails.Participants){
          this.isGroupChat=true;
        }
        if(this.chatDetails.Nom){
          this.title = this.chatDetails.Nom
        }else{
          let user_id:any = localStorage.getItem('user_id');
          let membs = this.chatDetails.Membres;
              let recipient_id:any;
              if(membs[0]==user_id){
                
                recipient_id = membs[1];
                console.log("recipient id is ",recipient_id)
              }else{
                recipient_id=membs[0];
              }
              this.userService.getUserNameById(recipient_id).subscribe((name:any)=> {
               this.title = name.username;
              },
              (error: any)=>{
                console.error(error);
              }
              )
        }
        this.messages = this.chatDetails.message_list;
        let last_message = this.messages[this.messages.length-1];
        console.log("**** message_list *************",this.messages)
        console.log("last group message id is",this.chatMessage.chatId);
    
        const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
        // Create Date object
        const date = new Date(milliseconds);
    
        const dateString = date.toISOString();
    
        // Step 2: Save the string in localStorage
        localStorage.setItem(this.chatDetails.id, dateString);
        for(let message of this.messages){
          let txt:string = message.content;
          const milliseconds = message.date_sent.seconds * 1000 + message.date_sent.nanoseconds / 1e6;
          // Create Date object
          const dt = new Date(milliseconds);
          let  timestamp:Date = dt;
    
          let user_id:any = localStorage.getItem('user_id');
          let isSt:boolean=false;
          let isImg:boolean=false;
          let isDocument:boolean=false;
          let isVideo:boolean=false;
          let isAudio:boolean=false;
    
          if(message.fileType.startsWith('image/')){
            isImg=true;
          }else if(message.fileType.startsWith('audio/')){
            isAudio=true;
          }else if(message.fileType.startsWith('video/')){
            isVideo=true;
          }else if(message.fileType != "null"){
            isDocument=true;
          }
    
          if(message.sender){
            isSt = user_id == message.sender;
          }else{
            isSt = user_id == message.sender_id;
          }
    
          
          
          this.standardizedMessages.push(
            {
              text:txt,
              timestamp:timestamp,
              isSent:isSt,
              isImage:isImg,
              imageUrl:message.fileUrl,
              isAudio:isAudio,
              audioUrl:message.fileUrl,
              isVideo:isVideo,
              videoUrl:message.fileUrl,
              isDocument:isDocument,
              documentUrl:message.fileUrl,
              documentName:message.fileName
            }
          )
        }
        console.log("all standardized messages  ",this.standardizedMessages)
  
    }
    if(changes['chat_id']){
      if (this.unsubscribe) {
        this.unsubscribe(); // Unsubscribe from previous listener
    }
      const chatDocRef = doc(this.firestore, `privateChats/${this.chat_id}`);

      console.log("chat id has changed")
      console.log(this.chat_id)
  // Start listening to changes on the document
  this.unsubscribe = onSnapshot(chatDocRef, (doc:any) => {
    console.log("snapshot was triggered")
  if (doc.exists()) {
    console.log('Current document data:', doc.data());
    this.chatDetails = doc.data();
        console.log(this.chatDetails);
      
        if(this.chatDetails.Participants){
          this.isGroupChat=true;
        }
        if(this.chatDetails.Nom){
          this.title = this.chatDetails.Nom
        }else{
          let user_id:any = localStorage.getItem('user_id');
          let membs = this.chatDetails.Membres;
              let recipient_id:any;
              if(membs[0]==user_id){
                
                recipient_id = membs[1];
                console.log("recipient id is ",recipient_id)
              }else{
                recipient_id=membs[0];
              }
              this.userService.getUserNameById(recipient_id).subscribe((name:any)=> {
               this.title = name.username;
              },
              (error: any)=>{
                console.error(error);
              }
              )
        }
        this.messages = this.chatDetails.message_list;
        let last_message = this.messages[this.messages.length-1];
        console.log("**** message_list *************",this.messages)
        console.log("last group message id is",this.chatMessage.chatId);
    
        const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
        // Create Date object
        const date = new Date(milliseconds);
    
        const dateString = date.toISOString();
    
        // Step 2: Save the string in localStorage
        localStorage.setItem(this.chatDetails.id, dateString);
        for(let message of this.messages){
          let txt:string = message.content;
          const milliseconds = message.date_sent.seconds * 1000 + message.date_sent.nanoseconds / 1e6;
          // Create Date object
          const dt = new Date(milliseconds);
          let  timestamp:Date = dt;
    
          let user_id:any = localStorage.getItem('user_id');
          let isSt:boolean=false;
          let isImg:boolean=false;
          let isDocument:boolean=false;
          let isVideo:boolean=false;
          let isAudio:boolean=false;
    
          if(message.fileType.startsWith('image/')){
            isImg=true;
          }else if(message.fileType.startsWith('audio/')){
            isAudio=true;
          }else if(message.fileType.startsWith('video/')){
            isVideo=true;
          }else if(message.fileType != "null"){
            isDocument=true;
          }
    
          if(message.sender){
            isSt = user_id == message.sender;
          }else{
            isSt = user_id == message.sender_id;
          }
    
          
          
          this.standardizedMessages.push(
            {
              text:txt,
              timestamp:timestamp,
              isSent:isSt,
              isImage:isImg,
              imageUrl:message.fileUrl,
              isAudio:isAudio,
              audioUrl:message.fileUrl,
              isVideo:isVideo,
              videoUrl:message.fileUrl,
              isDocument:isDocument,
              documentUrl:message.fileUrl,
              documentName:message.fileName
            }
          )
        }
        console.log("all standardized messages  ",this.standardizedMessages)
  
  } else {
    console.log('Document does not exist!');
  }
  }, (error) => {
    console.error('Error observing document: ', error);
  });
    }
  }

  ngOnInit(){ 

    this.chatDetails = this.chatMessage.messages;
    console.log(this.chatDetails)
    if(!this.chatDetails){
      this.chatDetails = this.input_chat_details;
      console.log(this.chatDetails);
    }
      if(this.chatDetails.Participants){
        this.isGroupChat=true;
      }
      if(this.chatDetails.Nom){
        this.title = this.chatDetails.Nom
      }else{
        let user_id:any = localStorage.getItem('user_id');
        let membs = this.chatDetails.Membres;
            let recipient_id:any;
            if(membs[0]==user_id){
              
              recipient_id = membs[1];
              console.log("recipient id is ",recipient_id)
            }else{
              recipient_id=membs[0];
            }
            this.userService.getUserNameById(recipient_id).subscribe((name:any)=> {
             this.title = name.username;
            },
            (error: any)=>{
              console.error(error);
            }
            )
      }
      this.messages = this.chatDetails.message_list;
      let last_message = this.messages[this.messages.length-1];
      console.log("**** message_list *************",this.messages)
      console.log("last group message id is",this.chatMessage.chatId);
  
      const milliseconds = last_message.date_sent.seconds * 1000 + last_message.date_sent.nanoseconds / 1e6;
      // Create Date object
      const date = new Date(milliseconds);
  
      const dateString = date.toISOString();
  
      // Step 2: Save the string in localStorage
      localStorage.setItem(this.chatMessage.messages.id, dateString);
      for(let message of this.messages){
        let txt:string = message.content;
        const milliseconds = message.date_sent.seconds * 1000 + message.date_sent.nanoseconds / 1e6;
        // Create Date object
        const dt = new Date(milliseconds);
        let  timestamp:Date = dt;
  
        let user_id:any = localStorage.getItem('user_id');
        let isSt:boolean=false;
        let isImg:boolean=false;
        let isDocument:boolean=false;
        let isVideo:boolean=false;
        let isAudio:boolean=false;
  
        if(message.fileType.startsWith('image/')){
          isImg=true;
        }else if(message.fileType.startsWith('audio/')){
          isAudio=true;
        }else if(message.fileType.startsWith('video/')){
          isVideo=true;
        }else if(message.fileType != "null"){
          isDocument=true;
        }
  
        if(message.sender){
          isSt = user_id == message.sender;
        }else{
          isSt = user_id == message.sender_id;
        }
  
        
        
        this.standardizedMessages.push(
          {
            text:txt,
            timestamp:timestamp,
            isSent:isSt,
            isImage:isImg,
            imageUrl:message.fileUrl,
            isAudio:isAudio,
            audioUrl:message.fileUrl,
            isVideo:isVideo,
            videoUrl:message.fileUrl,
            isDocument:isDocument,
            documentUrl:message.fileUrl,
            documentName:message.fileName
          }
        )
      }
      console.log("all standardized messages  ",this.standardizedMessages)

    
  }


  newMessage = '';

  pushMessage(fileUrl:string,fileType:string,fileName:string,isImage:boolean,imageUrl:string,
    isAudio:boolean,audioUrl:string,isVideo:boolean,videoUrl:string,isDocument:boolean,
    documentUrl:string,documentName:string) {
    if (this.newMessage.trim()) {
      let user_id:number = localStorage.getItem('user_id') as unknown as number
      this.standardizedMessages.push({ 
        text: this.newMessage, timestamp: new Date(), isSent: true,
        isImage:isImage,
        imageUrl:imageUrl,
        isAudio:isAudio,
        audioUrl:audioUrl,
        isVideo:isVideo,
        videoUrl:videoUrl,
        isDocument:isDocument,
        documentUrl:documentUrl,
        documentName:documentName
       });
      if(this.isGroupChat){
        this.sendGroupMessage(this.chatDetails.id,this.newMessage,user_id,fileUrl,fileType,fileName)
      }else{
        this.sendPrivateMessage(this.chatDetails.id,this.newMessage,user_id,fileUrl,fileType,fileName)
      }
      
      console.log(this.chatDetails.id)
      this.newMessage = '';

    }
  }

  backToList(){
    this.backToMessageList.emit("back");
  }

  async sendPrivateMessage(chatId: string, message: string, senderId: number,fileUrl:string,fileType:string,fileName:string) {
    const chatDocRef = doc(this.firestore, `privateChats/${chatId}`);

    // Create the new message object
    const newMessage = {
      content: message,
      date_sent: Timestamp.now(),
      sender: senderId,
      fileUrl:fileUrl,
      fileType:fileType,
      fileName:fileName
    };

    try {
      // Update the document by pushing the new message to the message_list array
      await updateDoc(chatDocRef, {
        message_list: arrayUnion(newMessage),
        last_message_date_sent: Timestamp.now(), // Also update the last message time
      });
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }

  async sendGroupMessage(chatId: string, message: string, senderId: number,fileUrl:string,fileType:string,fileName:string) {
    const chatDocRef = doc(this.firestore, `groupChats/${chatId}`);

    // Create the new message object
    const newMessage = {
      content: message,
      date_sent: Timestamp.now(),
      sender: senderId,
      fileUrl:fileUrl,
      fileType:fileType,
      fileName:fileName
    };

    try {
      // Update the document by pushing the new message to the message_list array
      await updateDoc(chatDocRef, {
        message_list: arrayUnion(newMessage),
        last_message_date_sent: Timestamp.now(), // Also update the last message time
      });
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `uploads/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
      
      // Upload the file
      uploadBytes(storageRef, file).then((snapshot) => {
        // Get the download URL
        getDownloadURL(storageRef).then((url) => {
          this.downloadURL = url;
          console.log('File uploaded. Download URL:', url);
          this.newMessage="file sent";
          let isImg:boolean=false;
          let isDocument:boolean=false;
          let isVideo:boolean=false;
          let isAudio:boolean=false;

          if(file.type.startsWith('image/')){
            isImg=true;
          }else if(file.type.startsWith('audio/')){
            isAudio=true;
          }else if(file.type.startsWith('video/')){
            isVideo=true;
          }else if(file.type != "null"){
            isDocument=true;
          }
          this.pushMessage(url,file.type,file.name,isImg,url,isAudio,url,isVideo,url,isDocument,url,file.name);
        });

      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    }
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioURL = URL.createObjectURL(this.audioBlob); // Create a URL for playback
        this.audioChunks = []; // Clear the chunks after the recording is done
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;

      // Stop all tracks of the media stream to release the microphone
      const stream = this.mediaRecorder.stream;
      if (stream) {
        stream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
      }

      // Optionally, you might want to clean up or reset other resources here
    }
  }
  // Optional: function to send or process audioBlob
  sendAudioMessage() {
    if (this.audioBlob) {
      // Generate a filename for the audio blob
      const fileName = `audio_${Date.now()}.webm`; // or another extension depending on the blob type
  
      // Define the path where the file will be stored in Firebase Storage
      const filePath = `uploads/${fileName}`;
      const storageRef = ref(this.storage, filePath);
  
      // Upload the file
      uploadBytes(storageRef, this.audioBlob).then((snapshot) => {
        // Get the download URL
        getDownloadURL(storageRef).then((url) => {
          this.downloadURL = url;
          console.log('File uploaded. Download URL:', url);
          this.newMessage = "File sent";
          this.pushMessage(url, 'audio/webm', fileName,false,url,true,url,false,url,false,url,fileName); // Adjust MIME type and filename as needed
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    }
    this.resetAudioRecording();
  }


  async fetchFile(file: File): Promise<Uint8Array> {
    const response = await fetch(URL.createObjectURL(file));
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  async compressAudio(audioBlob: Blob) {
    const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });

    // Write the audio file to the ffmpeg file system
    await this.ffmpeg.FS('writeFile', 'audio.webm', await this.fetchFile(audioFile));

    // Compress the audio using ffmpeg
    await this.ffmpeg.run('-i', 'audio.webm', '-b:a', '64k', 'output.mp3');

    // Read the compressed file from ffmpeg's file system
    const data = this.ffmpeg.FS('readFile', 'output.mp3');
    const compressedBlob = new Blob([data.buffer], { type: 'audio/mp3' });

    // Create a URL for the compressed file to be played back
    this.audioURL = URL.createObjectURL(compressedBlob);
    console.log('Compressed audio:', compressedBlob);
  }

resetAudioRecording() {
    this.audioURL = null;
    this.isRecording = false;
    // Optionally, you might want to stop any ongoing recording process here
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
        this.unsubscribe();
    }
}


}
