
import { NgModule }            from '@angular/core';
import { CommonModule }                             from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { HttpModule }                               from '@angular/http'; 

@NgModule({
  declarations: [ ],
  
  imports: [
     CommonModule, FormsModule, ReactiveFormsModule, HttpModule
    ],
   
   exports: [
     // angular exports
     CommonModule, FormsModule, ReactiveFormsModule, HttpModule,
   ],
})
  
export class CommonSharedModule {
  
}
  