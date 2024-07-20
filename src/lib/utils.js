import hexRgb from "hex-rgb";

export const extractFromDFcolors = async (input) => {
  const lines = input.split('\n').filter(line => line.trim() !== '');
  const colorObject = { type: 'colordef', };
  for(let i = 0; i < lines.length; i+=3) {
    let name_string = lines[i].slice(1,-1).split(":")[0];
    let idx = name_string.indexOf('_');
    let colorName = name_string.slice(0, idx);
    if(colorName == 'LGRAY') colorName = 'GRAY';
    let arr = [
      parseInt(lines[i].slice(1,-1).split(":")[1]),
      parseInt(lines[i+1].slice(1,-1).split(":")[1]),
      parseInt(lines[i+2].slice(1,-1).split(":")[1])
    ];
    colorObject[colorName] = colorObject[colorName] || []; // Create array if not exists
    colorObject[colorName].push(...arr); // Add color value to array
  }    
  return [colorObject];
}

const GoghTranslateArr =
  {color_01: 'BLACK',
  color_02: 'RED',
  color_03: 'GREEN',
  color_04: 'BROWN',
  color_05: 'BLUE',
  color_06: 'MAGENTA',
  color_07: 'CYAN',
  color_08: 'GRAY',
  color_09: 'DGRAY',
  color_10: 'LRED',
  color_11: 'LGREEN',
  color_12: 'YELLOW',
  color_13: 'LBLUE',
  color_14: 'LMAGENTA',
  color_15: 'LCYAN',
  color_16: 'WHITE'}

export const extractFromGoghColors = async (input) => {
  delete input.foreground;
  delete input.background;
  delete input.name;
  delete input.hash;
  delete input.cursor;
  let result = { type: 'colordef' };
  for (const property in input) {
    let rgb = hexRgb(input[property]);
    result[GoghTranslateArr[property]] = [rgb.red, rgb.green, rgb.blue];
  }
  return result;   
}


export function accordion(node, isOpen) {
  let initialHeight = 70;
  node.style.height = isOpen ? 'auto' : 0;
  node.style.opacity = isOpen ? 1 : 0;
  node.style.overflow = "hidden";
  return {
    update(isOpen) {
      let animation = node.animate(
        [
          {
            opacity: 1,
            height: initialHeight + 'px',
            overflow: 'hidden'
          },
          {
            opacity: 0,
            height: 0,
            overflow: 'hidden'
          }
        ],
        { duration: 200, fill: 'both' }
      );
      animation.pause();
      if (!isOpen) {
        animation.play();
      } else {
        animation.reverse();
      }
    }
  };
}