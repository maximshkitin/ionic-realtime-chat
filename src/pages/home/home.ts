import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../../pages/chat/chat';
import { AlertController } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string = '';

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  showAlert(title: string, errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }

  loginUser() {
    let regex = /^[a-zA-Z0-9]+$/;

    if (regex.test(this.username)) {
      this.navCtrl.push(ChatPage, 
        {
          username: this.username,
        })

    } else {
      this.showAlert('Incorrect Username!', 'Please retry.');
    }
  }


}
