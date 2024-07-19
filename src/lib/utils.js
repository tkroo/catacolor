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
