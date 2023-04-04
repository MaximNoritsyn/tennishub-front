import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { IndexComponent } from './views/index/index.component';
import { PlayerComponent } from './views/players/player/player.component';
import { GrouptestDashboardComponent } from './views/grouptest/grouptest-dashboard/grouptest-dashboard.component';
import { IsLoggedGuard } from './services/auth-guard.service';
import { ListGrouptestComponent } from './views/grouptest/list-grouptest/list-grouptest.component';
import { GsdVdComponent } from './views/testing/gsd-vd/gsd-vd.component';
import { GsaComponent } from './views/testing/gsa/gsa.component';
import { ServeComponent } from './views/testing/serve/serve.component';
import { MobilityComponent } from './views/testing/mobility/mobility.component';
import { ComplexResultComponent } from './views/testing/complex-result/complex-result.component';
import { ListTestComponent } from './views/itn/list-test/list-test.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: IndexComponent},
  {path: 'player/:id_db', canActivate: [IsLoggedGuard], component: PlayerComponent},
  {path: 'list-grouptest', canActivate: [IsLoggedGuard], component: ListGrouptestComponent},
  {path: 'list-test/:id_db', canActivate: [IsLoggedGuard], component: ListTestComponent},
  {path: 'grouptestdashboard/:id_db', canActivate: [IsLoggedGuard], component: GrouptestDashboardComponent},
  {path: 'grouptestdashboard/:id_db/:task', canActivate: [IsLoggedGuard], component: GrouptestDashboardComponent},
  {path: 'testing/gsd/:idtest/:stagenumber', canActivate: [IsLoggedGuard], component: GsdVdComponent},
  {path: 'testing/gsd/:idgruptest/:idtest/:stagenumber', canActivate: [IsLoggedGuard], component: GsdVdComponent},
  {path: 'testing/vd/:idtest/:stagenumber', canActivate: [IsLoggedGuard], component: GsdVdComponent},
  {path: 'testing/vd/:idgruptest/:idtest/:stagenumber', canActivate: [IsLoggedGuard], component: GsdVdComponent},
  {path: 'testing/gsa/:idtest/:stagenumber', canActivate: [IsLoggedGuard], component: GsaComponent},
  {path: 'testing/gsa/:idgruptest/:idtest/:stagenumber', canActivate: [IsLoggedGuard], component: GsaComponent},
  {path: 'testing/serve/:idtest/:stagenumber/:serve', canActivate: [IsLoggedGuard], component: ServeComponent},
  {path: 'testing/serve/:idgruptest/:idtest/:stagenumber/:serve', canActivate: [IsLoggedGuard], component: ServeComponent},
  {path: 'testing/mobility/:idtest', canActivate: [IsLoggedGuard], component: MobilityComponent},
  {path: 'testing/mobility/:idgruptest/:idtest', canActivate: [IsLoggedGuard], component: MobilityComponent},
  {path: 'testing/results/:idtest', canActivate: [IsLoggedGuard], component: ComplexResultComponent},
  {path: 'testing/results/:idgruptest/:idtest', canActivate: [IsLoggedGuard], component: ComplexResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
