const rwClient = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const { formatDistanceStrict } = require('date-fns')

const calcDaysUntil = () => formatDistanceStrict(new Date(), new Date('January 1, 2023 12:00:00'), { unit: "second" });
const getDay = (day) => day.replace(/\D/g, "")

const tweet = async () => {
  try {
    await rwClient.v2.tweet(`Falta ${getDay(calcDaysUntil())} dias para Lula ser eleito Presidente do Brasil`)
    console.log("tweet successfully created")
  } catch (e) {
    console.error(e)
  }
}


const job = new CronJob("0 12 1-31 * *", () => {
  console.log('cron job starting!')
  tweet()
})

job.start();
