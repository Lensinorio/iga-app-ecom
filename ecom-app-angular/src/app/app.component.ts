import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public profile! : KeycloakProfile;
  constructor(public keycloakService : KeycloakService) {
  }

  ngOnInit(): void {
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
    }
  title = 'ecom-app-angular';

  async handleLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  handleLogout() {
    this.keycloakService.logout(window.location.origin);
  }
}
