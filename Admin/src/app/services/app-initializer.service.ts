import { Injectable } from '@angular/core';
import { SessionManagerService } from './session-manager.service';
import { AuthService } from './auth.service';
import {ConfigService} from './config.service'
@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private sessionManager: SessionManagerService,private authService: AuthService, public configService: ConfigService) {
    // Inject other services here
  }

  initialize(): Promise<void> {
    return new Promise((resolve) => {

      // this.authService.clearLocalStorageData()
      this.configService.loadConfig().subscribe((config: any)=>{
        console.log("loadConfig--", config)
        if(config){
          this.configService.setAppConfig(config)
        }
        console.log('AppInitializer has run');
        resolve();
      })
    });
  }
}
