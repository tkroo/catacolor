<script>
  import RGBPicker from '$lib/RGBPicker.svelte';
  import { writable } from 'svelte/store';
  let colors = writable([
    { type:"colordef" },
    { name: 'BLACK', r: 15, g: 15, b: 15 },
    { name: 'RED', r: 165, g: 29, b: 45 },
    { name: 'GREEN', r: 23, g: 123, b: 23 },
    { name: 'BROWN', r: 131, g: 88, b: 11 },
    { name: 'BLUE', r: 44, g: 17, b: 162 },
    { name: 'MAGENTA', r: 179, g: 45, b: 145 },
    { name: 'CYAN', r: 0, g: 164, b: 164 },
    { name: 'GRAY', r: 185, g: 185, b: 185 },
    { name: 'DGRAY', r: 127, g: 127, b: 127 },
    { name: 'LRED', r: 255, g: 82, b: 82 },
    { name: 'LGREEN', r: 15, g: 198, b: 61 },
    { name: 'YELLOW', r: 255, g: 201, b: 60 },
    { name: 'LBLUE', r: 43, g: 131, b: 202 },
    { name: 'LMAGENTA', r: 229, g: 126, b: 213 },
    { name: 'LCYAN', r: 84, g: 244, b: 254 },
    { name: 'WHITE', r: 255, g: 255, b: 255 }
  ]);

  const prefix = '[<br>  {';
  const suffix = '  }<br>]';

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

    const readFile = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        const obj = data[0];
        console.log('=========');
        console.log(obj);
        console.log('=========');
        $colors = Object.keys(obj).map(color => {
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
      });
        // $colors = foo;
      };
      reader.readAsText(file);
    }

</script>

<h1>CataColor</h1>
<hr />

<div class="cols">
  <div class="blocks">
    {#each $colors.slice(1) as color}
      <RGBPicker bind:color />
    {/each}
  </div>
  <div class="outputobj">
    <input type="file" accept="application/json" on:change={readFile} /><br>
    <button on:click={writeToFile}>download as base_colors.json</button> or copy the object below into <code>base_colors.json</code>
    <pre>
{@html prefix}
    "type": "colordef",
{@html output}
{@html suffix}
    </pre>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 2rem;
    color: #eee;
    background-color: black;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      Fira Sans,
      Droid Sans,
      Helvetica Neue,
      sans-serif;
  }

  h1 {
    margin: 0;
    color: #eee;
  }

  .cols {
    display: flex;
    justify-content: flex-start;
    gap: 5rem;
  }

  .outputobj {
    font-size: 0.75rem;
  }
  .outputobj button {
    font-size: inherit;
  }
</style>
