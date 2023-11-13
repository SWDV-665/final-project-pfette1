import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RosterBuilderService } from './roster-builder.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(
    private alertController: AlertController,
    public rosterBuilderService: RosterBuilderService
  ) { }

  async showPrompt(toast: HTMLIonToastElement, player?: any, index?: number) {
    const alert = await this.alertController.create({
      header: player ? 'Edit Player' : 'Add Player',
      subHeader: player ? 'Please edit player...' : 'Please enter a player...',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
          }
        },
        {
          text: 'Save',
          handler: (player: any) => {
            if (index !== undefined) {
              this.rosterBuilderService.editPlayer(player, index);
            } else {
              this.rosterBuilderService.addPlayer(player)
            }
            toast.present();
          }
        }
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: player ? player.name : null
        },
        {
          name: 'contactName',
          placeholder: 'Contact Name',
          value: player ? player.contactName : null
        },
        {
          name: 'phoneNumber',
          placeholder: 'Phone Number',
          value: player ? player.phoneNumber: null
        }
      ]
    });

    await alert.present();
  }
}
