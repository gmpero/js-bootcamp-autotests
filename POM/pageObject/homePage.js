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

    async clickNewItem() {
        await this.getLocatorNewItem().click();
        return new NewItemPage(this.page);
    }
}

export default HomePage;
