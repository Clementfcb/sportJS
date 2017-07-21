import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { HttpAuthService } from './http-auth.service';
import {AutorisationGuard} from "./guard/autorisation.guard";

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    UserService,
    HttpAuthService,
    AutorisationGuard
  ],
  declarations: [LoginComponent]
})
export class SecurityModule { }
