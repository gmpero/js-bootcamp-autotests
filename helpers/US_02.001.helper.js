import { TestData } from "../tests/testData/US_02.001.testData";

export class US_02_001_Helper {
    static async createFreestyleProject(page) {
        await page.locator(".task-link-text").first().click();
        await page.locator("#name").fill(TestData.project.displayName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        await page.locator("#jenkins-head-icon").click();
        await page.waitForLoadState("load");
    }

    static async openProjectDropdown(page) {
        await page.getByRole('link', { name: `${TestData.project.displayName}`, exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();
    }

    static async openConfigurateProject(page) {
        await page.getByRole('link', { name: `${TestData.project.displayName}`, exact: true }).focus();
        await page.keyboard.press('Enter');
        await page.waitForURL(`/job/${TestData.project.displayName}/`)
        await page.getByRole("link", {name: `${TestData.dropdown.items[3]}`}).click();
    }

    static async disableProjectAndSave(page) {
        await page.locator(".jenkins-toggle-switch").click();
        await page.locator('button:has-text("Save")').click();
    }
}