import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/users/users.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Firebase Admin: https://firebase.google.com/docs/admin/setup
// import { applicationDefault, initializeApp as initializeAppAdmin } from 'firebase-admin/app';


// NgModel
import { FormsModule } from '@angular/forms';

// Http provider
import { HttpClientModule } from '@angular/common/http';

// Dependency animation for some PrimeNg components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { UserAccountComponent } from './pages/users/account/user-account.component';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from './libs/modal/modal.component';
import { UserTaskEditComponent } from './pages/user-task/edit/user-task-edit.component';
import { UserEditComponent } from './pages/users/edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserTasksComponent,
    UserTaskComponent,
    UserAccountComponent,
    ModalComponent,
    UserTaskEditComponent,
    UserEditComponent
  ],
  imports: [
    // NgModule
    FormsModule,

    HttpClientModule,

    BrowserAnimationsModule,

    // PrimeNg Components
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    FileUploadModule,
    TableModule,
    PaginatorModule,
    DialogModule,

    BrowserModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
