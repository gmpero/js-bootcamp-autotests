import { expect } from "@playwright/test";
import { test } from "../base.js";
import { ItemsOnDropdown } from "./helpers/pero.js";

test.describe("Проверка выпадающего списка у созданного элемента", () => {
    
    test.beforeEach(async ({page}) => {
        await page.locator(".task-link-text").first().click();
        await page.locator("#name").fill(ItemsOnDropdown.name);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        await page.locator("#jenkins-head-icon").click();
        await page.getByRole('link', { name: 'test', exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();
    });

    test("Проверка количества пунктов меню в выпадающем списке", async ({ page }) => {
        const countElItemsOnDropdown = await page.locator(".jenkins-dropdown__item").count();
        expect(countElItemsOnDropdown).toEqual(ItemsOnDropdown.expectedCount);
    });

    test("Проверка названий пунктов меню в выпадающем списке", async ({ page }) => {
        const nameElItemsOnDropdown = await page.locator(".jenkins-dropdown__item").allInnerTexts();
        expect(nameElItemsOnDropdown).toEqual(ItemsOnDropdown.listItemMenu);
    });
});