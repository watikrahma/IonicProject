import { NgModule } from '@angular/core'; //wajib ada
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; //wajib ada
import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', loadChildren: './home/home.module#HomePageModule' },
//   { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
//   { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
//   { path: 'first-with-tabs', loadChildren: './pages/first-with-tabs/first-with-tabs.module#FirstWithTabsPageModule' },
//   { path: 'second', loadChildren: './pages/second/second.module#SecondPageModule' },
//   { path: 'firebasepage', loadChildren: './pages/firebasepage/firebasepage.module#FirebasepagePageModule' },
//   { path: 'tab1', loadChildren: './pages/tab1/tab1.module#Tab1PageModule' },
//   { path: 'tab2', loadChildren: './pages/tab2/tab2.module#Tab2PageModule' },
//   { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule' },
// ];

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', loadChildren:'./pages/login/login.module#LoginPageModule'},
  {path:'menu', loadChildren:'./pages/menu/menu.module#MenuPageModule'},
  { path: 'tab3', loadChildren: './pages/tab3/tab3.module#Tab3PageModule' },
  { path: 'loginfirebase', loadChildren: './pages/loginfirebase/loginfirebase.module#LoginfirebasePageModule' },
  { path: 'firebasepage', loadChildren: './pages/firebasepage/firebasepage.module#FirebasepagePageModule'},
  { path: 'new-task', loadChildren: './pages/new-task/new-task.module#NewTaskPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
