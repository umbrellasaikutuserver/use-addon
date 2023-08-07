import { world,system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import config from './config.js'
import './model/form.js'
import './model/rank.js'
import './system/system.dog.js'
import cmd from '.
// custom command
    const PREFIX = config.command.prefix;
    const scriptver = config.addon.ver.scriptver;
    const addonver = config.addon.ver.addonver;
    const githuburl = config.addon.githuburl;
    const license = config.addon.license;
    const help = { cmd: '.help', info: ' :コマンドのヘルプを表示します'}
    const hub = { cmd: '.hub', info: ' :hubにtpします'}
    const ansi = { cmd: '.ansi on/off', info: ' 暗視機能のon/offができます'}
    const ansihelp = { cmd: '使用例', info: '.ansi:on, .ansi:off'}
    const time = { cmd: '.time', info: ' :今の時間を表示します'}
    const addoninfo = { cmd: '.addoninfo', info: ' :このサーバーのアドオンの詳細な情報を表示します'}
world.beforeEvents.chatSend.subscribe(chatData => {
		const { sender, message } = chatData;
		chatData.cancel = true;
    if (!message.startsWith(PREFIX)) return; 
		const [ command, ...args ] = message.slice(PREFIX.length).split(' '); 
    if (command === 'hub') {
        chatData.cancel = true;
        sender.runCommandAsync(`tp @s 0 3 0`);
        sender.sendMessage("§l§ahubにtpしましたー!!");
    }else if (command === 'help') {
        chatData.cancel = true;
        sender.sendMessage(Object.values(help));
        sender.sendMessage(Object.values(hub));
        sender.sendMessage(Object.values(ansi));
        sender.sendMessage(Object.values(ansihelp));
        sender.sendMessage(Object.values(time));
        sender.sendMessage(Object.values(addoninfo));
    }else if (command === 'ansi:on') {
        chatData.cancel = true;
        sender.addTag("ansi");
        sender.sendMessage("§l§a暗視on");
    }else if (command === 'ansi:off') {
        chatData.cancel = true;
        sender.removeTag("ansi");
        sender.sendMessage("§l§a暗視off");
    }else if (command === 'addoninfo') {
        chatData.cancel = true;
        sender.sendMessage(`---umbrella server addon---`);
        sender.sendMessage(`addon version ${addonver}v`);
        sender.sendMessage(`script version ${scriptver}v`);
        sender.sendMessage(`license is §l${license}§r`);
        sender.sendMessage("more script help is GitHub");
        sender.sendMessage(`${githuburl}`);
    }else if(command === 'time') {
        var date = new Date();
        chatData.cancel = true;
        const getHours = date.getHours();
        const getMinutes = date.getMinutes();
        const getSeconds = date.getSeconds();
        sender.sendMessage(`今の時間は${getHours}:${getMinutes}:${getSeconds}です!!`);
    }else if () {
	    
    }else{
    sender.sendMessage("このコマンドはありません")}
});
console.warn("[Script] [umbrellaserver] script loading!!")