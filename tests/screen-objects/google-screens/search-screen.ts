import { GoogleScreen } from './google-screen';

export class GoogleSearchScreen extends GoogleScreen {
    constructor() {
        super();
    }

    async getSearchTextAreaElements() {
        const searchTextAreaElementsIOS = {
            searchTextArea: ''
        };
        const searchTextAreaElementsAndroid = {
            searchTextArea: ''
        };
        const searchTextAreaElementsWeb = {
            searchTextArea: '//textarea[@aria-describedby]'
        };
        let searchTextAreaElements  = driver.isAndroid ? searchTextAreaElementsAndroid : searchTextAreaElementsIOS;
        if (await this.webViewCheck()){
            searchTextAreaElements = searchTextAreaElementsWeb;
        }
        return searchTextAreaElements;
    }

    async searchWithText(text: string){
        await this.waitAndFill((await this.getSearchTextAreaElements()).searchTextArea, text);
        await this.pressEnter();
    }
}
