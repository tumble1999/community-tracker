const devProdConfig = iTrackBC.setup,
	{ getCloseset } = iTrackBC.require("util/util"),
	Website = require("./website"),
	lists = {
		items: Website.Connect(iTrackBC.bcmcAPI.items),
		rooms: Website.Connect(iTrackBC.bcmcAPI.rooms),
		shops: Website.Connect(iTrackBC.bcmcAPI.shops),
		files: Website.Connect(iTrackBC.bcmcAPI.files)
	},
	itemCodeList = Website.Connect(iTrackBC.bcmcAPI.itemCodes);



async function getItemName(itemId) {
	let item = (await lists.items.getJson()).find(t => t.itemId == itemId || t.name == itemId);
	if (item) return item.name;
}

async function getItem(itemId) {
	let items = await lists.items.getJson();
	itemId = getCloseset([...items.map(i => i.itemId), ...items.map(i => i.name)].filter(a => !!a), itemId).value;
	return items.find(i => i.itemId == itemId || i.name == itemId);
}
async function getRoom(roomId) {
	let rooms = await lists.rooms.getJson();
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
