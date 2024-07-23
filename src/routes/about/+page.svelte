<script>
  import External from "$lib/External.svelte";
  import { formats } from "$lib/stores";
</script>

<a href="/">&larr; back</a>
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

<a id="instructions"><h2>Instructions</h2></a>
    <p>You can copy and paste the output code into:<br /><code>&lt;CDDA_PATH&gt;/config/base_colors.json</code></p>
    <p>If you're using Catapult launcher, the file might be here: <br /><code>&lt;CDDA_PATH&gt;/dda/userdata/config/base_colors.json</code></p>
		<p>Or you can download as a .json file</p>
		<ol>
			<li>Put the generated json file here:<br><code>&lt;CDDA_PATH&gt;/data/raw/color_themes/base_colors-YOURTHEME.json</code></li>
			<li>Launch Cataclysm</li>
			<li>In the start menu, choose <code>[Settings]</code></li>
			<li>Choose <code>&gt;&gt; Colors</code></li>
			<li>Press <code>C</code> and choose your theme from the list.</li>
		</ol>
		<p>You may need to reload the game to see the changes.</p>


<style>
  .warning {
    font-weight: 400;
    font-style: italic;
  }
  #instructions {
    color: #eee;
  }
</style>
