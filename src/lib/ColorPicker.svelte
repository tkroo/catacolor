<script>
	import { accordion } from '$lib/utils';
	import ColorSwatch from "./ColorSwatch.svelte";
	import RGBSliders from './RGBSliders.svelte';
	import HSLSliders from './HSLSliders.svelte';
	export let color;
	export let showRGBcontrols = false;
	export let showHSLcontrols = false;

	const updateColor = (e) => {
		color.R = e.detail.mycolor.red;
		color.G = e.detail.mycolor.green;
		color.B = e.detail.mycolor.blue;
		color = color;
	}
</script>

<div class="picker">

	<h2>{color.NAME}</h2>
	<ColorSwatch bind:color on:updateColor={updateColor}/>
	<div class="accordion" use:accordion={showRGBcontrols}>
		<RGBSliders bind:color />
	</div>
	<div class="accordion" use:accordion={showHSLcontrols}>
		<HSLSliders bind:color />
	</div>

</div>

