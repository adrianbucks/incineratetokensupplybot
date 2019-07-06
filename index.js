const TelegramBot = require ('node-telegram-bot-api');
const request = require ('request');
const Token = '789025017:AAHCJ2O1HAldVPxjOwBS_e6As7_9iEwgNl0';

const bot = new TelegramBot (Token);
bot.onText(/\/start/, (msg) => {
    bot.sendMessage (msg.chat.id, "Welcome, to check to current total suply for Incinerate Token type /supply");
});

bot.onText(/\/supply/, (msg) => {
    bot.sendMessage(msg.chat.id, getSupply());
});

function getSupply() {
    let message = "";
    request('https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x072ccd6247e88114590d08d6a80b7a609473c17e&apikey=TD6FMJXAG2MQ4WXX4TKWVDHVF4WZSI2PDV', {json: true}, (err, res, body) =>{
        if(err){
            message = "I Could not retrive the current total supply. The initial total supply was 1.000.000";
            return message;
        };
        let response = body.result;
        let supply = response / 100;
        let calc = supply / 1000000 * 100;
        let perc = 100 - calc;
        perc = perc.toFixed(3);
        message = "The current total suplly is: "+supply+" INC8. "+perc+ "% has been already burned.";
        return message;
});
}