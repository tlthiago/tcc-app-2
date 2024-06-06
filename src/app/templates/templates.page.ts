import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-templates',
  templateUrl: 'templates.page.html',
  styleUrls: ['templates.page.scss'],
})
export class TemplatesPage {
  @ViewChild(IonModal) modal: IonModal;

  message = "teste";
  name: string;
  selectedFile: File;

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

}
