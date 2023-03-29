import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import config from './config.js'
//import { world } from "mojang-minecraft"
//import { ActionFormData } from "mojang-minecraft.ui"
//ActionFormData
world.events.beforeItemUse.subscribe((useEvent) => {
    if (useEvent.source.typeId != "minecraft:player") return;
    if (useEvent.item.typeId == "bridge:tpitem") {
        actionFormAppear(useEvent.source);
    }

    function actionFormAppear2(p) {
        const mainGui = new ActionFormData()
            .title(`teleport`)
    }

    function actionFormAppear(p) {
        const hub = config.icon.hub
        const shop = config.icon.shop
        const saikutu = config.icon.mining
        const pvp = config.icon.pvp
        const mainGui = new ActionFormData()
            .title(`テレポート`)
            .button(`HUB`, hub)
            .button(`採掘場`, saikutu)
            .button(`ショップ`, shop)
            .button(`PVP \n (採掘量500から)`, pvp)
            .button(`coming soon`, 'textures/items/')
            .button(`coming soon`, 'textures/items/')
            .button(`coming soon`, 'textures/items/');
        mainGui.show(p).then((response) => {
            if (!response.canceled) modalFormAppear(p, response.selection);
        })
        console.timeStamp("actionFormApper loading")
    };

    function modalFormAppear(p, n) {
        if (n == 0) {
            p.runCommandAsync(`tp @s 0 10 0`);
        } else if (n == 1) {
            p.runCommandAsync(`tp @s 0 -1 24`);
        } else if (n == 2) {
            p.runCommandAsync(`tp @s 0 -19 0`);
        } else if (n == 3) {
            p.runCommandAsync(`tp @s 61 -60 81`);
        } else if (n == 4) {
            p.runCommandAsync(`tp @s -10000 -60 -10000`);
        } else if (n == 5) {
            p.runCommandAsync(`tp @s 0 0 0`);
        } else if (n == 6) {
            p.runCommandAsync(`tp @s 0 0 0`);
        }
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
    if (message === `${command}hub`) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp @s 0 3 0`);
        sender.sendMessage("§l§ahubにtpしましたー!!");
    };
    if (message === `${command}help`) {
        chatData.cancel = true;
        sender.sendMessage("§l§b-----help-----");
        sender.sendMessage("§l§b.hubでhubに戻る");
        sender.sendMessage("§l§c.tp 準備中");
        sender.sendMessage("§l§b.tp でテレポート");
        sender.sendMessage("§l§b使用例");
        sender.sendMessage("§l§b.tp hub/saikutu/pvp/shop");
        sender.sendMessage("§l§b.ansi on/off 暗視エフェクト追加/除去");
        sender.sendMessage("§l§b.addoninfo addoninfo");
    };
    if (message === `${command}ansi on`) {
        chatData.cancel = true;
        sender.addTag("ansi");
        sender.sendMessage("§l§a暗視on");
    };
    if (message === `${command}ansi off`) {
        chatData.cancel = true;
        sender.removeTag("ansi");
        sender.sendMessage("§l§a暗視off");
    };
    if (message === `${command}tp hub`) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp 0 1 0`);
    };
    if (message === `${command}tp saikutu`) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp 0 -1 24`)
    };
    if (message === `${command}tp shop `) {
        chatData.cancel = true;
        sender.runCommandAsync(`tp 0 -19 0`)
    };
    if (message === `${command}tp pvp`) {
        chatData.cancel = true;
        sender.sendMessage("準備中")
    };
    if (message === `${command}addoninfo`) {
        chatData.cancel = true;
        sender.sendMessage(`---umbrella server addon---`);
        sender.sendMessage(`addon version ${addonver}v`);
        sender.sendMessage(`script version ${scriptver}v`);
        sender.sendMessage(`license is §l${license}§r`);
        sender.sendMessage("more script help is GitHub")
        sender.sendMessage(`${githuburl}`)
    };
});
world.events.beforeChat.subscribe((chatDatarank) => {
    const { message, sender } = chatDatarank;

    let rank = sender
        .getTags()
        .find((tag) => tag.startsWith("rank:"))
        ?.split(":")[1];

    if (!rank) return;

    chatDatarank.cancel = true;

    world.sendMessage(" [" + rank + "§r] " + sender.name + "§a§l>> §r" + message);
});
/**world.events.itemUse.subscribe(itemkenti => {
    const { item, source } = itemkeiti;
    const itemID = item.typeId;
    const itemName = itemID.substring(itemID.indexOf(':') + 1);

    if (item.data == undefined) {
        source.addTag(itemName);
    } else {
        source.addTag(itemName + ':' + item.data);
    }
});
world.events.itemUseOn.subscribe(itemkenti => {
    const { item, source } = itemkenti;
    const itemID = item.typeId;
    const itemName = itemID.substring(itemID.indexOf(':') + 1);

    if (item.data == undefined) {
        source.addTag(itemName);
    } else {
        source.addTag(itemName + ':' + item.data);
    }
});
world.events.tick.unsubscribe((tick) => {
    const scriptver = config.addon.ver.scriptver;
    const addonver = config.addon.ver.addonver;
    const license = config.addon.license;
    const command = config.command.prefix;
    console.timeStamp("loading umbrella script addon");
    console.info(`script version ${scriptver}v`);
    console.info(`addon version ${addonver}v`);
    console.info(`license is ${license}`);
    console.info(`command prefix is ${command}`);
})
**/
