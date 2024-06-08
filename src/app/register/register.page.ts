import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Validacoes } from '../utils/validacoes';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  get nome() {
    return this.form.get('nome');
  }

  get sobrenome() {
    return this.form.get('sobrenome');
  }

  get genero() {
    return this.form.get('genero');
  }

  get dataNascimento() {
    return this.form.get('dataNascimento');
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

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
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
      ],
      email: ['', 
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: ['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ])
      ]
    })
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.form.value);

    if (user) {
      const uid = user.user.uid;
      
      const { 
        nome,
        sobrenome,
        dataNascimento,
        genero,
        tema,
        curso,
        universidade
      } = this.form.value;
      
      const registerData = { 
        uid,
        nome,
        sobrenome,
        dataNascimento,
        genero,
        tema,
        curso,
        universidade
      };
      
      const createdUser = await this.userService.createUser(registerData);
      await loading.dismiss();

      if (createdUser) {        
        this.router.navigateByUrl('/login', { replaceUrl: true });
      } else {
        await loading.dismiss();
        this.showAlert('Falha no registro dos dados', 'Tente novamente!');
      }
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