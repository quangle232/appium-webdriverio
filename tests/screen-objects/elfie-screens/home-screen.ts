import { ElfieScreen } from './elfie-screen';
import { copyRight } from '../../../test-data/copy-right-content';

export class ElfieHomeScreen extends ElfieScreen {
    constructor() {
        super();
    }

    async getHomeScreenElements() {
        const homePageElementsIOS = {
            acceptCookiesBtn: '',
            hamburgerBtn: '',
            elfieLogo: '',
            copyRightLabel: '',
        };
        const homePageElementsAndroid = {
            acceptCookiesBtn: '',
            hamburgerBtn: '',
            elfieLogo: '',
            copyRightLabel: '',
        };
        const homePageElementsWeb = {
            acceptCookiesBtn: '[data-cky-tag=notice-buttons] .cky-btn-accept',
            hamburgerBtn: '.menu-button',
            elfieLogo: '.app-icon-holder img',
            copyRightLabel: '.text-block',
        };
        let homePageElements  = driver.isAndroid ? homePageElementsAndroid : homePageElementsIOS;
        if (await this.webViewCheck()){
            homePageElements = homePageElementsWeb;
        }
        return homePageElements;
    }

    async getMenuElements(){
        const menuElementsIOS = {
            closeBtn: ''
        };
        const menuElementsAndroid = {
            closeBtn: ''
        };
        const menuElementsWeb = {
            closeBtn: '.w--open'
        };
        let menuElements  = driver.isAndroid ? menuElementsAndroid : menuElementsIOS;
        if (await this.webViewCheck()){
            menuElements = menuElementsWeb;
        }
        return menuElements;
    }

    /* ============ Methods =============== */

    async acceptCookies(){
        await this.waitAndClick((await this.getHomeScreenElements()).acceptCookiesBtn);
    }

    async openMenu(){
        await this.waitAndClick((await this.getHomeScreenElements()).hamburgerBtn);
    }

    async closeMenu() {
        await this.waitAndClick((await this.getMenuElements()).closeBtn);
    }

    async getCopyRightContent() {
        const url = await driver.getUrl();
        const urlIncludeArray = url.split('.');
        if (urlIncludeArray.at(0)?.includes('vi')){
            return copyRight.vietnamese;
        }
        return copyRight.english;

    }
    /*==================Verification==============*/

    async verifyCloseButtonDisplay(){
        expect(this.verifyElementDisabled((await this.getMenuElements()).closeBtn));
    }

    async verifyElfieLogoDisplay(){
        expect(this.verifyElementDisabled((await this.getHomeScreenElements()).elfieLogo));
    }

    async verifyBottomCopyRightContent(){
        const copyRightElement = (await this.getHomeScreenElements()).copyRightLabel;
        this.scrollToElement(copyRightElement);
        this.verifyTextContent(copyRightElement, await this.getCopyRightContent());
    }
}
