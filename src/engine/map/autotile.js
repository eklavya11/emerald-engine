import * as CFG from "../../cfg";

import {
  assert,
  getTilesetTileIndexBy,
  getTilesetTilePositionByIndex
} from "../../utils";

export function drawAutotile(x, y, tileset, layer, sx, sy) {
  // don't allow drawing into preview layer
  if (layer === CFG.ENGINE_TS_LAYERS.PREVIEW) return;
  if (!this.coordsInBounds(x, y)) return this.clearPreviewTable();
  let texture = this.textures[layer - 1];
  for (let ii = 0; ii < 9; ++ii) {
    let xx = ((ii % 3) | 0) - 1;
    let yy = ((ii / 3) | 0) - 1;
    this.drawTileAt(
      tileset,
      sx + 1, sy + 1,
      x + xx, y + yy,
      layer
    );
  };
  for (let ii = 0; ii < 9; ++ii) {
    let xx = ((ii % 3) | 0) - 1;
    let yy = ((ii / 3) | 0) - 1;
    let autoTile = this.getAutoTileAt(x + xx, y + yy, layer, sx, sy);
    this.drawTileAt(
      tileset,
      sx + autoTile.x, sy + autoTile.y,
      x + xx, y + yy,
      layer
    );
  };
};

export function getTileAutoAt(x, y, layer) {
  let tile = this.getTileAt(x, y, layer);
  let tsPos = getTilesetTilePositionByIndex(tile);
  return {
    x: tsPos.x,
    y: tsPos.y
  }
};

export function inTileRange(newTile, srcTile, srcTileX, srcTileY) {
  let newTilePos = getTilesetTilePositionByIndex(newTile + 1);
  return (
    (newTilePos.x >= srcTileX) && (newTilePos.y >= srcTileY) &&
    (newTilePos.x < (srcTileX + CFG.ENGINE_AUTOTILE_WIDTH)) &&
    (newTilePos.y < (srcTileY + CFG.ENGINE_AUTOTILE_HEIGHT))
  );
};

export function getAutoTileAt(x, y, layer, sx, sy) {

  let edges = "";
  let edgeType;

  let tile = this.getTileAt(x, y, layer);

  let n = this.getTileAt(x, y - 1, layer);
  let s = this.getTileAt(x, y + 1, layer);
  let e = this.getTileAt(x + 1, y, layer);
  let w = this.getTileAt(x - 1, y, layer);

  let nw = this.getTileAt(x - 1, y - 1, layer);
  let ne = this.getTileAt(x + 1, y - 1, layer);
  let se = this.getTileAt(x + 1, y + 1, layer);
  let sw = this.getTileAt(x - 1, y + 1, layer);

  if (!this.inTileRange(n, tile, sx, sy)) edges += "N";
  if (!this.inTileRange(s, tile, sx, sy)) edges += "S";
  if (!this.inTileRange(e, tile, sx, sy)) edges += "E";
  if (!this.inTileRange(w, tile, sx, sy)) edges += "W";

  if (edges === "") {
    if (!this.inTileRange(nw, tile, sx, sy)) edges = "N+W";
    else if (!this.inTileRange(ne, tile, sx, sy)) edges = "N+E";
    if (!this.inTileRange(se, tile, sx, sy)) edges = "S+E";
    else if (!this.inTileRange(sw, tile, sx, sy)) edges = "S+W";
  }

  return CFG.TERRAIN_SHEET_EDGES[edges] || CFG.TERRAIN_SHEET_EDGES.MID;

};
