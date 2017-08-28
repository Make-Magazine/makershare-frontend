import { Settings } from './settings';

export class Singleton {
  private static instance: Singleton;
  private settings: Settings;

  constructor() {
    this.settings = new Settings();
  }

  static get Instance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }

  static get Settings() {
    return this.Instance.settings;
  }
}
