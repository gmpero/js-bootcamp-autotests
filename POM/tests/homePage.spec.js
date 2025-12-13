import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObject/homePage.js";
import expectHomePage from "../testData/homePage";
import { projectName } from "../testData/projectName.js";


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

    // Реализовать тесты на главную страницу
    // 1. Отображение заголовка Welcome to Jenkins!
    test("TC_01.001.03 | Verify that home page displays correct welcome title", async ({page}) => {
        const homePage = new HomePage(page);
        expect(homePage.getLocatorWelcomeTitle()).toHaveText(expectHomePage.welcomeTitle);
    });

    // 2. Отображение описания :
    /* "This page is where your Jenkins jobs will be displayed. To get started, you can set up distributed builds or start building a software project." */
    // 3. Отображение заголовков h2
    // 4. Отображение пунктов списка, соответсие текста(1+3)
    
    // 5. Вынести футер в layout
    // 6. Написание тестов на футер.
});