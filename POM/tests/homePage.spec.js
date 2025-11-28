import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObject/homePage.js";

test.describe("US_01.001 | New Item > Create a new item", () => {
	test("RF_01.001.01 | Verify the button 'New Item' is visible", async ({ page }) => {
		const homePage = new HomePage(page); //create экземляр класса

        await expect(homePage.getLocatorNewItem()).toBeVisible();
	});

    test("RF_01.001.02 | Verify new project creation", async ({ page }) => {
        const homePage = new HomePage(page);
        const newItemPage = await homePage.clickNewItem();

        await newItemPage.fillJenkinsInput("New-Freestyle-project");

        await newItemPage.clickFreestyleProject();
        const configureFreestileProject = await newItemPage.clickOkButton();

        await configureFreestileProject.clickJenkinsLogo();

        expect(homePage.getLocatorItemName()).toContainText("New-Freestyle-project");
    });
});