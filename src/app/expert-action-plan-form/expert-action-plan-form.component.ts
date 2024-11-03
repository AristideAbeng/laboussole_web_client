import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Firestore, collection, query, where, collectionData, arrayUnion, doc, getDocs, updateDoc, addDoc } from '@angular/fire/firestore';
import { Observable,take } from 'rxjs';

@Component({
  selector: 'app-expert-action-plan-form',
  templateUrl: './expert-action-plan-form.component.html',
  styleUrls: ['./expert-action-plan-form.component.scss']
})
export class ExpertActionPlanFormComponent {

  @Output() onActionPlanSent = new EventEmitter<any>();

  action_plan_steps:any[] = [];


  readonly panelOpenState = signal(false);
  
  private _formBuilder = inject(FormBuilder);

  constructor(private userService:UserServiceService,private firestore:Firestore){

  }

  firstFormGroup = this._formBuilder.group({
    client_email: ['', Validators.required],
    client_objective: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    duration: ['', Validators.required],
    ressources:['', Validators.required],
    cost:['', Validators.required] 
  });
  isLinear = false;

  addActionToList(){
    if(this.secondFormGroup.valid){
      this.action_plan_steps.push({
        title:this.secondFormGroup.get('title')?.value,
        description:this.secondFormGroup.get('description')?.value,
        duration:this.secondFormGroup.get('duration')?.value,
        ressources:this.secondFormGroup.get('ressources')?.value,
        cost:this.secondFormGroup.get('cost')?.value
      })
    }
    
  }

  sendActionPlan(){
    let duree_total:number = 0;
    let cout_total:number=0;
    for(let step of this.action_plan_steps){
      duree_total = Number(step.duration) + duree_total;
      cout_total = Number(step.cost) + cout_total; 
    }
    let id:number =  Number(localStorage.getItem('user_id'));
    let plan = {
      client:this.firstFormGroup.get('client_email')?.value,
      objective:this.firstFormGroup.get('client_objective')?.value,
      duree_total:duree_total,
      investissement_total:cout_total,
      created_at: new Date() ,
      actions:this.action_plan_steps,
      expert:id
    }
    let expert_plan = {
      client:this.firstFormGroup.get('client_email')?.value,
      objective:this.firstFormGroup.get('client_objective')?.value,
      duree_total:duree_total,
      investissement_total:cout_total,
      created_at: new Date(),
      actions:this.action_plan_steps,
      expert_id:String(id)
    }
    console.log(plan)
    this.insertExpertObjective(expert_plan).then(
      ()=>{
        console.log('expert Plan Updated')
        this.userService.getUserByMail(this.firstFormGroup.get('client_email')?.value).pipe(take(1)).subscribe(
          (data: any) => {
            console.log(data);
            
            this.getUserObjectivesByUserIdAndJobTitle(data.id, plan.objective).pipe(take(1)).subscribe(
              (data_obj: any) => {
                console.log(data_obj);
        
                this.pushToActionPlan(data.id, plan)
                  .then(() => {console.log('Action Plan Updated')
                  this.onActionPlanSent.emit(plan);
                }
                  
                  )
                  .catch((error) => console.error('Error updating action plan:', error));
              },
              (error) => {
                console.error(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );

      }
    ).catch((error) => console.error('Error updating action plan:', error));


    

   // 
  }

  getUserObjectivesByUserIdAndJobTitle(userId: number, jobTitle: any): Observable<[]> {
    const userObjectivesRef = collection(this.firestore, 'user_objectives');
    const q = query(
      userObjectivesRef,
      where('user_id', '==', userId),
      where('job_title', '==', jobTitle)
    );

    return collectionData(q, { idField: 'id' }) as Observable<[]>;
  }

  async pushToActionPlan(userId: number, newActionPlan: any): Promise<void> {
    const userObjectivesRef = collection(this.firestore, 'user_objectives');
    const q = query(userObjectivesRef, where('user_id', '==', userId));
    
    // Fetch the matching document(s)
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = doc(this.firestore, `user_objectives/${docSnapshot.id}`);

      // Use Firestore's arrayUnion to add the new action plan to the array
      await updateDoc(docRef, {
        action_plan: arrayUnion(newActionPlan)
      });
    });
  }
  // Method to insert a document with auto-generated ID
  async insertExpertObjective(objectiveData: any) {
    try {
      // Reference the 'user_objectives' collection
      const userObjectivesRef = collection(this.firestore, 'expert_action_plans');

      // Add the new document
      const docRef = await addDoc(userObjectivesRef, objectiveData);

      console.log('Document written with ID: ', docRef.id);
      return docRef.id; // Return the generated document ID if needed
    } catch (error) {
      console.error('Error adding document: ', error);
      return null;
    }
  }

  

}

