<script>
	export let sorted;
  import contrast from 'get-contrast';

  const createCombos = (sorted) => {
    const array = [];
    for (const fg in sorted) {
      const fgColor = sorted[fg];
      for (const bg in sorted) {
        const bgColor = sorted[bg];
        const combo = [bgColor, fgColor];
        if (combo[0].NAME != combo[1].NAME) array.push(combo);
      }
    }
    return array;
  }

  $:colorCombos = createCombos(sorted);

  const myratio = (combo) => {
    let c1 = `rgb(${combo[0].R}, ${combo[0].G}, ${combo[0].B})`;
    let c2 = `rgb(${combo[1].R}, ${combo[1].G}, ${combo[1].B})`;
    return contrast.score(c1,c2)
  }

  let showWCAG = false;


</script>

<p style="font-size: 0.75rem">A preview of foreground/background color combinations. <button class="btn" on:click={() => (showWCAG = !showWCAG)}>toggle contrast scores</button></p>
<div class="combo-container">
  {#each colorCombos as combo}
  <div class="combo" style="background-color: rgb({combo[1].R}, {combo[1].G}, {combo[1].B}); color: rgb({combo[0].R}, {combo[0].G}, {combo[0].B})">
    <span class="inner"><span class="fixed-width">{combo[0].NAME} on {combo[1].NAME}</span> You must prepare to face the many hardships to come.</span>
    {#if showWCAG}<span class={myratio(combo) == 'Fail' ? 'wcag fail' : 'wcag'}>{myratio(combo)}</span>{/if}
    </div>
    <div class="combo" style="background-color: rgb({combo[1].R}, {combo[1].G}, {combo[1].B}); color: rgb({combo[0].R}, {combo[0].G}, {combo[0].B})">
      <span class="inner"><strong><span class="fixed-width">BOLD:</span> You must prepare to face the many hardships to come.</strong></span>
    </div>
  {/each}
</div>

<style>
  .wcag {
    color: #eee;
    background-color: #444;
    padding: 0 0.25rem;
    font-size: 0.6rem;
  }
  .fail {
    color: crimson;
  }
</style>