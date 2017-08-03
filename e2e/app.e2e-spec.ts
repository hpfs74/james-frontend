import { AngularCliMigratePage } from './app.po';

describe('angular-cli-migrate App', () => {
  let page: AngularCliMigratePage;

  beforeEach(() => {
    page = new AngularCliMigratePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
