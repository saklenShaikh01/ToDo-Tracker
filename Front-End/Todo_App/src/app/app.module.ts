import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SigninComponent } from './pages/signin/signin.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './pages/login/login.component';
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialogModule} from '@angular/material/dialog';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import { AddtodoComponent } from './pages/addtodo/addtodo.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NavbarComponent } from './pages/navbar/navbar.component'; 
import {LayoutModule} from '@angular/cdk/layout'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewTodoComponent } from './pages/view-todo/view-todo.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { ViewArchieveComponent } from './view-archieve/view-archieve.component';
import { SearchTodoComponent } from './search-todo/search-todo.component';
import { PrioritiesComponent } from './priorities/priorities.component'; 
import{MatPaginatorModule} from '@angular/material/paginator';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CompletedTodosComponent } from './pages/completed-todos/completed-todos.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { ArchiveDetailsComponent } from './archive-details/archive-details.component';
import { CompleteDetailsComponent } from './complete-details/complete-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactService } from './services/contact.service';
// import { UpdateProfileComponent } from './update-profile/update-profile.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    LoginComponent,
    UserDashboardComponent,
    AddtodoComponent,
    NavbarComponent,
    ViewTodoComponent,
    SideNavbarComponent,
    TodoDetailsComponent,
    UpdateTodoComponent,
    ViewArchieveComponent,
    SearchTodoComponent,
    PrioritiesComponent,
    ViewProfileComponent,
    ForgetPasswordComponent,
    CompletedTodosComponent,
    FooterComponent,
    AboutComponent,
    DialogContentExampleDialogComponent,
    DialogContentComponent,
    ArchiveDetailsComponent,
    CompleteDetailsComponent,
    ContactUsComponent,
    
    // UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatCardModule,
    NgbModule,
    MatTabsModule,
    FormsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatChipsModule,
    MatPaginatorModule,
    HttpClientModule, MatSnackBarModule,MatIconModule,MatDialogModule,MatMenuModule,MatSidenavModule,MatDatepickerModule,LayoutModule,MatExpansionModule
    
  ],
  providers: [
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
