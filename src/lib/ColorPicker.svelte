<script>
  export let color = 'none';
  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  import rgbHex from "rgb-hex";
  import hexRgb from "hex-rgb";
  $: hex = "#" + rgbHex(color.r, color.g, color.b);

  const updateColor = (e) => {
    dispatch('updateColor', {'mycolor': hexRgb(e.target.value)});
  }
</script>

<label for="color_{color.name}" title="click to edit color"><input type="color" id="color_{color.name}" value={hex} on:input={updateColor} /></label>
  
<style>
  input[type="color"] {
  width: 100%;
  height: 50px;
  border: 0;
  padding: 0;
  cursor: pointer;
}

input[type="color"]::-moz-color-swatch {
  border: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}
</style>