import fs from "fs";
import util from "util";

export function write(path, data) {
  fs.writeFileSync(path,
    data, 'utf-8')
}

export function toString(o: any): string {
  return util.inspect(o, false, null, true)
}

export function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function sout(s: any): void {
  console.log(toString(s))
}
