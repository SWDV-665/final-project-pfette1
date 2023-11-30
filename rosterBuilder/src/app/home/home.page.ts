import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { InputDialogService } from '../../providers/input-dialog.service';
import { RosterBuilderService } from '../../providers/roster-builder.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = "Roster Builder";

  constructor(
    private toastController: ToastController,
    public rosterBuilderService: RosterBuilderService,
    public inputDialogService: InputDialogService,
    public socialSharingService: SocialSharing) { }

  loadPlayers() {
   return this.rosterBuilderService.getPlayers();
  }

  async removePlayer(player: any, index: number) {
    const toast = await this.toastController.create({
      message: player.name + ' successfully removed',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();

    this.rosterBuilderService.removePlayer(index);
  }

  async textPlayer(player: any, index: number) {
    let message = "Welcome to the Team";
    let phoneNumber = player.phoneNumber;

    this.socialSharingService.shareViaSMS(message, phoneNumber).then(() => {
      console.log("Succesfully Shared");
    }).catch((error) => {
      console.error("Error while sharing", error);
    })

  }

  async addPlayer() {
    const toast = await this.toastController.create({
      message: 'Adding player...',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    this.inputDialogService.showPrompt(toast);
  }

  async editPlayer(player: any, index: number) {
    const toast = await this.toastController.create({
      message: 'Editing player...',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    this.inputDialogService.showPrompt(toast, player, index);
  }

}
