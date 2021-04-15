var fs = require('fs')
const Discord = require("discord.js");
const request = require("request"); 
var chalk = require('chalk');
var center = require('center-align');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r|\x22/gi, '').split('\n');
var reciever = fs.readFileSync('reciever.txt', 'utf-8').replace(/\r/gi, '').split('\n');

process.on('uncaughtException', e => {});
process.on('uncaughtRejection', e => {});
process.warn = () => {};

const bot = new Discord.Client({
    disableEveryone: true

});
class Bot {
    constructor(token) {
        this.token = token;
    }
    nitro(reciever) {
        this.bot = new Discord.Client();
        this.bot.on('ready', () => {
			console.log(chalk.blue(`[INFO]`) + `| Logged into [%s] | ID [%s] at "%s"`, this.bot.user.tag, this.bot.user.id, new Date().toLocaleTimeString());
			
		this.bot.on("message", async message => {
			
		if (message.content.includes("discord.gift/") || message.content.includes("discord.com/gifts/") || message.content.includes("discordapp.com/gifts/")) {
        console.log(`[INFO] Found nitro code, attempting to claim now...`);
        var nitro = /(discord.com\/gifts\/|discordapp.com\/gifts\/|discord.gift\/)([a-zA-Z0-9]+)/
        var nitroUrl = nitro.exec(message.content);
        var code;
        if (message.content.includes('discord.gift/')) {
            code = nitroUrl[0].split('/')[1];
        } else if (message.content.includes('discord.com/gifts/')) {
            code = nitroUrl[0].split('/')[2];
        } else if (message.content.includes('discordapp.com/gifts/')) {
            code = nitroUrl[0].split('/')[2];
        }
        request({
            url : `https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`,
            method : "POST",
            headers : {"Authorization" : reciever} 
        }, function(error, response, body) {
            if (body.includes("This gift has been redeemed already")) {
                console.log(`[INFO] ${new Date().toLocaleTimeString()} Code has already been redeemed`);
            } else if (body.includes("nitro")) {
                console.log(chalk.hex("66ff00")('nitro code claimed'));
            } else if (body.includes("Unknown Gift Code")) {
                console.log(chalk.red(`[INVALID] [${new Date().toLocaleTimeString()}] Code is Invalid `));
            } else {
                console.log(chalk.hex("#FFA500")('[WARN] An error occured'));
            }
		})
		}
		})
        });

        this.bot.login(this.token).catch(err => {});;
    }
}

process.title = `[313] Nitro Sniper v2 (Fastest) [Multi Accounts] Sniper Accounts: ${tokens.length}`;
console.log("		███╗   ██╗██╗████████╗██████╗  ██████╗     ███████╗███╗   ██╗██╗██████╗ ███████╗██████╗ ");
console.log("		████╗  ██║██║╚══██╔══╝██╔══██╗██╔═══██╗    ██╔════╝████╗  ██║██║██╔══██╗██╔════╝██╔══██╗");
console.log("		██╔██╗ ██║██║   ██║   ██████╔╝██║   ██║    ███████╗██╔██╗ ██║██║██████╔╝█████╗  ██████╔╝");
console.log("		██║╚██╗██║██║   ██║   ██╔══██╗██║   ██║    ╚════██║██║╚██╗██║██║██╔═══╝ ██╔══╝  ██╔══██╗");
console.log("		██║ ╚████║██║   ██║   ██║  ██║╚██████╔╝    ███████║██║ ╚████║██║██║     ███████╗██║  ██║");
console.log("		╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝     ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝");
console.log(chalk.underline(`						Created By Luci`));
console.log(chalk.inverse(`[INFO] - [Nitro Redeemer]`));

console.log(``);
console.log(``);

	
var i = 0;
var int = setInterval(() => {
    if (i >= tokens.length) return clearInterval(int);
    new Bot(tokens[i++]).nitro(reciever);
}, 0);
