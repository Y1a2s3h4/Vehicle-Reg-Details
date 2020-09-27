const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
let browser;
const carNumber = async (number) => {
  console.log("start");
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(
      "https://www.cars24.com/rto-vehicle-registration-details/",
      { timeout: 0 }
    );
    await page.type("._6QaMX > .form-control", number);
    await page.keyboard.press("Enter");
    await page.waitForSelector("._2abk7");
    // const url = await page.url();
    const html = await axios.get(await page.url());
    const $ = await cheerio.load(html.data);
    const info = [
      {
        title: $("div._2abk7").text(),
        car_number: $("ul._1MWh_ > li:nth-child(1) > span:nth-child(2)").text(),
        city: $("ul._1MWh_ > li:nth-child(2) > span:nth-child(2)").text(),
        state: $("ul._1MWh_ > li:nth-child(3) > span:nth-child(2)").text(),
        phone: $("ul._1MWh_ > li:nth-child(4) > span:nth-child(2)").text(),
        email_id: $("ul._1MWh_ > li:nth-child(5) > span:nth-child(2)").text(),
        address: $("ul._1MWh_ > li:nth-child(6) > span:nth-child(2)").text(),
      },
    ];
    if (info[0].title != undefined) {
      await page.close();
      await browser.close();
      console.log(info);
      return info;
    }
  } catch (err) {
    console.log(err);
    await browser.close();
  }
};
module.exports = { carNumber };
