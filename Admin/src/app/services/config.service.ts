import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    let configFile;
    return this.http.get('../assets/configs/appConfig.json')
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
