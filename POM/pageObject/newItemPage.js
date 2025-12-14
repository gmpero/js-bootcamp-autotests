import ConfigureFreestileProject from "./configureFreestileProject";
import Layout from './layout';
import globalData from "../testData/globalData";

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

    async clickOkButton (configurePageName) {
        await this.getLocatorOkButton().click();

        switch (configurePageName) {
            case globalData.configurePageName.freestyleProject:
                return new ConfigureFreestileProject(this.page);
            default:
                console.error("Введен некорректной параметр configurePageName в функции clickOkButton. Укажите конфигурационную страницу, на которую необходимо совершить переход!");
                return;
        }
    }
}

export default NewItemPage;