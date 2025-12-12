import Layout from './layout';

class ConfigureFreestileProject extends Layout {
    /**
	 * @param {import('playwright').Page} page //дает понять, что мы работаем с Playwright, дает подсказки Playwright
	 */

    constructor(page) {
        super(page);
    }

    getLocatorSaveButton = () => this.page.getByRole("button", {name: "Submit"});
    
    /* МЕТОД НЕ РЕАЛИЗОВАН*/
    async clickSaveButton () {
        await getLocatorSaveButton.click();
        // return this; - должен вернуть страницу проекта - доделать
    }
};

export default ConfigureFreestileProject;