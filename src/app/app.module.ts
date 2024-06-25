import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { PageAcceuilSansCompteComponent } from './page-acceuil-sans-compte/page-acceuil-sans-compte.component';
import { PageConnexionClientComponent } from './page-connexion-client/page-connexion-client.component';
import { PageCreationCompteClientComponent } from './page-creation-compte-client/page-creation-compte-client.component';
import { NavMobileHeaderComponent } from './nav-mobile-header/nav-mobile-header.component';
import { NavMobilePageComponent } from './nav-mobile-page/nav-mobile-page.component';
import { CustomRoundButtonComponent } from './custom-round-button/custom-round-button.component';
import { AcceuilOptionBoxComponent } from './acceuil-option-box/acceuil-option-box.component';
import { TemoignageBoxComponent } from './temoignage-box/temoignage-box.component';
import { ActualiteBoxComponent } from './actualite-box/actualite-box.component';
import { FooterComponent } from './footer/footer.component';
import { StarComponent } from './star/star.component';
import { ActualiteLargeScreenBoxComponent } from './actualite-large-screen-box/actualite-large-screen-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {  MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';


import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { OffreDeFormationsComponent } from './Pages/offre-de-formations/offre-de-formations.component';
import { ConnexionAdminComponent } from './connexion-admin/connexion-admin.component';
import { PageAcceuilAdminComponent } from './page-acceuil-admin/page-acceuil-admin.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminHomePanelComponent } from './admin-home-panel/admin-home-panel.component';
import { AdminUserInfoPanelComponent } from './admin-user-info-panel/admin-user-info-panel.component';
import { UserPersonalInfoPanelComponent } from './user-personal-info-panel/user-personal-info-panel.component';
import { UserActivityPanelComponent } from './user-activity-panel/user-activity-panel.component';
import { AdminOffreDeFormationsComponent } from './admin-offre-de-formations/admin-offre-de-formations.component';
import { AdminBoursesEtudesComponent } from './admin-bourses-etudes/admin-bourses-etudes.component';
import { AdminvoyagesEtudesComponent } from './adminvoyages-etudes/adminvoyages-etudes.component';

import { AdminOffresFormationsInfoPanelComponent } from './admin-offres-formations-info-panel/admin-offres-formations-info-panel.component';
import { AdminBourseEtudeInfoPanelComponent } from './admin-bourse-etude-info-panel/admin-bourse-etude-info-panel.component';
import { AdminVoyagesEtudesInfoPanelComponent } from './admin-voyages-etudes-info-panel/admin-voyages-etudes-info-panel.component';
import { OffreEtudesComponent } from './Pages/offre-etudes/offre-etudes.component';
import { OffreFormationBoxComponent } from './Pages/card-offre-formation/offre-formation-box.component';
import { DetailOffreFormationComponent } from './detail-offre-formation/detail-offre-formation.component';
import { DetailBourseEtudeComponent } from './detail-bourse-etude/detail-bourse-etude.component';
import { FormationsComponent } from './Pages/formations/formations.component';
import { FiliereFormationBoxComponent } from './Pages/filiere-formation-box/filiere-formation-box.component';
import { DetailsFilieresComponent } from './Pages/details-filieres/details-filieres.component';
import { SignupResponseComponent } from './signup-response/signup-response.component';
import { SignupErrorComponent } from './signup-error/signup-error.component';
import { CentreInteretsComponent } from './centre-interets/centre-interets.component';
import { CentreInteretBoxComponent } from './centre-interet-box/centre-interet-box.component';
import { LoggedInNavHeaderComponent } from './logged-in-nav-header/logged-in-nav-header.component';
import { FaculteBoxComponent } from './Pages/faculte-box/faculte-box.component';
import { DetailsFacultesComponent } from './Pages/details-facultes/details-facultes.component';
import { LoggedInNavPageComponent } from './logged-in-nav-page/logged-in-nav-page.component';
import { VoirTousMetiersComponent } from './Pages/voir-tous-metiers/voir-tous-metiers.component';
import { VoirToutFormationsComponent } from './Pages/voir-tout-formations/voir-tout-formations.component';
import { ContactezNousComponent } from './contactez-nous/contactez-nous.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ChangerMdpComponent } from './changer-mdp/changer-mdp.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DetailsActualitesComponent } from './details-actualites/details-actualites.component';
import { DetailsNotificationsComponent } from './details-notifications/details-notifications.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { NotificationTemplateComponent } from './notification-template/notification-template.component';
import { TemoignagesInputComponent } from './temoignages-input/temoignages-input.component';
import { AskLoginDialogComponent } from './ask-login-dialog/ask-login-dialog.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { TemoignageTemplateComponent } from './temoignage-template/temoignage-template.component';
import { InputTemoignageDialogComponent } from './input-temoignage-dialog/input-temoignage-dialog.component';
import { ConditionsUtilisationsComponent } from './conditions-utilisations/conditions-utilisations.component';
import { FaqTemplateComponent } from './faq-template/faq-template.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { SingleFaqPageComponent } from './single-faq-page/single-faq-page.component';
import { CompleteProfileDialogComponent } from './complete-profile-dialog/complete-profile-dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilSansCompteComponent,
    PageConnexionClientComponent,
    PageCreationCompteClientComponent,
    NavMobileHeaderComponent,
    NavMobilePageComponent,
    CustomRoundButtonComponent,
    AcceuilOptionBoxComponent,
    TemoignageBoxComponent,
    ActualiteBoxComponent,
    FooterComponent,
    StarComponent,
    ActualiteLargeScreenBoxComponent,
    MotDePasseOublieComponent,
    PageAdminComponent,
    OffreDeFormationsComponent,
    ConnexionAdminComponent,
    PageAcceuilAdminComponent,
    AdminUsersListComponent,
    AdminHomePanelComponent,
    AdminUserInfoPanelComponent,
    UserPersonalInfoPanelComponent,
    UserActivityPanelComponent,
    AdminOffreDeFormationsComponent,
    AdminBoursesEtudesComponent,
    AdminvoyagesEtudesComponent,
    AdminOffresFormationsInfoPanelComponent,
    AdminBourseEtudeInfoPanelComponent,
    AdminVoyagesEtudesInfoPanelComponent,
    DetailBourseEtudeComponent,
    DetailOffreFormationComponent,
    OffreFormationBoxComponent,
    OffreEtudesComponent,
    FormationsComponent,
    FiliereFormationBoxComponent,
    DetailsFilieresComponent,
    SignupResponseComponent,
    SignupErrorComponent,
    CentreInteretsComponent,
    CentreInteretBoxComponent,
    LoggedInNavHeaderComponent,
    FaculteBoxComponent,
    DetailsFacultesComponent,
    LoggedInNavPageComponent,
    VoirTousMetiersComponent,
    VoirToutFormationsComponent,
    ContactezNousComponent,
    AboutUsComponent,
    NavBarComponent,
    UserProfileComponent,
    ProfileInfoComponent,
    ChangerMdpComponent,
    SearchResultsComponent,
    DetailsActualitesComponent,
    DetailsNotificationsComponent,
    NotificationsListComponent,
    NotificationTemplateComponent,
    TemoignagesInputComponent,
    AskLoginDialogComponent,
    NotificationDialogComponent,
    TemoignageTemplateComponent,
    InputTemoignageDialogComponent,
    ConditionsUtilisationsComponent,
    FaqTemplateComponent,
    FaqPageComponent,
    SingleFaqPageComponent,
    CompleteProfileDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatListModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    MatRippleModule,
    MatSidenavModule,
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
