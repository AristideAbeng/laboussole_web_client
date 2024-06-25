
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


// Set up the headers with the bearer token
headers = new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem("access_token")
});

  //private root_url: string = 'https://aristideabeng.pythonanywhere.com/auth/signup/';
  private root_url: string = 'https://laboussole-back-end.onrender.com/auth/signup/';

  //private login_url: string = 'https://aristideabeng.pythonanywhere.com/auth/jwt/create/';
  private login_url: string = 'https://laboussole-back-end.onrender.com/auth/jwt/create/';

  public user_email:string = "";
  public username:any="";
  public user_photo:string | null="";
  public centres_interets:string = "";
  public chosenImage!:File;
  public profile_incomplete:boolean=false;



  constructor(private httpClient: HttpClient) { }

  createCompte(
    nom: string,
    prenom: string,
    email: string,
    password: string,
    genre: string="NON DEFINI",
    dernierDiplome: string='AUCUN',
    serie: string='AUCUN',
    telephone: string='+',
    niveau: string='AUCUN',
    photo?: File,
    dateOfBirth: string = '1920-01-01' // Default value for date of birth
  ): Promise<any> {
    return new Promise((resolve, reject) => {

      let l:string = prenom?prenom:nom;

      let formData = new FormData();
      formData.append('username', nom);
      formData.append('first_name', nom);
      formData.append('last_name', l);
      formData.append('date_de_naissance', dateOfBirth); // Ensure date format is 'YYYY-MM-DD'
      formData.append('genre', genre);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('dernier_diplome', dernierDiplome);
      formData.append('serie', serie);
      formData.append('telephone', telephone);
      formData.append('niveau', niveau);
      formData.append('centres_interet',"informati medecin medic");
      formData.append('is_staff', "false");
      formData.append('is_superuser', "false");
      formData.append('is_active', "true");
  
      // Check if photo is provided
      if (photo) {
        formData.append('photo_de_profil', photo);
        resolve(this.httpClient.post(this.root_url, formData).toPromise());
      } else {
        // Load image from assets folder
        const imagePath = '/assets/photo.jpg'; // Change this to the actual path of your image
        fetch(imagePath)
          .then(response => response.blob())
          .then(blob => {
            const imageFile = new File([blob], 'photo.jpg', { type: 'image/*' });
            formData.append('photo_de_profil', imageFile);
  
            // Once file is appended to formData, you can make the POST request
            resolve(this.httpClient.post(this.root_url, formData).toPromise());
          })
          .catch(error => {
            reject('Error loading image: ' + error);
          });
      }
    });
  }

  login(email:any,password:any){
    return this.httpClient.post(this.login_url,{
      "email":email,
      "password":password
    });
  }

  updateUserEmail(email:string){
    this.user_email=email
  }

  updateCentreInterets(ci:Array<string>){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    let update_url:string = 'https://laboussole-back-end.onrender.com/auth/'+this.user_email+'/';
    let centres = ci.join(" ");
    return this.httpClient.put(update_url,{
      "centres_interet":centres
    },{ headers: headers });
  }
  updatePassword(pass:string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    let update_url:string = 'https://laboussole-back-end.onrender.com/auth/'+this.user_email+'/';
    return this.httpClient.put(update_url,{
      "password":pass
    },{ headers: headers });
  }
  updateProfile(
    prenom: string,
    genre: string="NON DEFINI",
    dernierDiplome: string='AUCUN',
    serie: string='AUCUN',
    telephone: string='+237',
    niveau: string='AUCUN',
    dateOfBirth: string = '2000-01-01' // 
    ){
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      });
      let update_url:string = 'https://laboussole-back-end.onrender.com/auth/'+this.user_email+'/';
      return new Promise((resolve, reject) => {
       
        let formData = new FormData();
        if(prenom != ""){
          formData.append('last_name', prenom);
        }
       if(dateOfBirth){
        formData.append('date_de_naissance', dateOfBirth); // Ensure date format is 'YYYY-MM-DD'
       }
       if(genre != ""){
        formData.append('genre', genre);
       }
        if(dernierDiplome != ""){
          formData.append('dernier_diplome', dernierDiplome);
        }
        if(serie != ""){
          formData.append('serie', serie);
        }
       if(telephone!=""){
        formData.append('telephone', telephone);
       }
        if(niveau != ""){
          formData.append('niveau', niveau);
        }
        
       
      resolve(this.httpClient.put(update_url, formData,{ headers: headers }).toPromise());
       
      });
    }
  updateProfilePhoto(photo?: File){
      let update_url:string = 'https://laboussole-back-end.onrender.com/auth/'+this.user_email+'/';
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        });
       
      let formData = new FormData();
    
        // Check if photo is provided
        if (photo) {
          formData.append('photo_de_profil', photo);
          resolve(this.httpClient.put(update_url, formData,{ headers: headers }).toPromise());
        } else {
          // Load image from assets folder
          const imagePath = '/assets/photo.jpg'; // Change this to the actual path of your image
          fetch(imagePath)
            .then(response => response.blob())
            .then(blob => {
              const imageFile = new File([blob], 'photo.jpg', { type: 'image/*' });
              formData.append('photo_de_profil', imageFile);
    
              // Once file is appended to formData, you can make the POST request
              resolve(this.httpClient.put(update_url, formData,{ headers: headers }).toPromise());
            })
            .catch(error => {
              reject('Error loading image: ' + error);
            });
        }
      });
  }  
  getUserInfo(){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    if (!this.user_email){
      let m:string | null = localStorage.getItem('user_email');
      
      if (m){
        this.user_email = m;
      }
    }
    let url:string = 'https://laboussole-back-end.onrender.com/auth/'+this.user_email+'/';
    return this.httpClient.get(url,{ headers: headers });
  }

  getUserByMail(mail:string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    let url:string = 'https://laboussole-back-end.onrender.com/auth/'+mail+'/';
    return this.httpClient.get(url,{ headers: headers });
  }

  recoverAccount(mail:string){
    let url:string = 'https://laboussole-back-end.onrender.com/auth/recover/'+mail+'/';
    return this.httpClient.get(url);
  }

  recoverPassword(mail:string,code:number,new_password:string){
   
    let url:string = 'https://laboussole-back-end.onrender.com/auth/recover/'+mail+'/';
    return this.httpClient.post(url,{
      "user_email":mail,
      "code":code,
      "new_password":new_password
    });
  }
  contactus(mail:string,message:string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    let url:string = 'https://laboussole-back-end.onrender.com/auth/contact/'+this.user_email+'/';
    return this.httpClient.post(url,{
      "user_email":this.user_email,
      "message":message
    },{ headers:headers });
  }
}
