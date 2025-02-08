import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerpertyRegisterComponent } from './pages/perperty-register/perperty-register.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberFormatPipe } from './custom-pipes/number-format.pipe';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { QuillModule } from 'ngx-quill';
import { AdminLandingComponent } from './pages/admin-landing/admin-landing.component';
import { AdminConfigurationComponent } from './pages/admin-configuration/admin-configuration.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AppInitializerService } from './services/app-initializer.service';
import { AuthGuard } from './guards/auth.guard';
import { PostsComponent } from './pages/posts/posts.component';
import { SavedListsComponent } from './pages/saved-lists/saved-lists.component';
import { SavedItemComponent } from './pages/saved-lists/saved-item/saved-item.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthRouteGuard } from './guards/authRoute.guard';

@NgModule({
  declarations: [
    AppComponent,
    RichTextEditorComponent,
    AdminLandingComponent,
    AdminConfigurationComponent,
    PostsComponent,
    SavedListsComponent,
    SavedItemComponent,
    NavbarComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule ,
    PerpertyRegisterComponent,
    HttpClientModule,
    QuillModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [NumberFormatPipe, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },AppInitializerService
    ,{
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializerService) => () => appInitializer.initialize(),
      deps: [AppInitializerService],
      multi: true
    },
    AuthGuard,
    AuthRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
