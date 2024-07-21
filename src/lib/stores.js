import { writable } from "svelte/store";

export const formats = writable([
  {name: 'Cataclysm: DDA', url:'https://github.com/CleverRaven/Cataclysm-DDA/tree/master/data/raw/color_themes'},
  {name: 'Dwarf Fortress', url:'https://manmademagic.github.io/DFColorGen/'},
  {name: 'Gogh', url:'https://github.com/Gogh-Co/Gogh/tree/master/json'}
]);
