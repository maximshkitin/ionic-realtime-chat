import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  date: number;
  username: string = '';
  message: string = '';
  subscription: any;
  previousMessages: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.username = this.navParams.get('username');

    this.subscription = this.db.list(`/chat`).subscribe( data => {
      this.previousMessages = data;
    })
  }

  sendMessage(){
    if (this.message == '') return;
    this.date = new Date().getTime();
    this.db.list('/chat').push({
      username: this.username,
      message: this.message,
      date: this.date
    }).then( () => {
      // the message is sent
    }).catch( () => {
      // the error
    });

    this.message = '';
  }

  ionViewDidLoad() {
    this.db.list('/chat').push({
      statusMessage: true,
      username: this.username,
      message: ` has joined the room`
    })
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.db.list('/chat').push({
      statusMessage: true,
      username: this.username,
      message: ` has left the room`
    })
  }

}
