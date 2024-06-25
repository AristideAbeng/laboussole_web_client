import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentreInteretsComponent } from './centre-interets/centre-interets.component';
import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
import { PageAcceuilAdminComponent } from './page-acceuil-admin/page-acceuil-admin.component';
import { PageAcceuilSansCompteComponent } from './page-acceuil-sans-compte/page-acceuil-sans-compte.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { PageConnexionClientComponent } from './page-connexion-client/page-connexion-client.component';
import { PageCreationCompteClientComponent } from './page-creation-compte-client/page-creation-compte-client.component';
import { PageInscriptionComponent } from './page-inscription/page-inscription.component';
import { OffreDeFormationsComponent } from './Pages/offre-de-formations/offre-de-formations.component';
import { OffreEtudesComponent } from './Pages/offre-etudes/offre-etudes.component';
import { DetailOffreFormationComponent } from './detail-offre-formation/detail-offre-formation.component';
import { DetailBourseEtudeComponent } from './detail-bourse-etude/detail-bourse-etude.component';
import { FormationsComponent } from './Pages/formations/formations.component';
import { DetailsFilieresComponent } from './Pages/details-filieres/details-filieres.component';
import { SignupErrorComponent } from './signup-error/signup-error.component';
import { SignupResponseComponent } from './signup-response/signup-response.component';
import { DetailsFacultesComponent } from './Pages/details-facultes/details-facultes.component';
import { VoirTousMetiersComponent } from './Pages/voir-tous-metiers/voir-tous-metiers.component';
import { VoirToutFormationsComponent } from './Pages/voir-tout-formations/voir-tout-formations.component';
import { ContactezNousComponent } from './contactez-nous/contactez-nous.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DetailsActualitesComponent } from './details-actualites/details-actualites.component';
import { DetailsNotificationsComponent } from './details-notifications/details-notifications.component';
import { TemoignagesInputComponent } from './temoignages-input/temoignages-input.component';
import { ConditionsUtilisationsComponent } from './conditions-utilisations/conditions-utilisations.component';
import { SingleFaqPageComponent } from './single-faq-page/single-faq-page.component';
const routes: Routes = [
  { path: '', component: PageAcceuilSansCompteComponent },
  { path: 'login', component: PageConnexionClientComponent },
  { path: 'signup', component: PageCreationCompteClientComponent },
  { path: 'motDePasseOublie', component: MotDePasseOublieComponent },
  { path: 'admin', component: PageAcceuilAdminComponent },
  { path: 'metiers', component: OffreDeFormationsComponent },
  { path: 'metiers/:id_metiers', component: DetailOffreFormationComponent },
  { path: 'universites', component: FormationsComponent },
  { path: 'etudes', component: OffreEtudesComponent },
  { path: 'detail-bourses-etudes', component: DetailBourseEtudeComponent },
  { path: 'universites/:universite_id', component: DetailsFilieresComponent },
  { path: 'signup-success', component: SignupResponseComponent },
  { path: 'signup-error', component: SignupErrorComponent },
  { path: 'centres-interets/:origin', component: CentreInteretsComponent },
  {path:'facultes/:faculte_id', component: DetailsFacultesComponent},
  {path: 'voir-tout-metiers', component: VoirTousMetiersComponent},
  {path: 'voir-tout-formations', component: VoirToutFormationsComponent},
  {path:'contact',component:ContactezNousComponent},
  {path: 'aboutus',component:AboutUsComponent},
  {path: 'profil/:page',component:UserProfileComponent},
  {path:'search-results',component:SearchResultsComponent},
  {path:'details-actualites',component:DetailsActualitesComponent},
  {path:'details-notifications',component:DetailsNotificationsComponent},
  {path:'temoignages/:id',component:TemoignagesInputComponent},
  {path:'conditions',component:ConditionsUtilisationsComponent},
  {path:'faq',component:SingleFaqPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
