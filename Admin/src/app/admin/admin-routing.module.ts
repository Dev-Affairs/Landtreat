import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfigurationsComponent } from './app-configurations/app-configurations.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminConfigurationsComponent } from './admin-configurations/admin-configurations.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ContactConfigurationsComponent } from './contact-configurations/contact-configurations.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'landingConfig', component: AppConfigurationsComponent },
      { path: 'contactConfig', component: ContactConfigurationsComponent },
      { path: 'adminInfo', component: AdminConfigurationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
