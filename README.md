## Installation

1. Running `git clone https://github.com/quangle232/appium-webdriverio.git`
2. Running `npm install`
3. Installing Appium on a local machine [here](./docs/APPIUM.md)
4. Setting up Android and iOS on a local machine [here](./docs/ANDROID_IOS_SETUP.md)
5. Making demo app available. Create a `./apps` directory. Download the app files (.app / .apk) with version >= `0.4.0` [here](https://github.com/webdriverio/native-demo-app/6eleases). Move the files into the directory `apps`.
6. `appium driver install xcuitest` to install iOS driver.
7. Running tests `npm run ios.app` or `npm run ios.browser` for iOS. `npm run android.app` or `npm run android.browser` for Android.

## Configuration files

This repository uses a specific config for iOS and Android, see [configs](./config). The configs are based on a shared config
[`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts).
This shared config holds **all the defaults** so the iOS and Android configs only need to hold the capabilities and specs that are needed
for running on iOS and or Android (app or browser).

Please check the [`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts)-file for the minimal configuration options. Notes are added for why
a different value has been selected in comparison to the default values WebdriverIO provides.

Since we do not have Appium installed as part of this package we are going to use the globally installed version of Appium. This is
configured in [`wdio.shared.local.appium.conf.ts`](./config/wdio.shared.local.appium.conf.ts).

## Locator strategy for native apps

The locator strategy for this code is to use `accessibilityID`'s, see also the
[WebdriverIO docs](https://webdriver.io/docs/selectors#accessibility-id) or this newsletter on
[AppiumPro](https://appiumpro.com/editions/20).
`accessibilityID`'s make it easy to script once and run on iOS and Android because most of the apps already have some `accessibilityID`'s.

If `accessibilityID`'s can't be used, and for example only XPATH is available, then the following setup could be used to make cross-platform
selectors

```js
const SELECTORS = {
    WEB_VIEW_SCREEN: browser.isAndroid
        ? "*//android.webkit.WebView"
        : "*//XCUIElementTypeWebView",
};
```

## Native App Tests

All tests can be executed on te devices as configured in [`wdio.android.app.conf.ts`](./config/wdio.android.app.conf.ts) or
[`wdio.ios.app.conf.ts`](./config/wdio.ios.app.conf.ts). Please check the below tests on what they do or on how to run them separately.

```sh
# For Android local execution
npm run android.app

# For iOS local execution
npm run ios.app
```
## Automating Chrome or Safari

Mobile web automation is almost the same as writing tests for desktop browsers. The only difference can be found in the configuration that
needs to be used. Click [here](config/wdio.ios.browser.conf.ts) to find the config for iOS Safari and
[here](config/wdio.android.browser.conf.ts) for Android Chrome.
For Android be sure that the latest version of Chrome is installed, see also
[here](./docs/FAQ.md#i-get-the-error-no-chromedriver-found-that-can-automate-chrome-). Our
[`wdio.shared.local.appium.conf.ts`](./config/wdio.shared.local.appium.conf.ts) uses the `relaxedSecurity: true` argument from Appium which
will allow Appium to automatically download the latest ChromeDriver.

### Sauce Labs

If you want to run the Native App tests on Sauce Labs you need to do 2 things:

-   Add the [Sauce Service](#add-sauce-service) to your project
-   Upload the apps to the [Sauce Labs Storage](#upload-apps-to-sauce-storage)

When the above has been executed you can follow the steps in:

- [Installation](#installation)
- [Configuration files](#configuration-files)
- [Locator strategy for native apps](#locator-strategy-for-native-apps)
- [Native App Tests](#native-app-tests)
- [Automating Chrome or Safari](#automating-chrome-or-safari)
  - [Sauce Labs](#sauce-labs)
  - [BrowserStack](#browserstack)

Please check the following configs to verify the configurations:

-   [Android Emulators](./config/saucelabs/wdio.android.emulators.app.conf.ts)
-   [iOS Simulators](./config/saucelabs/wdio.ios.simulators.app.conf.ts)

The following scripts that can be used, see the [`package.json`](./package.json), to execute the tests in the cloud:

```sh
# For Android Emulators
# On EU DC
npm run android.sauce.emulators.app.eu
# On US DC
npm run android.sauce.emulators.app.us
# For Android Real Devices
# On EU DC
npm run android.sauce.rdc.app.eu
# On US DC
npm run android.sauce.rdc.app.us

# For iOS
# On EU DC
npm run ios.sauce.simulator.app.eu
# On US DC
npm run ios.sauce.simulator.app.us
```

### BrowserStack

This boilerplate provides a setup for testing with BrowserStack. Please check the [BrowserStack](./config/browserstack)-folder to see the
setup for iOS and Android.

Make sure you install the latest version of the `@wdio/browserstack-service` with

```shell
npm install --save-dev @wdio/browserstack-service
```

There are 2 scripts that can be used, see the [`package.json`](./package.json), to execute the tests in the cloud:

```sh
# For iOS
$ npm run ios.browserstack.app

# For Android
$ npm run android.browserstack.app
```
