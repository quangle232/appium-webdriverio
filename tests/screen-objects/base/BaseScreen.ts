export class BaseScreen {
    constructor() {
    }

    /* ============ Methods =============== */
    async pressKeyBoard(keyName: string) {
        await browser.keys(keyName);
    }

    async getAttributeValue(locator: string, attribute: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        const attributeValue = await element.getAttribute(attribute);
        return attributeValue;
    }

    async getColor(locator: string, type = 'ios class chain') {
        const actualColor = await this.getAttributeValue(locator, 'color', type);
        return actualColor;
    }

    async getBackGroundColor(locator: string, type = 'ios class chain') {
        const actualColor = await this.getAttributeValue(locator, 'background-color', type);
        return actualColor;
    }

    async getBorderColor(locator: string, type = 'ios class chain') {
        const actualColor = await this.getAttributeValue(locator, 'border-color', type);
        return actualColor;
    }

    async waitAndClick(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.click();
        await browser.pause(1000);
    }

    async waitAndFill(locator: string, value: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.clearValue();
        await element.setValue(value);
        // const arrValue = [...value]; // This is for converting string to charArray
        // for (let i = 0; i < arrValue.length; i++) {
        //     browser.keys(arrValue[i]);
        //     browser.pause(200);
        // }
        await browser.pause(1000);
    }

    async waitAndSelectByValue(locator: string, value: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.selectByAttribute('value', value);
        await browser.pause(1000);
    }

    async waitAndSelectByLabel(locator: string, value: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.selectByVisibleText(value);
        await browser.pause(1000);
    }

    async waitAndSelectByIndex(locator: string, value: number, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await element.selectByIndex(value);
        await browser.pause(1000);
    }

    async waitAndGetText(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        let elementText = await element.getText();
        return elementText;
    }

    async clickIfElementDisplay(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        if (await element.isDisplayed()) {
            await element.click();
            await browser.pause(1000);
        }
    }

    async clickElementByCoordinates(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
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
        await browser.touchAction({ action: 'tap', x: endX, y: endY });
    }

    async clickOnCenterOfScreen() {
        const windowHeight = (await browser.getWindowSize()).height;
        const windowWidth = (await browser.getWindowSize()).width;
        await browser.touchAction({ action: 'tap', x: windowWidth / 2, y: windowHeight / 2 + 150 });
    }

    async isElementDisplayed(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        return element.isDisplayed();
    }

    /*==================Verification==============*/
    async checkExist(locator: string, type = 'ios class chain') {
        let _locator;
        if (type == 'ios class chain') {
            _locator = `-ios class chain:${locator}`;
        } else {
            _locator = locator;
        }
        return !!(await $$(_locator)).length;
    }

    async verifyTextContent(locator: string, text: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).toHaveTextContaining(text);
    }

    async verifyValueContent(locator: string, text: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        const value = await element.getAttribute('value');
        expect(value).toContain(text);
    }

    async verifyElementVisible(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).toBeDisplayed();
    }

    async verifyElementNotVisible(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).not.toBeDisplayed();
    }

    async verifyElementDisabled(locator: string, type = 'ios class chain') {
        let element;
        if (type == 'ios class chain') {
            element = await $(`-ios class chain:${locator}`);
        } else {
            element = await $(locator);
        }
        await expect(element).toBeDisabled();
    }
}
