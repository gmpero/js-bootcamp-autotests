import NewItemPage from "./newItemPage";

class HomePage {
    /**
	 * @param {import('playwright').Page} page //дает понять, что мы работаем с Playwright, дает подсказки Playwright
	 */

    constructor(page) {
        this.page = page;
    };

    getLocatorNewItem = () => this.page.locator("#side-panel a[href$='newJob']");
    getLocatorItemName = () => this.page.locator("#job_New-Freestyle-project")

    async clickNewItem() {
        await this.getLocatorNewItem().click();
        return new NewItemPage(this.page);
    }
}

export default HomePage;
