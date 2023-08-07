import { world } from "@minecraft/server";
import config from '../config.js'

const PREFIX = config.command.prefix
world.beforeEvents.chatSend.subscribe(chatData => {
const { sender, message } = chatData;
		chatData.cancel = true;
    if (!message.startsWith(PREFIX)) {
	    if(sender.hasTag('rank:stone')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§e${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:coal')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§b${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:cop')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§a${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:iron')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§a${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:gold')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§a${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:red')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§a${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:dia')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§a${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:eme')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§a${sender.name}§r>${message}"}]}`)
			}
			if(sender.hasTag('rank:admin')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§cAdmin§r]<${sender.name}>${message}"}]}`)
			}
			if(sender.hasTag('rank:staff')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§9Staff§r]<${sender.name}>${message}"}]}`)
			}
			if(sender.hasTag('rank:helper')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"[§eHelpder§r]<${sender.name}>${message}"}]}`)
			if(sender.hasTag('rank:member')) {
			sender.runCommandAsync(`tellraw @a {"rawtext":[{"text":"<§7${sender.name}§r>${message}"}]}`)
			}
			}
    }
		return
})