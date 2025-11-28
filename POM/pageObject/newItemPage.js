import ConfigureFreestileProject from "./configureFreestileProject";

class NewItemPage {
        /**
	 * @param {import('playwright').Page} page //дает понять, что мы работаем с Playwright, дает подсказки Playwright
	 */

    constructor(page) {
        this.page = page;
    };

    getLocatorJenkinsInput = () => this.page.locator("#name");
	getLocatorFreestyleProject = () => this.page.locator(".hudson_model_FreeStyleProject");
        // getLocatorFreestyleProject = () => this.page.getByRole("radio", {name: "hudson.model.FreeStyleProject"})

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