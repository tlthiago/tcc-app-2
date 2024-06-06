import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
    await loading.dismiss();
  }

}
