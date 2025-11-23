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

        await expect(configureButton).toBeVisible();
    });

    test("TC_02.001.04 | Verify configuration access via project dropdown menu", async ({ page }) => {
        await page.getByRole('link', { name: `${TestData.project.displayName}`, exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();
        await page.getByRole("link", {name: `${TestData.dropdown.items[3]}`}).click();

        await expect(page).toHaveURL(`/job/${TestData.project.displayName}/configure`);
    });

    test("TC_02.001.05 | Verify configuration access via project name click", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);

        await expect(page).toHaveURL(`/job/${TestData.project.displayName}/configure`);
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

    test("TC_02.001.08 | Verify project status changes to disabled when toggle switch is turned off", async ({page}) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);

        await expect(page.locator("#enable-project")).toContainText(TestData.status.disabled);
    });

    test("TC_02.001.09 | Verify Enable button becomes enabled after disabling project via toggle switch and saving", async ({page}) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);

        await expect(page.locator('button:has-text("Enable")')).toBeEnabled();
    });

    test("TC_02.001.10 | Verify disabled project icon has correct attributes and tooltip", async ({page}) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);
        await page.locator('#jenkins-head-icon').click();

        const iconDissabledProject =  page.locator("#job_TestFreestyleProject td.jenkins-table__icon svg").first()
        await expect(iconDissabledProject).toHaveAttribute("tooltip", "Disabled");
        await expect(iconDissabledProject).toHaveAttribute("title", "Disabled");
        await expect(iconDissabledProject).toHaveAttribute("aria-hidden", "true");
    });

    test("TC_02.001.11 | Verify project remains disabled after page refresh", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);

        await page.reload({ waitUntil: 'domcontentloaded' });
        await expect(page.locator("#enable-project")).toBeVisible();
    });

    test("TC_02.001.12 | Verify Enable button hides disabled message", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);

        await page.locator("button:has-text('Enable')").click();
        await expect(page.locator("#enable-project")).not.toBeVisible();
    });

    test("TC_02.001.13 | Verify disabled project cannot be built manually", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);

        await expect(page.locator("#tasks")).not.toContainText("Build Now");
    });

    // Проверить, что опция Build Now появляется в выпадающем списке проекта после включения
    test("TC_02.001.14 | Verify Build Now option appears in project dropdown after enabling", async ({ page }) => {
        await US_02_001_Helper.openConfigurateProject(page);
        await US_02_001_Helper.disableProjectAndSave(page);

        await page.locator("button:has-text('Enable')").click();
        await page.locator("#jenkins-head-icon").click();
        await US_02_001_Helper.openProjectDropdown(page);

        await expect(page.locator(".jenkins-dropdown button:has-text('Build Now')")).toBeEnabled();
    });
});