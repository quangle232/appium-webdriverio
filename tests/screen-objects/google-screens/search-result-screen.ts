import { GoogleScreen } from './google-screen';

export class GoogleSearchResultsScreen extends GoogleScreen {
    constructor() {
        super();
    }

    async getSearchResultTableElements() {
        const searchResultTableElementsIOS = {
            allResultsSncDataArray: 'ios class chain'
        };
        const searchResultTableElementsAndroid = {
            allResultsSncDataArray: 'android uiautomator2'
        };
        const searchResultTableElementsWeb = {
            allResultsSncDataArray: 'a[role=presentation]'
        };
        let searchResultTableElements  = driver.isAndroid ? searchResultTableElementsAndroid : searchResultTableElementsIOS;
        if (await this.webViewCheck()){
            searchResultTableElements = searchResultTableElementsWeb;
        }
        return searchResultTableElements;
    }

    async selectResultByIndex(index: number) {
        const resultsArray =  await driver.$$((await this.getSearchResultTableElements()).allResultsSncDataArray);
        await resultsArray.at(index)?.click();
    }
}
