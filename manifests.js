const Website = require("./website"),


	listFunc = type => async () => {
		for (var m of (await lists.manifests.getJson()).manifest) if (m.id == type) {
			lists[m.id] = async () => Website.Connect(m.src);
			return await lists[m.id]();
		}
	},
	lists = {
		manifests: Website.Connect("https://boxcritters.com/play/manifest.json"),
		items: listFunc("items"),
		rooms: listFunc("rooms"),
		shops: listFunc("shops"),
	},
	itemCodeList = Website.Connect("https://api.boxcrittersmods.ga/itemcodes");



async function getItemName(itemId) {
	let itemList = await lists.items();
	let item = (await itemList.getJson()).find(t => t.itemId == itemId || t.name == itemId);
	if (item) return item.name;
}

async function getItem(itemId) {
	let itemList = await lists.items();
	let items = await itemList.getJson();
	itemId = getCloseset([...items.map(i => i.itemId), ...items.map(i => i.name)].filter(a => !!a), itemId).value;
	return items.find(i => i.itemId == itemId || i.name == itemId);
}
async function getRoom(roomId) {
	let roomList = await lists.rooms();
	let rooms = await roomList.getJson();
	roomId = getCloseset([...rooms.map(r => r.roomId), ...rooms.map(r => r.name)].filter(a => !!a), roomId).value;
	return rooms.find(r => r.roomId == roomId || r.name == roomId);
}

module.exports = {
	lists,
	itemCodeList,
	getItemName,
	getItem,
	getRoom
};