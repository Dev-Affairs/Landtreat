import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminConfigurationsComponent } from './admin-configurations/admin-configurations.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppConfigurationsComponent } from './app-configurations/app-configurations.component';
import { LayoutComponent } from './layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { ContactConfigurationsComponent } from './contact-configurations/contact-configurations.component';


@NgModule({
  declarations: [
    AdminConfigurationsComponent,
    AdminDashboardComponent,
    AppConfigurationsComponent,
    LayoutComponent,
    HomeComponent,
    AdminHomeComponent,
    ContactConfigurationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class AdminModule { }
