import { BaseScreen } from '../base/BaseScreen';
import WebView, { CONTEXT_REF } from '../../../helper/web-view';
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
}
