import { title } from "process";

const expectHomePage = {
    welcomeTitle : "Welcome to Jenkins!",
    descriptionForWelcomeTitle: "This page is where your Jenkins jobs will be displayed. To get started, you can set up distributed builds or start building a software project.",

    startBuildingSection : {
        title: "Start building your software project",
        createJobName: "Create a job",
    },

    distributedBuildSection : {
        title: "Set up a distributed build",
        listDistributedBuildSectionLink : {
            setUpAnAgent : "Set up an agent",
            configureCloud : "Configure a cloud",
            learnMore : "Learn more about distributed builds",
        }
    },
};

export default expectHomePage;