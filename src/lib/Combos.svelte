<script>
	export let colors;

  const createCombos = (colors) => {
    const array = [];
    for (const fg in colors.slice(1)) {
      const fgColor = colors.slice(1)[fg];
      for (const bg in colors.slice(1)) {
        const bgColor = colors.slice(1)[bg];
        const combo = [bgColor, fgColor];
        if (combo[0].NAME != combo[1].NAME) array.push(combo);
      }
    }
    return array;
  }

  $:colorCombos = createCombos(colors);
</script>

<p style="font-size: 0.75rem">A preview of all possible foreground/background color combinations.</p>
<div class="combo-container">
  {#each colorCombos as combo}
    <div class="combo" style="background-color: rgb({combo[1].R}, {combo[1].G}, {combo[1].B}); color: rgb({combo[0].R}, {combo[0].G}, {combo[0].B})">
      <span class="inner"><span class="fixed-width">{combo[0].NAME} on {combo[1].NAME}</span> You must prepare to face the many hardships to come.</span>
    </div>
    <div class="combo" style="background-color: rgb({combo[1].R}, {combo[1].G}, {combo[1].B}); color: rgb({combo[0].R}, {combo[0].G}, {combo[0].B})">
      <span class="inner"><strong><span class="fixed-width">BOLD:</span> You must prepare to face the many hardships to come.</strong></span>
    </div>
  {/each}
</div>
