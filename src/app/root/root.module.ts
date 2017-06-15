import { NgModule } from '@angular/core';

import { RootRoutingModule } from './root-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UnknownComponent } from './unknown/unknown.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    SharedModule,
    RootRoutingModule
  ],
  exports: [
    RootRoutingModule,
    HeaderComponent
  ],
  declarations: [HomeComponent, UnknownComponent, HeaderComponent]
})
export class RootModule { }
