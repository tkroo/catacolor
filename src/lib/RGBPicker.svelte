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
		<label for="r">r: 
			<input type="range" name="r" min="0" max="255" bind:value={color.r} />
			<input type="number" name="r" min="0" max="255" bind:value={color.r} />
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

<style>
	.picker {
		position: relative;
		padding: 0 0.5rem;
		margin-bottom: 1rem;
	}
	.accordion {
		opacity: 0;
		height: 0;
	}
	h2 {
		font-size: 0.8rem;
		color: #eee;
		margin: 0;
		font-family: monospace;
	}

	input[type='range'] {
		width: 100%;
	}

	input[type='number'] {
		font-size: 0.7rem;
		height: min-content;
		width: 2.5rem;
	}

	label {
		display: flex;
		justify-content: space-between;
		max-width: 100%;
		font-size: 0.7rem;
	}
	
</style>

