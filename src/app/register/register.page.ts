import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validacoes } from '../utils/validacoes';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private LoadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get nome() {
    return this.form.get('nome');
  }

  get sobrenome() {
    return this.form.get('sobrenome');
  }

  get dia() {
    return this.form.get('dia');
  }

  get mes() {
    return this.form.get('mes');
  }

  get ano() {
    return this.form.get('ano');
  }

  get genero() {
    return this.form.get('genero');
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  get senhaConfirm() {
    return this.form.get('senhaConfirm');
  }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      nome: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ])
      ],
      sobrenome: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ],
      dia: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2)
        ])
      ],
      mes: ['',
        Validators.compose([
          Validators.required,
        ])
      ],
      ano: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ])
      ],
      // dataNascimento: ['',
      //   Validators.compose([
      //     Validators.required
      //   ])
      // ],
      genero: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      // celular: ['',  ],
      email: ['', 
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      senha: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validacoes.senhasCombinam('senhaConfirm', true)
        ])
      ],
      senhaConfirm: ['', 
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validacoes.senhasCombinam('senha', true)
      ])
      ],
    })
  }

  async register() {
    const loading = await this.LoadingController.create();
    await loading.present();

    const user = await this.authService.register(this.form.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/bookmarks', { replaceUrl: true });
    } else {
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

}