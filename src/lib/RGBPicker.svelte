<script>
	import ColorPicker from "./ColorPicker.svelte";
	export let color;

	const updateColor = (e) => {
		console.log('updateColor : : : ', e.detail);
		color.r = e.detail.mycolor.red;
		color.g = e.detail.mycolor.green;
		color.b = e.detail.mycolor.blue;
		color = color;
	}

</script>

<section>
	<h2>{color.name}</h2>
	<div class="horiz">
		<!-- <p>rgb({color.r}, {color.g}, {color.b})</p> -->
		<ColorPicker bind:color on:updateColor={updateColor}/>
		<!-- <div class="block" style="background-color: rgb({color.r}, {color.g}, {color.b})"></div> -->
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
		font-size: 1rem;
		color: #eee;
		margin: 0;
	}
	input[type='range'] {
		width: 100%;
	}
	label {
		display: flex;
		justify-content: space-between;
		width: 300px;
	}
	.block {
		width: 400px;
		height: 30px;
		border: 0;
		padding: 0;
	}
	section {
		margin-bottom: 1rem;
	}
</style>

