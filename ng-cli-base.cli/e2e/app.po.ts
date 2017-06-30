import { browser, by, element } from 'protractor';

export class NgCliBase.CliPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
