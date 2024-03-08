import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
import { OffreFormationBoxComponent } from './Pages/card-offre-formation/offre-formation-box.component';;
import { DetailOffreFormationComponent } from './detail-offre-formation/detail-offre-formation.component';
import { DetailBourseEtudeComponent } from './detail-bourse-etude/detail-bourse-etude.component'

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
    OffreEtudesComponent
  ],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
