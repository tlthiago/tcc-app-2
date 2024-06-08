import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UserService } from '../services/user.service';
import { createIUser, IUser, IAuthenticatedUserData } from 'src/models/user.model';
import { FormBuilder, FormGroup, Validators
 } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public user: IUser = createIUser();
  authUserData: IAuthenticatedUserData;
  userData: IUser;
  form: FormGroup;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router
  ) {}

  // get uid() {
  //   return this.form.get('uid');
  // }

  get nome() {
    return this.form.get('nome');
  }

  get tema() {
    return this.form.get('tema');
  }

  get curso() {
    return this.form.get('curso');
  }

  get universidade() {
    return this.form.get('universidade');
  }

  get genero() {
    return this.form.get('genero');
  }

  get dataNascimento() {
    return this.form.get('dataNascimento');
  }

  async ngOnInit() {
    this.authUserData = await this.userService.getAuthenticatedUserData();
    
    const uid: string = this.authUserData.uid;

    this.getUserData(uid);
    
    this.form = this.formBuilder.group({
      uid: [this.authUserData.uid],
      nome: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      sobrenome: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      dataNascimento: ['', 
        Validators.compose([
          Validators.required
        ])
      ],
      genero: ['', 
        Validators.compose([
          Validators.required
        ])
      ],
      tema: ['', 
        Validators.compose([
          Validators.required
        ])
      ],
      curso: ['', 
        Validators.compose([
          Validators.required
        ])
      ],
      universidade: ['', 
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }

  getUserData(uid: string) {
    this.userService.getUser(uid).then(userData => {
      this.userData = userData;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {    
    const loading = await this.loadingController.create();
    await loading.present();

    this.authUserData = await this.userService.getAuthenticatedUserData();
    const uid: string = this.authUserData.uid;

    const user = await this.userService.updateUser(uid, this.form.value);
    await loading.dismiss();

    if (user) {
      this.modal.dismiss(this.name, 'confirm');
      // this.getUserData(user.uid);
      this.showAlert('Sucesso no registro', 'Dados armazenados com sucesso!');
    } else {
      this.modal.dismiss(this.name, 'confirm');
      this.showAlert('Falha no registro', 'Tente novamente!');
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

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `Hello, ${ev.detail.data}!`;
  //   }
  // }  
}