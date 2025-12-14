import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObject/homePage.js";
import expectHomePage from "../testData/homePage";
import expectNewItemPage from "../testData/newItemPage.js";
import globalData from "../testData/globalData.js";



test.describe("US_01.001 | New Item > Create a new item", () => {
	test("RF_01.001.01 | Verify the button 'New Item' is visible", async ({ page }) => {
		const homePage = new HomePage(page); 
        await expect(homePage.getLocatorNewItem()).toBeVisible();
	});

    test("RF_01.001.02 | Verify new project creation", async ({ page }) => {
        const homePage = new HomePage(page);
        const newItemPage = await homePage.clickNewItem();
        await newItemPage.fillJenkinsInput(globalData.projectFreestyleName);
        await newItemPage.clickFreestyleProject();
        const configureFreestileProject = await newItemPage.clickOkButton(globalData.configurePageName.freestyleProject);
        await configureFreestileProject.clickJenkinsLogo();

        expect(homePage.getLocatorItemName()).toContainText(globalData.projectFreestyleName);
    });

    test("TC_01.001.03 | Verify that home page displays correct welcome title", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorWelcomeTitle()).toHaveText(expectHomePage.welcomeTitle);
    });

    test("TC_01.001.04 | Verify that home page displays correct welcome description", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorDescriptionForWelcomeTitle()).toHaveText(expectHomePage.descriptionForWelcomeTitle);
    });

    test("TC_01.001.05 | Verify that home page displays correct start building title", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorStartBuildingTitle()).toHaveText(expectHomePage.startBuildingSection.title);
    });

    test("TC_01.001.06 | Verify that home page displays correct 'Create Job Name' link", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorCreateJobLink()).toHaveText(expectHomePage.startBuildingSection.createJobNameLink);
    });

    test("TC_01.001.07 | Verify that 'Create Job Name' link navigates to New Item page", async ({page}) => {
        const homePage = new HomePage(page);
        homePage.clickCreateJobLink();
        await expect(page).toHaveURL(expectNewItemPage.url);
    });

    test("TC_01.001.08 | Verify that home page displays correct distributed build section title", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorDistributedBuildTitle()).toHaveText(expectHomePage.distributedBuildSection.title);
    });

    test("TC_01.001.9 | Verify distributed build section links", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorDistributedBuildLinks()).toHaveText(expectHomePage.distributedBuildSection.getListNameDistributedBuildSectionLink());
    });
    
    // 5. Вынести футер в layout
    // 6. Написание тестов на футер.
});