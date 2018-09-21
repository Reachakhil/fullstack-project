import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AuthGuardService, AuthGuardLoginService} from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import{MatToolbarModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule
,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

// import { CreateComponent } from './components/create/create.component';
// import { EditComponent } from './components/edit/edit.component';
import{IssueService} from './issue.service';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
// import { LoginComponent } from './login/login.component';
const routes:Routes=[
  
  {path: '', loadChildren: './components/components.module#ComponentsModule' , canActivate:[AuthGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' , canActivate: [AuthGuardLoginService]},
  { path: '**', loadChildren: './components/components.module#ComponentsModule'},
 
]
@NgModule({
  declarations: [
    AppComponent,
  
 
  
  ],
  imports: [
    NgxPaginationModule,
    MatTooltipModule,
    MatRadioModule,
    FilterPipeModule,
    BrowserModule,
    FormsModule,
    
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule
    ,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [IssueService,AuthGuardService, AuthGuardLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
