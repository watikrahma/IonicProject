import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [ //membaca content yang akan ada di menu
      { path: 'first', loadChildren: '../first-with-tabs/first-with-tabs.module#FirstWithTabsPageModule'},
      //path: <nama page>, loadChildren: <direktori>
      { path: 'second', loadChildren: '../second/second.module#SecondPageModule'},
      { path: 'firebasepage', loadChildren: '../firebasepage/firebasepage.module#FirebasepagePageModule'},
      { path: 'second/details', loadChildren: '../details/details.module#DetailsPageModule'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
