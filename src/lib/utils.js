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