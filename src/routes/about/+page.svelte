<script>
  import External from "$lib/External.svelte";
  import { formats } from "$lib/stores";
</script>

<h1>Info</h1>
<p>CataColor is a color theme editor for the game <a href="https://cataclysmdda.org/">Cataclysm: Dark Days Ahead <External /></a></p>
<p>If importing an existing theme, the tool will try to automatically detect the format, and then conversion is attempted.</p>
<p class="warning">The format detection is not very robust, so if the format is not as expected, theme import may fail.</p>
<h2>formats</h2>

<p>This tool can import correctly formatted theme files from:</p>
<ul>
  {#each $formats as format}
    <li>{format.name} <a href="{format.url}">link to themes <External /></a></li>
  {/each}
</ul>

<a href="/">&larr; back</a>

<style>
  .warning {
    font-weight: 400;
    font-style: italic;
  }
</style>
