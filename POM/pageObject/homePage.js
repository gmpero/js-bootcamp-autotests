import NewItemPage from "./newItemPage";
import Layout from './layout';

class HomePage extends Layout {
    /**
	 * @param {import('playwright').Page} page //дает понять, что мы работаем с Playwright, дает подсказки Playwright
	 */

    constructor(page) {
        super(page);
    };

    getLocatorNewItem = () => this.page.locator("#side-panel a[href$='newJob']");
    getLocatorItemName = () => this.page.locator("#job_New-Freestyle-project")
    getLocatorWelcomeTitle = () => this.page.locator(".empty-state-block h1");
    getLocatorDescriptionForWelcomeTitle = () => this.page.locator(".empty-state-block p");
    getLocatorStartBuildingTitle = () => this.page.locator(".empty-state-section h2.h4").first();
    getLocatorCreateJobLink = () => this.page.locator(".empty-state-section-list .content-block .content-block__link").first();

    async clickNewItem() {
        await this.getLocatorNewItem().click();
        return new NewItemPage(this.page);
    }

    async clickCreateJobLink() {
        await this.getLocatorCreateJobLink().click();
        return new NewItemPage(this.page);
    }
}

export default HomePage;
