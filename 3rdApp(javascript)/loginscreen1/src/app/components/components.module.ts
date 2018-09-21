import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import{MatToolbarModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule
,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

// import { CreateComponent } from './components/create/create.component';
// import { EditComponent } from './components/edit/edit.component';
// import{IssueService} from './issue.service';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
// import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MainRoutingModule} from './components-routing.module'
import {Componentscomponent } from './components.component'
const routes:Routes=[
  { path:'create', component:CreateComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'list',component:ListComponent},
  {path:'',redirectTo:'list',pathMatch:'full'}
]
@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxPaginationModule,
    MatTooltipModule,
    MatRadioModule,
    FilterPipeModule,
    FormsModule,
  
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule
    ,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule,
    RouterModule.forChild(routes)

  ],
  declarations: [ListComponent,CreateComponent,EditComponent,Componentscomponent]
})
export class ComponentsModule { }
