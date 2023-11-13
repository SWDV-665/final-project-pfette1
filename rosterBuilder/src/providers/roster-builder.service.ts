import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosterBuilderService {

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

  constructor() { }

  getPlayers() {
    return this.players;
  }

  addPlayer(player: any) {
    this.players.push(player);
  }

  removePlayer(index: number) {
    this.players.splice(index, 1);
  }

  editPlayer(player: any, index: number) {
    this.players[index] = player;
  }
}
