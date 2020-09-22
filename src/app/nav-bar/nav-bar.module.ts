import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MaterialModule, MatIconModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
