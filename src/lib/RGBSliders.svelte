<script>
  export let color;

  const constrainRGB = () => {
		color.R = Math.max(0, Math.min(255, color.R));
		color.G = Math.max(0, Math.min(255, color.G));
		color.B = Math.max(0, Math.min(255, color.B));
	}

	$: color.R , constrainRGB();
	$: color.G , constrainRGB();
	$: color.B , constrainRGB();

</script>


<label for="{color.NAME}_r">r: 
  <input type="range" name="{color.NAME}_r" min="0" max="255" bind:value={color.R} />
  <input type="number" name="{color.NAME}_rn" min="0" max="255" bind:value={color.R} />
</label>
<label for="g">g:
  <input type="range" name="g" min="0" max="255" bind:value={color.G} />
  <input type="number" name="g" min="0" max="255" bind:value={color.G} />
</label>
<label for="b">b:
  <input type="range" name="b" min="0" max="255" bind:value={color.B} />
  <input type="number" name="b" min="0" max="255" bind:value={color.B} />
</label>