<script>
  import { ColorTranslator } from "colortranslator";
  import { onMount } from "svelte";

  let startColor = `hsl(${getRandom(0, 360)} ${getRandom(60, 99)}% ${getRandom(20, 50)}%)`;

  onMount(() => {
    startColor = `hsl(${getRandom(0, 360)} ${getRandom(60, 99)}% ${getRandom(20, 50)}%)`;
  });

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  const generateColorWordThing = (c, word, reverse=false) => {
    const tints = ColorTranslator.getTints(c, word.length);
    if (reverse) tints.reverse();
    return tints.map((tint, i) => `<span style="display:inline; color:${tint}">${word[i]}</span>`).join('');
  }

</script>

<svelte:head>
  <title>CataColor</title>
</svelte:head>

<header>
  <span>
    <h1><a href="/" title="CataColor">{@html generateColorWordThing(startColor,'CataColor')}</a></h1>
    <!-- <h1><a href="/" title="CataColor"><span class="tint" style="color:{tints[0]}">Cat</span><span class="tint" style="color:{tints[1]}">aCo</span><span class="tint" style="color:{tints[2]}">lor</span></a></h1> -->
    <p>Color theme editor for Cataclysm: Dark Days Ahead</p>
    <!-- <p>{@html generateColorWordThing(color, 'Color theme editor for Cataclysm: Dark Days Ahead', true)}</p> -->
  </span>
  <span class="gh">
    <a href="https://github.com/tkroo/catacolor" title="GitHub Repo">source <img class="svg" src="/github-142-svgrepo-com.svg" alt="github icon" /></a> 
  </span>
</header>
<main>
  <slot />
</main>

<style>
  h1 a {
  color: #eee;
  text-decoration: none;
  }
  .tint {
    display: inline;
  }
  .svg {
    width: 1.5rem;
  }

</style>
