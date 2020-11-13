import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MaterialModule, MatIconModule, FlexLayoutModule],
  exports: [NavBarComponent],
})
export class NavBarModule { }
