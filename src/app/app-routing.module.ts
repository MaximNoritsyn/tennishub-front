import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { IndexComponent } from './views/index/index.component';
import { PlayerComponent } from './views/players/player/player.component';
import { GrouptestDashboardComponent } from './views/grouptest/grouptest-dashboard/grouptest-dashboard.component';
import { IsLoggedGuard } from './services/auth-guard.service';
import { ListGrouptestComponent } from './views/grouptest/list-grouptest/list-grouptest.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: IndexComponent},
  {path: 'player/:id_db', canActivate: [IsLoggedGuard], component: PlayerComponent},
  {path: 'list-grouptest', canActivate: [IsLoggedGuard], component: ListGrouptestComponent},
  {path: 'grouptestdashboard/:id', canActivate: [IsLoggedGuard], component: GrouptestDashboardComponent},
  {path: 'grouptestdashboard/:id/:task', canActivate: [IsLoggedGuard], component: GrouptestDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
