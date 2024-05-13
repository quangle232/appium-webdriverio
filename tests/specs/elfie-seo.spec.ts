import { ElfieHomeScreen } from '../screen-objects/elfie-screens/home-screen';
import { GoogleSearchResultsScreen } from '../screen-objects/google-screens/search-result-screen';
import { GoogleSearchScreen } from '../screen-objects/google-screens/search-screen';
import { searchData } from '../../test-data/search-data';

describe('Elfie SEO', () => {

    const googleSearchScreen = new GoogleSearchScreen();
    const googleSearchResultScreen = new GoogleSearchResultsScreen();
    const elfieHomeScreen = new ElfieHomeScreen();

    it('should be able to search for Elfie on google and access to Elfie website on top of search result list', async () => {
        await driver.url('/');
        await googleSearchScreen.searchWithText(searchData);
        await googleSearchResultScreen.selectResultByIndex(0);
        await elfieHomeScreen.acceptCookies();
        await driver.takeScreenshot();
        await elfieHomeScreen.verifyElfieLogoDisplay();
    });

    it('should be able to open and close menu button', async () => {
        await elfieHomeScreen.openMenu();
        await driver.takeScreenshot();
        await elfieHomeScreen.verifyCloseButtonDisplay();
    });

    it('should display correct content for copy right', async () => {
        await elfieHomeScreen.closeMenu();
        await elfieHomeScreen.verifyBottomCopyRightContent();
    });

});
