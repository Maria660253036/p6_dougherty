import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth';
import firebase from 'firebase';
import { RegisterPage } from '../pages/register/register';
import { OrderPage } from '../pages/order/order';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  loginPage = LoginPage;
  registerPage = RegisterPage;
  orderPage = OrderPage
  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
     private menuCtrl: MenuController,
     private authService: AuthService) {
      firebase.initializeApp({
        apiKey: "AIzaSyC3wg26oh10ZXDO7a9S6axhIzMJvQczv34",
        authDomain: "p6-dougherty.firebaseapp.com"
      });
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.isAuthenticated = true;
          this.rootPage = OrderPage;
        }
        else {
        this.isAuthenticated = false;
        this.rootPage = HomePage;
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(HomePage);
  }
}

