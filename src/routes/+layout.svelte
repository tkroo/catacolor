<svelte:head>
  <title>CataColor</title>
</svelte:head>

<header>
  <h1>🖍️ CataColor</h1>
  <!-- <nav>
    <a href="/">home</a>
    <a href="/dfc">convert a Dwarf Fortess colors.txt file to CDDA format</a>
  </nav> -->
  <span class="gh">
    <a href="https://github.com/tkroo/catacolor" title="GitHub Repo">source <img class="svg" src="/github-142-svgrepo-com.svg" alt="github icon" /></a> 
  </span>
</header>
<main>
  <slot />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 1rem 2rem;
    color: #eee;
    background-color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  nav {
    display: flex;
    gap: 0.5rem;
  }
  nav a {
    color: #eee;
  }
  nav a:hover {
    text-decoration: underline;
  }
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
  }
  h1 {
    margin: 0;
    color: #eee;
    font-weight: 400;
  }
  .gh a {
    font-size: 0.75rem;
    color: #eee;
    text-decoration: none;
  }
  .gh a:hover {
    text-decoration: underline;
  }
  .gh .svg {
    width: 1rem;
    height: 1rem;
  }
</style>