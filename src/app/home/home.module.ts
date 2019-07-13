import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { HomeResolver } from './home.resolver';

const routes: Routes =[
  {
    path:'', component: HomePage,
    resolve: {
      data: HomeResolver
    }
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomeResolver,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage],
  providers: [HomeResolver]
})
export class HomePageModule {}
