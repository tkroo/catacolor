<script>
	import ColorPicker from "./ColorPicker.svelte";
	export let color;

	const updateColor = (e) => {
		color.r = e.detail.mycolor.red;
		color.g = e.detail.mycolor.green;
		color.b = e.detail.mycolor.blue;
		color = color;
	}

</script>

<section>
	<h2>"{color.name}": [{color.r}, {color.g}, {color.b}]</h2>
	<div class="horiz">
		<ColorPicker bind:color on:updateColor={updateColor}/>
		<label for="r">
			<input type="range" name="r" min="0" max="255" bind:value={color.r} />
			{color.r}
		</label>
		<label for="r">
			<input type="range" name="g" min="0" max="255" bind:value={color.g} />
			{color.g}
		</label>
		<label for="r">
			<input type="range" name="b" min="0" max="255" bind:value={color.b} />
			{color.b}
		</label>
	</div>
</section>

<style>
	h2 {
		font-size: 0.8rem;
		color: #eee;
		margin: 0;
		font-family: monospace;
	}
	input[type='range'] {
		width: 100%;
	}
	label {
		display: flex;
		justify-content: space-between;
		width: 200px;
	}
	section {
		margin-bottom: 1rem;
	}
</style>

