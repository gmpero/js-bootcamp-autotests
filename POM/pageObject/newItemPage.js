import ConfigureFreestileProject from "./configureFreestileProject";
import Layout from './layout';

class NewItemPage extends Layout {
        /**
	 * @param {import('playwright').Page} page //дает понять, что мы работаем с Playwright, дает подсказки Playwright
	 */

    constructor(page) {
        super(page);
    };

    getLocatorJenkinsInput = () => this.page.locator("#name");
	getLocatorFreestyleProject = () => this.page.locator(".hudson_model_FreeStyleProject");
    getLocatorOkButton = () => this.page.locator("#ok-button");

    async fillJenkinsInput (nameProject) {
        await this.getLocatorJenkinsInput().fill(nameProject);
        return this;
    }

    async clickFreestyleProject () {
        await this.getLocatorFreestyleProject().click();
        return this;
    }

    async clickOkButton () {
        await this.getLocatorOkButton().click();
        return new ConfigureFreestileProject(this.page);
    }
}

export default NewItemPage;