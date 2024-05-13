import { KEY_CODE_ENTER, KEY_CODE_SEARCH } from '../../../helper/key-code';
import WebView, { CONTEXT_REF } from '../../../helper/web-view';
export class BaseScreen {
    automationType: string;

    constructor() {
        this.automationType = this.getAutomationType();
    }

    /* ============ Methods =============== */

    getAutomationType(){
        return driver.isAndroid? 'android' : 'ios class chain';
    }

    async pressKeyBoard(keyName: string) {
        await browser.keys(keyName);
    }

    async pressEnter(){
        await driver.pressKeyCode(KEY_CODE_ENTER);
    }

    async pressSearchKey(){
        await driver.pressKeyCode(KEY_CODE_SEARCH);
    }

    async webViewCheck(){
        const webView = new WebView();
        await webView.waitForWebViewContextLoaded();
        const currentContexts = await webView.getCurrentContexts();
        if (currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.WEBVIEW)) !== 'undefined') {
            return true;
        }
        return false;
    }

    async getAttributeValue(locator: string, attribute: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        const attributeValue = await element.getAttribute(attribute);
        return attributeValue;
    }

    async getColor(locator: string) {
        const actualColor = await this.getAttributeValue(locator, 'color');
        return actualColor;
    }

    async getBackGroundColor(locator: string) {
        const actualColor = await this.getAttributeValue(locator, 'background-color');
        return actualColor;
    }

    async getBorderColor(locator: string) {
        const actualColor = await this.getAttributeValue(locator, 'border-color');
        return actualColor;
    }

    async waitAndClick(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.click();
        await driver.pause(1000);
    }

    async waitAndFill(locator: string, value: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.clearValue();
        await element.setValue(value);
        // const arrValue = [...value]; // This is for converting string to charArray
        // for (let i = 0; i < arrValue.length; i++) {
        //     driver.keys(arrValue[i]);
        //     driver.pause(200);
        // }
        await driver.pause(1000);
    }

    async waitAndSelectByValue(locator: string, value: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.selectByAttribute('value', value);
        await driver.pause(1000);
    }

    async waitAndSelectByLabel(locator: string, value: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.selectByVisibleText(value);
        await driver.pause(1000);
    }

    async waitAndSelectByIndex(locator: string, value: number) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.selectByIndex(value);
        await driver.pause(1000);
    }

    async waitAndGetText(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        let elementText = await element.getText();
        return elementText;
    }

    async clickIfElementDisplay(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        if (await element.isDisplayed()) {
            await element.click();
            await driver.pause(1000);
        }
    }

    async clickElementByCoordinates(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        const startX = await element.getLocation('x');
        const additionX = await element.getSize('width') * 0.5;
        const endX = startX + additionX;
        const startY = await element.getLocation('y');
        const additionY = await element.getSize('height') * 0.5;
        const endY = startY + additionY;
        await driver.touchAction({ action: 'tap', x: endX, y: endY });
    }

    async clickOnCenterOfScreen() {
        const windowHeight = (await driver.getWindowSize()).height;
        const windowWidth = (await driver.getWindowSize()).width;
        await driver.touchAction({ action: 'tap', x: windowWidth / 2, y: windowHeight / 2 + 150 });
    }

    async isElementDisplayed(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        return element.isDisplayed();
    }

    async takeScreenshot(){
        await this.takeScreenshot();
    }

    async scrollToElement(locator: string){
        (await driver.$(locator)).scrollIntoView();
    }
    /*==================Verification==============*/
    async checkExist(locator: string) {
        let _locator;
        if (this.automationType == 'ios class chain') {
            _locator = `-ios class chain:${locator}`;
        } else {
            _locator = locator;
        }
        return !!(await $$(_locator)).length;
    }

    async verifyTextContent(locator: string, text: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).toHaveTextContaining(text);
    }

    async verifyValueContent(locator: string, text: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        const value = await element.getAttribute('value');
        expect(value).toContain(text);
    }

    async verifyElementVisible(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).toBeDisplayed();
    }

    async verifyElementNotVisible(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).not.toBeDisplayed();
    }

    async verifyElementDisabled(locator: string) {
        let element;
        if (this.automationType == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).toBeDisabled();
    }

}
