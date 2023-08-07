/**
 * ScriptAPI ActionFormサンプル v1.20.0対応版
 * Made by RetoRuto9900K
 */

import { world, Player } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import config from '../config.js'

// 特定のアイテムを使った時にFormを開く例
world.afterEvents.itemUse.subscribe(event => { // アイテムを使用した時に動くイベント
  if (!(event.source instanceof Player)) return; // プレイヤーでなければ処理を抜ける

  const player = event.source; // 変数に使った人(Player)を代入
  
  if (event.itemStack.typeId === 'minecraft:compass') { // 使ったアイテムのtypeIdが棒だったら
    menu1(player).catch(console.error); // Formを表示
  }
});

// 特定の座標のボタンを押した時にFormを開く例
world.afterEvents.buttonPush.subscribe(event => { // ボタンを押した時に動くイベント
  if (!(event.source instanceof Player)) return; // プレイヤーでなければ処理を抜ける
  
  const block = event.block; // 変数に押されたボタン(Block)を代入
  const player = event.source; // 変数に押した人(Player)を代入
  
  const button = { x: 0, y: 10, z: 0 } // 処理を動かすボタンの場所
  // 押されたボタンの座標が一致する時
  if (block.x === button.x && block.y === button.y && block.z === button.z) {
    menu1(player).catch(console.error); // Formを表示
  }
});

/** @param {Player} player */
async function menu1(player) {
  const mainGui = new ActionFormData()
  mainGui.title(`メニュー`)
  mainGui.button(`tp`)
  mainGui.button(`ギフト`)
  mainGui.button(`お知らせ`)
  mainGui.button(`Shop`)
  mainGui.button(`coming soon`)
  mainGui.button(`coming soon`)
  mainGui.button(`coming soon`)
  const { canceled, selection } = await mainGui.show(player); // 表示する selectionに何番目のボタンを押したかが入る
  if (selection === 0) tp(player)
  if (selection === 1) code(player)
  if (canceled) return; // キャンセルされていたら処理を抜ける
  };
/** @param {Player} player */
async function tp(player) {
	const tpGui = new ActionFormData()
		.title(`tp menu`)
		.button(`HUB`)
		.button(`採掘場`)
		.button(`shop`)
		.button(`pvp \n (採掘量500から)`)
	const { canceled, selection } = await tpGui.show(player);
		if (selection === 0) player.runCommandAsync(`tp @s 0 3 0`)
		if (selection === 1) player.runCommandAsync(`tp @s 0 -1 24`)
		if (selection === 2) player.runCommandAsync(`tp @s 0 -19 0`)
		if (selection === 3) player.runCommandAsync(`tp @s 61 -60 81`)
		if (canceled) return;
	};
/** @param {Player} player */
async function code(player) {
	const codegift = config.codegift
  const codeGui = new ModalFormData()
	  .title(`ギフトコード入力`)
    .textField("code", "codeEnter")
    .show(player).then(response => {
  let textfield = response.formValues[0];
  if(textfield === code) {
	  player.runCommandAsync(`scoreboard players add @s coin ${codegift}`);
            }
      })
	};
/** @param {Player} player */
async function opmenu(player) {
	const date = new Date()
	const opgui = new ActionFormData()
		.title('OPMENU')
		.body(`こんにちは${player.name}さん`)
		.body(date)
		.button("effect")
		.button("tp")
		.button("TN-AC menu")
	const { canceled, selection } = await opgui.show(player)
	if (selection === 0) effectmenu(player)
	if (selection === 1)
	if (selection === 2) player.runCommandAsync(`scriptevent ac:command setting`)
	})
};

/** @param {Player} player */
async function vipmenu(player) {
	const vipui = new ActionFormData()
	.title("vipmenu")
	.body(`こんにちは${player.name}さん`)
	.button
}