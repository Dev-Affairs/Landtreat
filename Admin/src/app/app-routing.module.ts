import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerpertyRegisterComponent } from './pages/perperty-register/perperty-register.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { AdminLandingComponent } from './pages/admin-landing/admin-landing.component';
import { AdminConfigurationComponent } from './pages/admin-configuration/admin-configuration.component';
import { AuthGuard } from './guards/auth.guard';
import { PostsComponent } from './pages/posts/posts.component';
import { SavedListsComponent } from './pages/saved-lists/saved-lists.component';
import { SavedItemComponent } from './pages/saved-lists/saved-item/saved-item.component';
import { VerifyUserComponent } from './pages/verify-user/verify-user.component';
import { AuthRouteGuard } from './guards/authRoute.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "verifyUser",
    component: VerifyUserComponent
  },
  {
    path: "addPost",
    component: RichTextEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addProperty",
    component: PerpertyRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "savedLists",
    component: SavedListsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "savedItem",
    component: SavedItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "posts",
    component: PostsComponent,
    canActivate: [AuthGuard]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthRouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }