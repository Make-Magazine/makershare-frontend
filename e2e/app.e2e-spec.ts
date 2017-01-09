import { MakerPage } from './app.po';

describe('maker App', function() {
  let page: MakerPage;

  beforeEach(() => {
    page = new MakerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
