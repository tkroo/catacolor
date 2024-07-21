import hexRgb from "hex-rgb";

const extractFromDFcolors = async (input) => {
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

const GoghTranslateObj = {
color_01: 'BLACK',
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
color_16: 'WHITE'};

// const base16TranslateObj = {
// base00: 'BLACK',
// base01: 'DGRAY',
// base02: 'LMAGENTA',
// base03: 'LGREEN',
// base04: 'LCYAN',
// base05: 'MAGENTA',
// base06: 'GRAY',
// base07: 'WHITE',
// base08: 'RED',
// base09: 'CYAN',
// base0A: 'YELLOW',
// base0B: 'GREEN',
// base0C: 'LBLUE',
// base0D: 'BLUE',
// base0E: 'LRED',
// base0F: 'BROWN'};

const extractFromGoghColors = async (input) => {
  delete input.foreground;
  delete input.background;
  delete input.name;
  delete input.hash;
  delete input.cursor;
  let result = { type: 'colordef' };
  for (const property in input) {
    let rgb = hexRgb(input[property]);
    result[GoghTranslateObj[property]] = [rgb.red, rgb.green, rgb.blue];
  }
  return result;   
}

// const extractFromBase16Colors = async (input) => {
//   let result = { type: 'colordef' };
//   for (const property in input) {
//     let color = input[property].color;
//     let name = input[property].name;
//     let rgb = hexRgb(color);
//     result[base16TranslateObj[name]] = [rgb.red, rgb.green, rgb.blue];
//   }
//   return result;
// }


const mapColorObject = (obj) => {
  return Object.keys(obj).map((color) => {
    if (color !== 'colordef') {
      return {
        name: color,
        r: obj[color][0],
        g: obj[color][1],
        b: obj[color][2]
      };
    } else {
      return {
        name: obj[color]
      };
    }
  });
};


export const detectThemeFormat = async (data, file) => {
  let colors = [];
  let file_type = 'unknown';
  
    // likely a DF colors file
    if (file.type == 'text/plain' && data.split('\n').shift().slice(0,9) == '[BLACK_R:') {
      const obj = await extractFromDFcolors(data);
      file_type = 'Dwarf Fortress';
      colors = mapColorObject(obj[0]);
    }

    // likely a CCDA file
    if (file.type == 'application/json' && JSON.parse(data).constructor.name == 'Array') {
      const j = JSON.parse(data);
      if(Object.prototype.hasOwnProperty.call(j[0], 'BLACK') && j[0].type == 'colordef') {
        file_type = 'Cataclysm';
        colors = mapColorObject(j[0]);
      }
    }

    // likely a base16 file
    // if(file.name.split('.').pop() == 'vim' && data.split('\n').shift() == 'hi clear') {
    //   let lines = data.split('\n').slice(3,7);
    //   lines = lines.map(x => x.replaceAll(/[\\'"]/gm, '')
    //   .trim())
    //   .join()
    //   .replaceAll('"', '')
    //   .replaceAll(' ', '')
    //   .replaceAll('=', ':')
    //   .split(',')
    //   .filter(x => x != '')
    //   .map(x => {return {name: x.split(':')[0], color: x.split(':')[1]}});
    //   const obj = await extractFromBase16Colors(lines);
    //   file_type = 'base16-nvim';
    //   colors = mapColorObject(obj);
    // }

    // likely a Gogh file
    if (file.type == 'application/json' && JSON.parse(data).constructor.name == 'Object') {
      try {
        const j = JSON.parse(data); 
        if(Object.prototype.hasOwnProperty.call(j, 'color_01')) {
          const obj = await extractFromGoghColors(j);
          file_type = 'Gogh';
          colors = mapColorObject(obj);
        }
      } catch(error) {
        console.log(error);
      }
    }

    return {colors, file_type};
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