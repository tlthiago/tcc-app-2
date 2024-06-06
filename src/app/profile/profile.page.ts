import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  constructor(private userService: UserService) {}

  message = "teste";
  name: string;
  selectedFile: File;
  userData: any;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile.name);
    }
  }

  async ngOnInit() {
    this.userData = await this.userService.getAuthenticatedUserData();
    console.log(this.userData);
  }
}