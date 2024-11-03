import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Firestore, collection,collectionData, query, where, getDocs,addDoc,updateDoc,doc,deleteDoc,} from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-mon-objectif',
  templateUrl: './mon-objectif.component.html',
  styleUrls: ['./mon-objectif.component.scss']
})
export class MonObjectifComponent {
  show_action_plan:boolean = false;
  action_object:any;
  is_objective_set:boolean = false;
  current_objective:any;
  errorMessage: string = ''; // To hold error messages

  constructor(private userService:UserServiceService, private firestore:Firestore){
   }

   async checkObjectiveInProgress(userId: number): Promise<boolean> {
    try {
      const userObjectivesRef = collection(this.firestore, 'user_objectives');
      const q = query(userObjectivesRef, where('user_id', '==', userId), where('objective_status', '==', 'in_progress'));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return false; // No documents in progress
      }
  
      // If more than one document is found, delete the extras
      if (querySnapshot.size > 1) {
        console.warn(`More than one objective found in progress for user ${userId}. Deleting extras.`);
        const docsToDelete = querySnapshot.docs.slice(1); // Keep the first one and delete the rest
        
        for (const docSnapshot of docsToDelete) {
          const docRef = doc(this.firestore, 'user_objectives', docSnapshot.id);
          await deleteDoc(docRef);
          console.log(`Deleted extra objective with ID: ${docSnapshot.id}`);
        }
      }
  
      // Return true if at least one "in_progress" document exists
      return true;
    } catch (error) {
      console.error('Error checking and cleaning up user objectives: ', error);
      return false;
    }
  }

  getUserObjectivesByUserIdAndJobTitle(userId: number): Observable<[]> {
    const userObjectivesRef = collection(this.firestore, 'user_objectives');
    const q = query(
      userObjectivesRef,
      where('user_id', '==', userId),
      //where('job_title', '==', jobTitle)
    );

    return collectionData(q, { idField: 'id' }) as Observable<[]>;
  }

  async getUserObjectiveByUserId(userId: number) {
    console.log(userId)
    try {
      // Reference the 'user_objectives' collection
      const userObjectivesRef = collection(this.firestore, 'user_objectives');

      // Create a query to fetch the document where user_id matches the specified value
      const q = query(userObjectivesRef, where('user_id', '==', userId));

      // Execute the query and get the documents
      const querySnapshot = await getDocs(q);

      // Check if we have documents and return the first match
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data(); // Returns the document data
      } else {
        console.log('No matching documents found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user objective: ', error);
      return null;
    }
  }

   // Method to insert a document with auto-generated ID
   async insertUserObjective(objectiveData: any) {
    try {
      // Reference the 'user_objectives' collection
      const userObjectivesRef = collection(this.firestore, 'user_objectives');

      // Add the new document
      const docRef = await addDoc(userObjectivesRef, objectiveData);

      console.log('Document written with ID: ', docRef.id);
      return docRef.id; // Return the generated document ID if needed
    } catch (error) {
      console.error('Error adding document: ', error);
      return null;
    }
  }

  async updateUserObjectiveWithActionPlan(docId: string, actionPlan: any) {
    try {
      const docRef = doc(this.firestore, 'user_objectives', docId); // Reference to the document
      await updateDoc(docRef, { action_plan: actionPlan });
      console.log('Action plan successfully added to the document!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  ngOnInit(){
    let id:number = localStorage.getItem('user_id') as unknown as number;
   //this.checkObjectiveInProgress(id)
  }

  ngAfterViewInit(){
    let ob = localStorage.getItem('is_objective_set');
    let id: number = Number(localStorage.getItem('user_id')); // Parse the id as a number
    
    if(ob=='true'){
      this.getUserObjectiveByUserId(id).then(objective => {
        this.is_objective_set=true;
        console.log(objective);
        this.current_objective=objective;
      }).catch(error => {
        console.log(error)
      })
    }
    else if(this.userService.chosen_objective){
     
      this.is_objective_set = true;
      this.current_objective=this.userService.chosen_objective;
      this.checkObjectiveInProgress(id).then(hasInProgress => {
        if (hasInProgress) {
          this.errorMessage = 'You have an ongoing objective. Please complete or abandon it before adding a new one.';
          console.error(this.errorMessage);
        } else {
          const obj_data = {
            user_id: id,
            job_id: this.current_objective.job_id,
            job_title: this.current_objective.job_title,
            job_description: this.current_objective.job_description,
            objective_status: 'in_progress', // Set status for the new objective
            action_plan:[],
          };
          console.log(obj_data);

          // Insert the objective data
          this.insertUserObjective(obj_data).then(docId => {
            if (docId) {
              localStorage.setItem('is_objective_set','true')
            }
          });
        }
      });

    }else{
      this.getUserObjectiveByUserId(id).then(objective => {
        if(objective){
          this.is_objective_set=true;
          console.log(objective);
          this.current_objective=objective;
        }else{
          this.is_objective_set=false;
          localStorage.setItem('is_objective_set','false')
        }
        
      }).catch(error => {
        console.log(error)
      })
    }
  }

  showActionPlan(e:any){
    this.show_action_plan=true;
    this.action_object=e;
  }
  showSpecificPlan(e:any){
    this.show_action_plan=true;
    this.action_object=e;
  }
  hideActionPlan(e:any){
    this.show_action_plan=false;
    this.action_object=null
  }
}
