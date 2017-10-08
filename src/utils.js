export const IS_NODE = typeof window === "undefined";
export const IS_BROWSER = !IS_NODE;

export function assert(truth) {
  if (!truth) throw new Error("Assert exception!");
};

export function readBinaryFile(path) {
  return new Promise((resolve) => {
    if (IS_NODE) {
      let data = require("fs").readFileSync(path);
      return resolve(data);
    }
    fetch("../" + path)
    .then(resp => resp.arrayBuffer())
    .then(res => resolve(new Uint8Array(res)));
  });
};
