<script>
  import { ColorTranslator, Harmony, Mix } from 'colortranslator';
  export let color;

  let HSL = new ColorTranslator({R:color.R, G:color.G, B:color.B}, { decimals: 0 }).HSLObject;
  
  $: HSL, (() => {
    const RGB = new ColorTranslator(HSL, { decimals: 0 }).RGBObject;
    color.R = RGB.R;
    color.G = RGB.G;
    color.B = RGB.B;
    color = color;
  })();
</script>

<label for="{color.name}_h">h: 
  <input type="range" name="{color.name}_h" min="0" max="360" bind:value={HSL.H} />
  <input type="number" name="{color.name}_hn" min="0" max="360" bind:value={HSL.H} />
</label>
<label for="s">s:
  <input type="range" name="s" min="0" max="100" bind:value={HSL.S} />
  <input type="number" name="s" min="0" max="100" bind:value={HSL.S} />
</label>
<label for="l">l:
  <input type="range" name="l" min="0" max="100" bind:value={HSL.L} />
  <input type="number" name="l" min="0" max="100" bind:value={HSL.L} />
</label>