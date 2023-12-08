import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RosterBuilderService } from './roster-builder.service';
import { SocialsharingService } from './socialsharing.service'

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(
    private alertController: AlertController,
    public rosterBuilderService: RosterBuilderService,
    public socialSharingService: SocialsharingService
  ) { }

  async showUpsertPlayerPrompt(toast: HTMLIonToastElement, player?: any, index?: number, id?: any) {
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
              this.rosterBuilderService.editPlayer(player, index, id);
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

  async showMessageTeamPrompt(toast: HTMLIonToastElement, teamPhoneNumbers: any) {
    var message = "";
    const alert = await this.alertController.create({
      header: 'Message Team',
      subHeader: '',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
          }
        },
        {
          text: 'Send',
          handler: (message: any) => {
            this.socialSharingService.textPlayer(teamPhoneNumbers, message);
           
            toast.present();
          }
        }
      ],
      inputs: [
        {
          name: 'Message',
          placeholder: 'Type Message',
          value: message
        }
      ]
    });

    await alert.present();
  }
}
