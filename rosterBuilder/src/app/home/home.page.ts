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
  players: any = [];
  errorMessage: string = "";

  constructor(
    private toastController: ToastController,
    public rosterBuilderService: RosterBuilderService,
    public inputDialogService: InputDialogService) {
    rosterBuilderService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadPlayers();
    });
  }

  ionViewWillEnter() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.rosterBuilderService.getPlayers().subscribe(
      players => this.players = players,
      error => this.errorMessage = <any>error
    )
  }

  async removePlayer(player: any, id: any) {
    const toast = await this.toastController.create({
      message: player.name + ' successfully removed',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();

    this.rosterBuilderService.removePlayer(id);
  }

  async addPlayer() {
    const toast = await this.toastController.create({
      message: 'Adding player...',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    this.inputDialogService.showUpsertPlayerPrompt(toast);
  }

  async messageTeam() {
    const toast = await this.toastController.create({
      message: 'Sending Message...',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    //message service takes a comma delimited list of phone numbers for sharing
    var teamPhoneNumbers = this.players.map(function (player: { phoneNumber: any; }) {
      return player.phoneNumber;
    }).join(', ');

    this.inputDialogService.showMessageTeamPrompt(toast, teamPhoneNumbers);
  }

  async editPlayer(player: any, index: number, id: any) {
    const toast = await this.toastController.create({
      message: 'Editing player...',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    this.inputDialogService.showUpsertPlayerPrompt(toast, player, index, id);
  }

}
