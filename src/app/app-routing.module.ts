import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { AuthGuardService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadLaterComponent } from './read-later/read-later.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  
    {
      path : 'register',
      component : RegisterComponent
    },
    {
      path : '',
      component : LoginComponent
    },
    {
      path : 'login',
      component : LoginComponent
    },
    {
      path : 'home',
      component : ArticleComponent,
      canActivate: [AuthGuardService]
    },
    {
      path : 'profile',
      component : ProfileComponent,
      canActivate: [AuthGuardService]
    },
    {
      path : 'read-later',
      component : ReadLaterComponent,
      canActivate: [AuthGuardService]
    },
    {
      path : 'logout',
      component : LogoutComponent
    },
    {
      path : '**',
      redirectTo: ""
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
