import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObject/homePage.js";
import expectHomePage from "../testData/homePage";
import { projectName } from "../testData/projectName.js";
import { text } from "stream/consumers";


test.describe("US_01.001 | New Item > Create a new item", () => {
	test("RF_01.001.01 | Verify the button 'New Item' is visible", async ({ page }) => {
		const homePage = new HomePage(page); 
        await expect(homePage.getLocatorNewItem()).toBeVisible();
	});

    test("RF_01.001.02 | Verify new project creation", async ({ page }) => {
        const homePage = new HomePage(page);
        const newItemPage = await homePage.clickNewItem();
        await newItemPage.fillJenkinsInput(projectName);
        await newItemPage.clickFreestyleProject();
        const configureFreestileProject = await newItemPage.clickOkButton();
        await configureFreestileProject.clickJenkinsLogo();

        expect(homePage.getLocatorItemName()).toContainText(projectName);
    });

    test("TC_01.001.03 | Verify that home page displays correct welcome title", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorWelcomeTitle()).toHaveText(expectHomePage.welcomeTitle);
    });

    test("TC_01.001.04 | Verify that home page displays correct welcome description", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorDescriptionForWelcomeTitle()).toHaveText(expectHomePage.descriptionForWelcomeTitle);
    });

    // 3. Отображение заголовков h2
    test("TC_01.001.05 | Verify that home page displays correct start building title", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorStartBuildingTitle()).toHaveText(expectHomePage.startBuildingSection.title);
    });

    // 4. Отображение пунктов списка, соответсие текста(1+3)
    
    // 5. Вынести футер в layout
    // 6. Написание тестов на футер.
});