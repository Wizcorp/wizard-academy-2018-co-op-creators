#include "ConsoleGraphics.h"

void setConversionParams(TilesetConversionData &conversionParams) {
	conversionParams.optimizeTileset = true;
	conversionParams.tileWidth = 8;
	conversionParams.tileHeight = 8;
}

int main(int argc, char *argv[]) {
	TilesetConversionData conversionParams(newref Image("level01.png", Pixel(255, 0, 255, 255)));
	setConversionParams(conversionParams);
	doTilesetConversion(conversionParams);
	createTiledProjectFile("../../assets/level01.tmx", conversionParams);
	return 0;
}
