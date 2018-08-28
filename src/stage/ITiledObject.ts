// Secret object not documented from Phaser
export default interface ITiledObject {
	gid: number;
	height: number;
	id: number;
	name: string;
	properties: {[key: string]: string};
	propertytypes: {[key: string]: string};
	type: string;
	visible: boolean;
	width: number;
	x: number;
	y: number;
}