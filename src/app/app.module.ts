import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from 'node_modules/@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }, 
    provideFirebaseApp(() => initializeApp({
      "projectId":"tcc-app-faadc",
      "appId":"1:265205191210:web:287b57dccc0e3e5808a953",
      "databaseURL":"https://tcc-app-faadc-default-rtdb.firebaseio.com",
      "storageBucket":"tcc-app-faadc.appspot.com",
      "apiKey":"AIzaSyBJyT7TP-NOvpHl617G1NE-PXsyQEGAWIc",
      "authDomain":"tcc-app-faadc.firebaseapp.com",
      "messagingSenderId":"265205191210"})
    ), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
