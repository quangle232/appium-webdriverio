import { join } from 'path';
import config from './wdio.shared.local.appium.conf';

// ============
// Specs
// ============
config.specs = ['./tests/specs/**/**.spec.ts'];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'iOS',
        maxInstances: 1,
        // For W3C the appium capabilities need to have an extension prefix
        // This is `appium:` for all Appium Capabilities which can be found here
        // http://appium.io/docs/en/writing-running-appium/caps/
        'appium:deviceName': 'iPad Pro (12.9-inch) (6th generation)',
        'appium:platformVersion': '17.0',
        'appium:orientation': 'LANDSCAPE',
        'appium:automationName': 'XCUITest',
        // The path to the app
        'appium:app': join(process.cwd(), 'file-path'),
        'appium:newCommandTimeout': 240,
        'appium:noReset': true,
    },
];

exports.config = config;
