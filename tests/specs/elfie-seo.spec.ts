import { SearchScreen } from '../screen-objects/chrome-screen/search-screen';

describe('Elfie SEO', () => {

    it('should be able to search for Elfie on google', async () => {
        const searchScreen = new SearchScreen();
        await driver.url('/');
        await searchScreen.searchWithText('Elfie');
        await driver.pause(10000);
    });

});
