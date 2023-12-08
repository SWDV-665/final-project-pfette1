import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

@Injectable({
  providedIn: 'root'
})
export class SocialsharingService {

  constructor(public socialSharingService: SocialSharing) { }

  async textPlayer(teamPhoneNumbers: any, message: string) {
    this.socialSharingService.shareViaSMS(teamPhoneNumbers, message).then(() => {
      console.log("Succesfully Shared");
    }).catch((error) => {
      console.error("Error while sharing", error);
    })

  }
}


