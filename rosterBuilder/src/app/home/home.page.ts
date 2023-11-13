import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { InputDialogService } from '../../providers/input-dialog.service';
import { RosterBuilderService } from '../../providers/roster-builder.service';

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
    public inputDialogService: InputDialogService) { }

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
