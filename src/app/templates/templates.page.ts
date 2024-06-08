import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { ModelsService } from '../services/models.service';
import { IModels } from 'src/models/models.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: 'templates.page.html',
  styleUrls: ['templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  models: IModels[] = [];
  form: FormGroup;
  name: string;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modelsService: ModelsService
  ) {}

  get titulo() {
    return this.form.get('titulo');
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get formato() {
    return this.form.get('formato');
  }

  get arquivo() {
    return this.form.get('arquivo');
  }

  ngOnInit(): void {
    this.modelsService.getModels().subscribe(models => {
      this.models = models;
    });

    this.form = this.formBuilder.group({
      titulo: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ])
      ],
      descricao: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ],
      formato: ['', 
        Validators.compose([
          Validators.required
        ])
      ],
      arquivo: ['', 
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile.name);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    const loading = await this.loadingController.create();
    await loading.present();

    const model = await this.modelsService.createModels(this.form.value);

    if (model) {
      await loading.dismiss();
      this.modal.dismiss(this.name, 'confirm');
      this.showAlert('Sucesso no registro', 'Modelo inserido com sucesso!');
    } else {
      await loading.dismiss();
      this.showAlert('Falha no registro do usuário', 'Tente novamente!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
