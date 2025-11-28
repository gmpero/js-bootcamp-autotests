import HomePage from "./homePage";

class ConfigureFreestileProject {
    /**
	 * @param {import('playwright').Page} page //дает понять, что мы работаем с Playwright, дает подсказки Playwright
	 */

    constructor(page) {
        this.page = page;
    }

    getLocatorSaveButton = () => this.page.getByRole("button", {name: "Submit"});
    getLocatorJenkinsLogo = () => this.page.locator(".app-jenkins-logo");


    async clickSaveButton () {
        await getLocatorSaveButton.click();
        // return this; - должен вернуть страницу проекта - доделать
    }

    async clickJenkinsLogo () {
        await this.getLocatorJenkinsLogo().click();
        return new HomePage(this.page);
    }
};

export default ConfigureFreestileProject;