import schedule from "node-schedule";
import xmlModels from "../models/xmlModels";

const reUpActiveFalse = async (BBotID: String) => {
    await xmlModels.updateOne({ BBotID: BBotID }, { Active: false });
    console.log(`Update Active false for BBotID ${BBotID}`);
};

const checkBotActive = async () => {
    const fetchActiveBot = await xmlModels.find({
        Active: true
    });
    const resultFinal = fetchActiveBot?.filter((res: any) => {
        let ExpiredDay = Number(res.ExpiredDay);
        let now = Math.floor(new Date().getTime() / 1000);
        if (Number(now) > ExpiredDay) {
            reUpActiveFalse(res.BBotID);
        };
    });
    return resultFinal;
};

schedule.scheduleJob("*/10 * * * * *", async () => {
    checkBotActive();
});