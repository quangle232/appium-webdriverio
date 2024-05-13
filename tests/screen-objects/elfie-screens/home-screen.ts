import { ElfieScreen } from './elfie-screen';

export class ElfieHomeScreen extends ElfieScreen {
    constructor() {
        super();
    }

    async getHomeScreenElements() {
        const homePageElementsIOS = {
            hamburgerBtn: '',
            elfieLogo: '',
            copyRightLabel: '',
        };
        const homePageElementsAndroid = {
            hamburgerBtn: '',
            elfieLogo: '',
            copyRightLabel: '',
        };
        const homePageElementsWeb = {
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

    async openMenu(){
        await this.waitAndClick((await this.getHomeScreenElements()).hamburgerBtn);
    }

    async closeMenu() {
        await this.waitAndClick((await this.getMenuElements()).closeBtn);
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
        this.verifyTextContent(copyRightElement, 'Bản quyền © 2024 Elfie Pte. Ltd.');
    }
}
