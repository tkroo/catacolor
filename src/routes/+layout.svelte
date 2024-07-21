<script>
  import External from '$lib/External.svelte';
</script>

<svelte:head>
  <title>CataColor</title>
</svelte:head>

<header>
  <span>
    <h1><a href="/" title="CataColor">CataColor <img class="svg" src="/crayon-svgrepo-com.svg" alt="crayon icon" /></a></h1>
    <p>Color theme editor for Cataclysm: Dark Days Ahead</p>
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
</style>
