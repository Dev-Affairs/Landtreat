import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get('/app/assets/configs/appConfig.json')
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
