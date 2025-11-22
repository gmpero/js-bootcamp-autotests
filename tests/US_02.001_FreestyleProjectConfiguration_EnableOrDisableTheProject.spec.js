import { expect } from "@playwright/test";
import { test } from "../base.js";
import { TestData } from "./testData/US_02.001.testData.js";
import { US_02_001_Helper } from "../helpers/US_02.001.helper.js";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", () => {
    
    test.beforeEach(async ({page}) => {
        await US_02_001_Helper.createFreestyleProject(page);
    });

    test("TC_02.001.01 | Verify number of items in project configuration dropdown", async ({ page }) => {
        await US_02_001_Helper.openProjectDropdown(page);
        const countElItemsOnDropdown = await page.locator(".jenkins-dropdown__item").count();

        expect(countElItemsOnDropdown).toEqual(TestData.dropdown.expectedCount);
    });

    test("TC_02.001.02 | Verify item names in project configuration dropdown", async ({ page }) => {
        await US_02_001_Helper.openProjectDropdown(page);
        const nameElItemsOnDropdown = await page.locator(".jenkins-dropdown__item").allInnerTexts();

        expect(nameElItemsOnDropdown).toEqual(TestData.dropdown.items);
    });

    test("TC_02.001.03 | Verify configuration access by clicking project name", async ({page}) => {
        await page.getByRole("link", { name: `${TestData.project.displayName}`, exact: true }).click();
        const configureButton = page.getByRole("link", {name: `${TestData.dropdown.items[3]}`});

        expect(configureButton).toBeVisible();
    });

    test("TC_02.001.04 | Verify configuration access via project dropdown menu", async ({ page }) => {
        await page.getByRole('link', { name: `${TestData.project.displayName}`, exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();
        await page.getByRole("link", {name: `${TestData.dropdown.items[3]}`}).click();

        expect(page).toHaveURL(`/job/${TestData.project.displayName}/configure`);
    });

    test("TC_02.001.05 | Verify configuration access via project name click", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);

        expect(page).toHaveURL(`/job/${TestData.project.displayName}/configure`);
    });

    test("TC_02.001.06 | Verify toggle switch label changes to Disabled when clicked", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await page.locator(".jenkins-toggle-switch").click();
        const labelToggle = page.locator(".jenkins-toggle-switch__label");

        await expect(labelToggle).toContainText(TestData.configuration.toggle.labels.disabled);
    });

    test("TC_02.001.07 | Verify toggle switch label changes to Enabled after double click", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await page.locator(".jenkins-toggle-switch").dblclick();
        const labelToggle = page.locator(".jenkins-toggle-switch__label");

        await expect(labelToggle).toContainText(TestData.configuration.toggle.labels.enabled);
    });
});