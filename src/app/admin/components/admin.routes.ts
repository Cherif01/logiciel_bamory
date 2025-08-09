import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AchatComponent } from './achat/achat.component';
import { FixingComponent } from './fixing/fixing.component';
import { AddExpeditionComponent } from './add-expedition/add-expedition.component';
import { HistoriqueExpeditionComponent } from './historique-expedition/historique-expedition.component';
import { OperationMonetaireComponent } from './operation-monetaire/operation-monetaire.component';
import { CompteMonetaireComponent } from './compte-monetaire/compte-monetaire.component';
import { CaissePrincipaleComponent } from './caisse-principale/caisse-principale.component';
import { CompteUtilisateurComponent } from './compte-utilisateur/compte-utilisateur.component';
import { AffectationUsersComponent } from './affectation-users/affectation-users.component';
import { SettingsComponent } from './settings/settings.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'client',
    component: ClientComponent,
  },
  {
    path: 'fournisseur',
    component: FournisseurComponent,
  },
  {
    path: 'achat',
    component: AchatComponent,
  },
  {
    path: 'fixing',
    component: FixingComponent,
  },
  {
    path: 'nouvelle-expedition',
    component: AddExpeditionComponent,
  },
  {
    path: 'historique-expedition',
    component: HistoriqueExpeditionComponent,
  },
  {
    path: 'operation-monetaire',
    component: OperationMonetaireComponent,
  },
  {
    path: 'compte-monetaire',
    component: CompteMonetaireComponent,
  },
  {
    path: 'caisse-principale',
    component: CaissePrincipaleComponent,
  },
  {
    path: 'users',
    component: CompteUtilisateurComponent,
  },
  {
    path: 'affectation',
    component: AffectationUsersComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
