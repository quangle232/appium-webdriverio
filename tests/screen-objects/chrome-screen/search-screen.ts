import { BaseScreen } from '../base/BaseScreen';

export class SearchScreen extends BaseScreen {
    constructor() {
        super();
    }

    async getsearchTextAreaElements() {
        const searchTextAreaElementsIOS = {
            searchTextArea: ''
        };
        const searchTextAreaElementsAndroid = {
            searchTextArea: ''
        };
        const searchTextAreaElementsWeb = {
            searchTextArea: '//textarea[@aria-describedby]'
        };
        let headerElements  = driver.isAndroid ? searchTextAreaElementsAndroid : searchTextAreaElementsIOS;
        if (await this.webViewCheck()){
            headerElements = searchTextAreaElementsWeb;
        }
        return headerElements;
    }

    async searchWithText(text: string){
        await this.waitAndFill((await this.getsearchTextAreaElements()).searchTextArea, text);
        await this.pressEnter();
    }
}
