import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , MatCardModule
    , MatIconModule
    , MatButtonToggleModule
    , MatFormFieldModule
    , MatInputModule
    , MatIconModule
    , MatButtonModule
  ],
  exports: [
    CommonModule
    , MatCardModule
    , MatIconModule
    , MatButtonToggleModule
    , MatFormFieldModule
    , MatInputModule
    , MatIconModule
    , MatButtonModule
  ]
})
export class SharedMaterialModule { }
