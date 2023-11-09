import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = "Roster Builder";

  players = [
    {
      name: "Jackson",
      contactName: "Patrick",
      phoneNumber: "5025553570"
    },
    {
      name: "Sammy",
      contactName: "John",
      phoneNumber: "5029868959"
    },
    {
      name: "Levi",
      contactName: "Eric",
      phoneNumber: "5029868794"
    }
  ]

  public alertButtons = [
    {
      text: 'Cancel',
      handler: (data: any) => {
      }
    },
    {
      text: 'Save',
      handler: (player: any) => {
        this.players.push(player);
      }
    }
  ];

  public alertInputs = [
    {
      name: 'name',
      placeholder: 'Name'
    },
    {
      contactName: 'contactName',
      placeholder: 'Contact Name'
    },
    {
      name: 'phoneNumber',
      placeholder: 'Phone Number'
    }
  ];

  constructor(private toastController: ToastController) {}

  async removePlayer(player: any, index: number) {
    const toast = await this.toastController.create({
      message: player.name + ' successfully removed',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();

    this.players.splice(index, 1);
  }

}
