<script>
  import { writable } from 'svelte/store';
  import Combos from '$lib/Combos.svelte';
  import RGBPicker from '$lib/RGBPicker.svelte';
  import { extractFromDFcolors } from '$lib/utils';

  let colors = writable(
    [
      { "type": "colordef" },
      { name: "BLACK", r: 36, g: 31, b: 40 },
      { name: "RED", r: 192, g: 28, b: 40 },
      { name: "GREEN", r: 24, g: 139, b: 24 },
      { name: "BROWN", r: 131, g: 88, b: 11 },
      { name: "BLUE", r: 26, g: 95, b: 180 },
      { name: "MAGENTA", r: 179, g: 45, b: 145 },
      { name: "CYAN", r: 0, g: 164, b: 164 },
      { name: "GRAY", r: 185, g: 185, b: 185 },
      { name: "DGRAY", r: 127, g: 127, b: 127 },
      { name: "LRED", r: 251, g: 115, b: 115 },
      { name: "LGREEN", r: 15, g: 198, b: 61 },
      { name: "YELLOW", r: 255, g: 201, b: 60 },
      { name: "LBLUE", r: 98, g: 160, b: 234 },
      { name: "LMAGENTA", r: 229, g: 126, b: 213 },
      { name: "LCYAN", r: 84, g: 244, b: 254 },
      { name: "WHITE", r: 255, g: 255, b: 255 }
    ]
  )

  // const prefix = '[<br>  {';
  // const suffix = '  }<br>]';

  const prefix = '[\n  {\n    "type": "colordef",';
  const suffix = '\n  }\n]';
  const prefix_file = '[\n  {\n    "type": "colordef",\n';
  const suffix_file = '\n  }\n]';

  $: output = [...$colors.slice(1)]
    .map((color) => {
      return `    "${color.name}": [ ${color.r}, ${color.g}, ${color.b} ]`;
    })
    .join(',\n');

    const writeToFile = () => {
      const blob = new Blob([prefix_file, output.slice(1), suffix_file], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'base_colors.json';
      a.click();
    }

    const mapColorObject = (obj) => {
      return Object.keys(obj).map(color => {
          if (color !== 'colordef') {
            return {
              name: color,
              r: obj[color][0],
              g: obj[color][1],
              b: obj[color][2]
            }
          } else {
            return {
              name: obj[color],
          }
        }
      })
    }

    const readFile = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        const obj = data[0];
        console.log('objcdda : ', obj);
        $colors = mapColorObject(obj);
        // $colors = Object.keys(obj).map(color => {
        //   if (color !== 'colordef') {
        //     return {
        //       name: color,
        //       r: obj[color][0],
        //       g: obj[color][1],
        //       b: obj[color][2]
        //     }
        //   } else {
        //     return {
        //       name: obj[color],
        //   }
        // }
      // });
        // $colors = foo;
      };
      reader.readAsText(file);
    }

    const readDFcolors = (event) => {
		const file = event.target.files[0];
    // df_file_name = `base_colors-${file.name.replace('.txt', '')}.json`;
		const reader = new FileReader();
		reader.onload = async (event) => {
      const data = event.target.result;
      const obj = await extractFromDFcolors(data);
      console.log('obj : ', obj);
      $colors = mapColorObject(obj[0]);
      console.log('output : ', $colors);
		};

		reader.readAsText(file);
	};

</script>

<!-- <hr /> -->

<div class="cols">
  <div class="blocks">
    <h2 class="f-light">Adjust</h2>
    <label for="startfile">(optional) load a CDDA color file<br><input type="file" name="startfile" on:change={readFile} /></label>
    <label for="df_file">(optional) load a Dwarf Fortress color file<br><input type="file" name="startfile" on:change={readDFcolors} /></label>
    <p style="font-size: 0.75rem">click the colors for a color picker</p>
    {#each $colors.slice(1) as color}
      <RGBPicker bind:color />
    {/each}
  </div>
  <div class="outputobj">
    <h2 class="f-light">Output</h2>
    <button on:click={writeToFile}>download as base_colors.json</button><br>or copy the object below into<br><code>&lt;CDDA_PATH&gt;/config/base_colors.json</code>
    <br>
<textarea readonly rows="22" cols="40" on:focus={(e) => e.target.select()}>{prefix}
{output}{suffix}</textarea>
  </div>
  <div class="combos">
    <h2 class="f-light">Preview</h2>
    <Combos bind:colors={$colors} />
  </div>
</div>

<style>
  code {
    font-family: monospace;
    color: #a4d9e9;
  }
  textarea {
    margin-top: 1rem;
    /* height: 22rem; */
    width: fit-content;
    padding: 1rem 1rem 0 1rem;
    border: 1px solid #888;
    color: #eee;
    background-color: rgb(36,31,40);
  }

  .cols {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 3rem;
  }

  .outputobj, .blocks label, .blocks input {
    font-size: 0.75rem;
  }

  .blocks label {
    display: block;
    margin-bottom: 1rem;
  }

  .outputobj h2 {
    font-size: 1.5rem;
  }

  .outputobj button {
    font-size: inherit;
  }
  .f-light {
    font-weight: 400;
  }
</style>
