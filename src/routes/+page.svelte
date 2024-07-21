<script>
	import Combos from '$lib/Combos.svelte';
	import RGBPicker from '$lib/RGBPicker.svelte';
	import { detectThemeFormat } from '$lib/utils';
	import External from '$lib/External.svelte';
	import { formats } from "$lib/stores";
	let message = null;
	let success = false;
	let showRGBcontrols = false;

	let colors = [
		{ type: 'colordef' },
		{ name: 'BLACK', r: 36, g: 31, b: 40 },
		{ name: 'RED', r: 192, g: 28, b: 40 },
		{ name: 'GREEN', r: 24, g: 139, b: 24 },
		{ name: 'BROWN', r: 99, g: 69, b: 44 },
		{ name: 'BLUE', r: 26, g: 95, b: 180 },
		{ name: 'MAGENTA', r: 179, g: 45, b: 145 },
		{ name: 'CYAN', r: 0, g: 164, b: 164 },
		{ name: 'GRAY', r: 185, g: 185, b: 185 },
		{ name: 'DGRAY', r: 127, g: 127, b: 127 },
		{ name: 'LRED', r: 251, g: 115, b: 115 },
		{ name: 'LGREEN', r: 15, g: 198, b: 61 },
		{ name: 'YELLOW', r: 255, g: 201, b: 60 },
		{ name: 'LBLUE', r: 98, g: 160, b: 234 },
		{ name: 'LMAGENTA', r: 229, g: 126, b: 213 },
		{ name: 'LCYAN', r: 84, g: 244, b: 254 },
		{ name: 'WHITE', r: 255, g: 255, b: 255 }
	];

	const ordered = [ 'BLACK', 'RED', 'GREEN', 'BROWN', 'BLUE', 'MAGENTA', 'CYAN', 'GRAY', 'DGRAY', 'LRED', 'LGREEN', 'YELLOW', 'LBLUE', 'LMAGENTA', 'LCYAN', 'WHITE' ];

	$: sorted = colors.slice(1).sort((a, b) => {
		return ordered.indexOf(a.name) - ordered.indexOf(b.name);
	});

	const prefix = '[\n  {\n    "type": "colordef",';
	const suffix = '\n  }\n]';
	const prefix_file = '[\n  {\n    "type": "colordef",\n';
	const suffix_file = '\n  }\n]';

	$: output = [...colors.slice(1)]
		.map((color) => {
			return `    "${color.name}": [ ${color.r}, ${color.g}, ${color.b} ]`;
		})
		.join(',\n');

	const writeToFile = () => {
		const blob = new Blob([prefix_file, output, suffix_file], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'base_colors-untitled.json';
		a.click();
	};

	const readFile = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = async(event) => {
			const data = event.target.result;
			let tmp = await detectThemeFormat(data, file);
			console.log(tmp);
			if (tmp.colors.length == 17) {
				message = `LOADED: ${tmp.file_type} theme`;
				success = true;
				colors = tmp.colors;
			} else {
				success = false;
				message = `ERROR: unexpected format`;
			}
		}
		reader.readAsText(file);
	}

</script>

<div class="col-adjust">
  <h2 class="f-light">Adjust</h2>
	
	<p style="font-size: 0.75rem">
		Click the colors for a color picker and/or <button class="btn" on:click={() => (showRGBcontrols = !showRGBcontrols)}>toggle RGB sliders</button>
	</p>
	<div class="picker-blocks">
		{#each sorted as color}
			<RGBPicker bind:color bind:showRGBcontrols />
		{/each}
	</div>
  <div class="controls">
		<label for="importTheme">optional: load a {#each $formats as format, i}
			<a href="{format.url}">{format.name}</a>{#if i < $formats.length - 1}&nbsp;or&nbsp;{/if}
			{/each}
			theme. <a href="/about">(more info)</a>
		<input
      type="file"
      class="input"
      name="importTheme"
      on:change={readFile}/>
    </label>
		{#if message}<span class="{success ? 'success' : 'error'}">{message}</span>{/if}
	</div>
</div>

<div class="cols">
	<div class="col-output">
		<label for="output"><h2 class="output-label">Output</h2></label>
			<textarea name="output" id="output" readonly rows="22" cols="40" on:focus={(e) => e.target.select()}>{prefix}
{output}{suffix}</textarea>
		<h3>Instructions</h3>
    <p>You can paste the above code into:<br /><code>&lt;CDDA_PATH&gt;/config/base_colors.json</code></p>
    <p>If you're using Catapult launcher, the file might be here: <br /><code>&lt;CDDA_PATH&gt;/dda/userdata/config/base_colors.json</code></p>
		<p>Or you can download a .json file</p>
		<button class="btn wide" on:click={writeToFile}>download .json file</button>
		<ol>
			<li>Put the generated json file here:<br><code>&lt;CDDA_PATH&gt;/data/raw/color_themes/base_colors-YOURTHEME.json</code></li>
			<li>Launch Cataclysm</li>
			<li>In the start menu, choose <code>[Settings]</code></li>
			<li>Choose <code>&gt;&gt; Colors</code></li>
			<li>Press <code>C</code> and choose your theme from the list.</li>
		</ol>
		<p>You may need to reload the game to see the changes.</p>
	</div>

	<div class="col-preview">
		<h2 class="f-light">Preview</h2>
		<Combos bind:colors />
	</div>
</div>

