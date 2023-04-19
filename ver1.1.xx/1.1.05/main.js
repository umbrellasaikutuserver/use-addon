import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import config from './config.js'
//import { world } from "mojang-minecraft"
//import { ActionFormData } from "mojang-minecraft.ui
//ActionFormData
world.events.beforeItemUse.subscribe((useEvent) => {
    const item = useEvent.item
    if (item.typeId === "minecraft:compass") {
        //臨時でコンパス
        actionFormAppear(useEvent.source);
    }

    function actionFormAppear2(player) {
        const mainGui = new ActionFormData()
            .title(`運営のみ`)
    }

    function actionFormAppear(player) {
        const hub = config.icon.hub
        const shop = config.icon.shop
        const saikutu = config.icon.mining
        const pvp = config.icon.pvp
        const mainGui = new ActionFormData()
            .title(`メニュー`)
            .button(`tp`)
            .button(`ギフト`)
            .button(`coming soon`)
            .button(`coming soon`)
            .button(`coming soon`, 'textures/items/snowball')
            .button(`coming soon`, 'textures/items/snowball')
            .button(`coming soon`, 'textures/items/snowball')
        mainGui.show(player).then((response) => {
            if (response.selection === 0) tp(player)
            if (response.selection === 1) code(player)
        });
    }
    
    function tp(player) {
        const tpGui = new ActionFormData()
        .title(`tp menu`)
        .button(`HUB`)
        .button(`採掘場`)
        .button(`shop`)
        .button(`pvp \n (採掘量500から)`)
        .button("coming soon")
        .show(player).then(response => {
            if (response.selection === 0) player.runCommandAsync(`tp @s 0 3 0`)
            else if (response.selection === 1) player.runCommandAsync(`tp @s 0 -1 24`)
            else if (response.selection === 2) player.runCommandAsync(`tp @s 0 -19 0`)
            else if (response.selection === 3) player.runCommandAsync(`tp @s 61 -60 81`)
        })
    }

    //function tpcommand(player) {
        //if (n == 0) {
        //    p.runCommandAsync(`tp @s 0 10 0`);
        //} else if (n == 1) {
        //    p.runCommandAsync(`tp @s 0 -1 24`);
        //} else if (n == 2) {
        //    p.runCommandAsync(`tp @s 0 -19 0`);
        //} else if (n == 3) {
        //    p.runCommandAsync(`tp @s 61 -60 81`);
        //} else if (n == 4) {
        //    p.runCommandAsync(`tp @s -10000 -60 -10000`);
        //} else if (n == 5) {
        //    p.runCommandAsync(`tp @s 0 0 0`);
        //} else if (n == 6) {
        //    p.runCommandAsync(`tp @s 0 0 0`);
        //}
    //}
    function code(player) {
        const codegift = config.codegift
        const codeGui = new ModalFormData()
        .title(`ギフトコード入力`)
        .textField("code", "codeEnter")
        .show(player).then(response => {
            let textfield = response.formValues[1];
            
            if(textfield === code) {
                if(player.hasTag != giftget) {
                    player.runCommandAsync(`scoreboard players add @s coin ${codegift}`);
                } else if(player.hasTag === giftget) {
                    player.sendMessage(あなたはすでにコードギフトをもらっています);
                }
            }
        })
    }
});
// custom command
world.events.beforeChat.subscribe((chatData) => {
    const { sender, message } = chatData;
    const command = config.command.prefix;
    const scriptver = config.addon.ver.scriptver;
    const addonver = config.addon.ver.addonver;
    const githuburl = config.addon.githuburl;
    const license = config.addon.license;
    chatData.cancel = true;
    if (message === `${command}hub`) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp @s 0 3 0`);
        sender.sendMessage("§l§ahubにtpしましたー!!");
    }else if (message === `${command}help`) {
        chatData.cancel = true;
        sender.sendMessage("§l§b-----help-----");
        sender.sendMessage("§l§b.hubでhubに戻る");
        //sender.sendMessage("§l§c.tp 準備中");
        //sender.sendMessage("§l§b.tp でテレポート");
        //sender.sendMessage("§l§b使用例");
        //sender.sendMessage("§l§b.tp hub/saikutu/pvp/shop");
        sender.sendMessage("§l§b.ansi on/off 暗視エフェクト追加/除去");
        sender.sendMessage("§l§b.addoninfo addoninfo");
        sender.sendMessage("§l§b.time");
    }else if (message === `${command}ansi on`) {
        chatData.cancel = true;
        sender.addTag("ansi");
        sender.sendMessage("§l§a暗視on");
    }else if (message === `${command}ansi off`) {
        chatData.cancel = true;
        sender.removeTag("ansi");
        sender.sendMessage("§l§a暗視off");
    }else if (message === `${command}tp hub`) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp 0 1 0`);
    }else if (message === `${command}tp saikutu`) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp 0 -1 24`);
    }else if (message === `${command}tp shop `) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp 0 -19 0`);
    }else if (message === `${command}tp pvp`) {
        chatData.cancel = true;
        sender.sendMessage("準備中");
    }else if (message === `${command}addoninfo`) {
        chatData.cancel = true;
        sender.sendMessage(`---umbrella server addon---`);
        sender.sendMessage(`addon version ${addonver}v`);
        sender.sendMessage(`script version ${scriptver}v`);
        sender.sendMessage(`license is §l${license}§r`);
        sender.sendMessage("more script help is GitHub");
        sender.sendMessage(`${githuburl}`);
    }
    if(message === `${command}time`) {
        chatData.cancel = true;
        var date = new Date();
        const getHours = date.getHours();
        const getMinutes = date.getMinutes();
        const getSeconds = date.getSeconds();
        sender.sendMessage(`今の時間は${getHours}:${getMinutes}:${getSeconds}です!!`);
    };
    if(message ==`${command}code ${config.code}`) {
        chatData.cancel= true
        if(!sender.hasTag === "codeget") {
            sender.runCommandAsync(`scoreboard players add @s coin ${config.codegift}`);
            sender.sendMessage("§bギフトゲット!!");
            sender.addTag("codeget");
        }else if(sender.hasTag === "codeget") {
            sender.sendMessage("すでにギフトをもらっています");
        }else{
            var date = new Date();
            const getHours = date.getHours();
            const getMinutes = date.getMinutes();
            const getSeconds = date.getSeconds();
            let rank = sender;
            sender.getTags();
            sender.find((tag) => tag.startsWith("rank:"));
            ?.split(":")[1];
            if (!rank) return;
            chatDatarank.cancel = true;
            world.runCommandAsync(`telleaw @a {"rawtext":[{"text":"[${rank}§r] ${sender.name} §a>>§r${message} §r§f[${getHours}:${getMinutes}:${getSeconds}]"}]}`);
        }
    }
});
/**
    world.events.beforeChat.subscribe((chatDatarank) => {
    const { message, sender } = chatDatarank;
    var date = new Date();
    const getHours = date.getHours();
    const getMinutes = date.getMinutes();
    const getSeconds = date.getSeconds();
    let rank = sender;
        sender.getTags();
        sender.find((tag) => tag.startsWith("rank:"));
        ?.split(":")[1];

    if (!rank) return;

    chatDatarank.cancel = true;
    world.runCommandAsync(`telleaw @a {"rawtext":[{"text":"[${rank}§r] ${sender.name} §a>>§r${message} §r§f[${getHours}:${getMinutes}:${getSeconds}]"}]}`);
    }
});**/
/**world.events.itemUse.subscribe(itemkenti => {
    const { item, source } = itemkeiti;
    const itemID = item.typeId;
    const itemName = itemID.substring(itemID.indexOf(':') + 1);

    if (item.data == undefined) {
        source.addTag(itemName);
    } else {
        source.addTag(itemName + ':' + item.data);
    }
}); **/
/**world.events.itemUseOn.subscribe(itemkenti => {
    const { item, source } = itemkenti;
    const itemID = item.typeId;
    const itemName = itemID.substring(itemID.indexOf(':') + 1);

    if (item.data == undefined) {
        source.addTag(itemName);
    } else {
        source.addTag(itemName + ':' + item.data);
    }
});**/
/**world.events.tick.unsubscribe((tick) => {
    const scriptver = config.addon.ver.scriptver;
    const addonver = config.addon.ver.addonver;
    const license = config.addon.license;
    const command = config.command.prefix;
    console.timeStamp("loading umbrella script addon");
    console.info(`script version ${scriptver}v`);
    console.info(`addon version ${addonver}v`);
    console.info(`license is ${license}`);
    console.info(`command prefix is ${command}`);
})**/