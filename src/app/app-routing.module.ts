import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: '', redirectTo: 'setting', pathMatch: 'full'},
  { path: 'setting', component: SettingComponent},
  { path: 'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
