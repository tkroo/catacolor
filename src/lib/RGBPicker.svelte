<script>
	import { accordion } from '$lib/utils';
	import ColorPicker from "./ColorPicker.svelte";
	export let color;
	export let showRGBcontrols = false;

	const updateColor = (e) => {
		color.r = e.detail.mycolor.red;
		color.g = e.detail.mycolor.green;
		color.b = e.detail.mycolor.blue;
		color = color;
	}
</script>

<div class="picker">

	<h2>{color.name}</h2>
	<ColorPicker bind:color on:updateColor={updateColor}/>
	<div class="accordion" use:accordion={showRGBcontrols}>
		<label for="{color.name}_r">r: 
			<input type="range" name="{color.name}_r" min="0" max="255" bind:value={color.r} />
			<input type="number" name="{color.name}_rn" min="0" max="255" bind:value={color.r} />
		</label>
		<label for="g">g:
			<input type="range" name="g" min="0" max="255" bind:value={color.g} />
			<input type="number" name="g" min="0" max="255" bind:value={color.g} />
		</label>
		<label for="b">b:
			<input type="range" name="b" min="0" max="255" bind:value={color.b} />
			<input type="number" name="b" min="0" max="255" bind:value={color.b} />
		</label>
	</div>

</div>

