import HomePage from "./homePage";

class Layout {
    constructor(page) {
        this.page = page;
    }

    getLocatorJenkinsLogo = () => this.page.locator(".app-jenkins-logo");

    async clickJenkinsLogo () {
        await this.getLocatorJenkinsLogo().click();
        return new HomePage(this.page);
    }
}

export default Layout;