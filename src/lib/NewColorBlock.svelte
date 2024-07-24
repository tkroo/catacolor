<script>
  import { ColorTranslator, Harmony, Mix } from 'colortranslator';
  import { accordion } from '$lib/utils';
  export let color;
  const NAME = color.NAME;
  export let showControls = false;

  const initialColor = new ColorTranslator({R: color.R, G: color.G, B: color.B});

  $: HEX = initialColor.HEX;
    
  let RGB = initialColor.RGBObject;
  $: RGB, updateColor(null, RGB);
  
  let HSL = initialColor.HSLObject;
  $: HSL, updateColor(null, new ColorTranslator(HSL).RGBObject);

  const updateColor = (e, v) => {
    const value = e ? e.target.value : {R:v.R, G:v.G, B:v.B};
    const newColor = new ColorTranslator(value, {decimals: 0});
    HSL = newColor.HSLObject;
    RGB = newColor.RGBObject;
    HEX = newColor.HEX;
    color.R = RGB.R;
    color.G = RGB.G;
    color.B = RGB.B;
    color.NAME = NAME;
    // console.log('color: ', color);
    color = color;
	}
  

</script>


<div class="block">
  <label class="color-name" for="color_{color.NAME}" title="click to edit color">{color.NAME}</label>
    <input type="color" id="color_{color.NAME}" value={HEX} on:change={updateColor} />
  <!-- {#if showControls} -->
    <div class="accordion" use:accordion={showControls}>
      <div class="controls-hsl">
        <label for="{color.NAME}_h">h:
          <input type="range" name="{color.NAME}_h" min="0" max="359" bind:value={HSL.H} />
          <input type="number" name="{color.NAME}_hn" min="0" max="359" bind:value={HSL.H} />
        </label>
        <label for="s">s:
          <input type="range" name="s" min="0" max="100" bind:value={HSL.S} />
          <input type="number" name="s" min="0" max="100" bind:value={HSL.S} />
        </label>
        <label for="l">l:
          <input type="range" name="l" min="0" max="100" bind:value={HSL.L} />
          <input type="number" name="l" min="0" max="100" bind:value={HSL.L} />
        </label>
      </div>
      <div class="controls-rgb">
        <label for="{color.NAME}_r">r:
          <input type="range" name="{color.NAME}_r" min="0" max="255" bind:value={RGB.R} />
          <input type="number" name="{color.NAME}_rn" min="0" max="255" bind:value={RGB.R} />
        </label>
        <label for="g">g:
          <input type="range" name="g" min="0" max="255" bind:value={RGB.G} />
          <input type="number" name="g" min="0" max="255" bind:value={RGB.G} />
        </label>
        <label for="b">b:
          <input type="range" name="b" min="0" max="255" bind:value={RGB.B} />
          <input type="number" name="b" min="0" max="255" bind:value={RGB.B} />
        </label>
      </div>
      <div class="controls-hex">
        <label for="{color.NAME}_hex">hex: <input class="hexinput" type="text" name="{color.NAME}_hex" value={HEX} on:change={updateColor}/></label>
      </div>
    </div>
    <!-- {/if} -->
</div>

<style>
  .block {
    display: flex;
    flex-direction: column;
    /* width: 320px; */
    /* border: 1px solid crimson; */
    /* gap: 1rem; */
    margin-bottom: 2rem;
    padding: 0.35rem;
    font-size: 0.75rem;
    line-height: 1.5rem;
  }

  .color-name {
    font-weight: bold;
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }

  .controls-hsl, .controls-rgb, .controls-hex {
    margin-bottom: 1rem;
  }
  
  .controls-hsl label, .controls-rgb label, .block label {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  input {
    font-size: inherit;
  }
  input[type="range"] {
    flex: 1;
    max-width: 50%;
  }
  input[type="number"] {
    font-size: 0.75rem;
    width: 40px;
  }
  .hexinput {
    width: 56px;
  }


  input[type="color"] {
    display: block;
    width: 100%;
    height: 50px;
    border: 0;
    padding: 0;
    cursor: pointer;
    margin-bottom: 1rem;
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