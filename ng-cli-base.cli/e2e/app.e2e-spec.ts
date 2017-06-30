import { NgCliBase.CliPage } from './app.po';

describe('ng-cli-base.cli App', () => {
  let page: NgCliBase.CliPage;

  beforeEach(() => {
    page = new NgCliBase.CliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
