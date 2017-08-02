import { Settings } from './';

export class Singleton{
  private static _instance:Singleton;
  private _settings:Settings;

  constructor() {
    this._settings = new Settings();
  }

  static get Instance() {
    if (this._instance === null || this._instance === undefined) {
      this._instance = new Singleton();
    }
    return this._instance;
  }

  static get Settings (){
    return this.Instance._settings;
  }
}
