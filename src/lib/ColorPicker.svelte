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

  // export let hex = '#' + Math.floor(Math.random() * 16777215).toString(16);
  // let hex = '#' + Math.floor(Math.random() * 16777215).toString(16);
  
  // $: hexAToRGB = (h) => {
  //   let r = 0, g = 0, b = 0;

  //   // 3 digits
  //   if (h.length == 4) {
  //     r = "0x" + h[1] + h[1];
  //     g = "0x" + h[2] + h[2];
  //     b = "0x" + h[3] + h[3];

  //   // 6 digits
  //   } else if (h.length == 7) {
  //     r = "0x" + h[1] + h[2];
  //     g = "0x" + h[3] + h[4];
  //     b = "0x" + h[5] + h[6];
  //   }

  //   return "rgb("+ +r + "," + +g + "," + +b + ")";
  // }

</script>
<input type="color" value={hex} on:input={updateColor}/>
<!-- <div class="bordered">
  <p>rgb({color.r}, {color.g}, {color.b})</p>
  <p>{hex}</p>
</div> -->
  
<style>
   .bordered {
    border: 1px solid #eee;
    padding: 1rem;
   }
  input[type="color"] {
    width: 300px;
    height: 50px;
    border: 0;
    padding: 0;
  }
</style>