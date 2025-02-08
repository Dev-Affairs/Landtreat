import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    let configFile = "/app/assets/configs/appConfig.json";
    // if(window.location.href.includes("localhost")){
    //   configFile = '/assets/configs/appConfig.json'
    // }
    // else{
    //   configFile = '/app/assets/configs/appConfig.json'
    // }
    return this.http.get(configFile)
  }

  set(key: string) {
    return this.config[key];
  }

  setAppConfig(config: any) {
    return this.config = config;
  }

  get(key: string) {
    return this.config[key];
  }
}
