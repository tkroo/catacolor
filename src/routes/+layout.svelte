<svelte:head>
  <title>CataColor</title>
</svelte:head>

<header>
  <h1>CataColor <img class="svg" src="/crayon-svgrepo-com.svg" alt="crayon icon" /></h1>
  <span class="gh">
    <a href="https://github.com/tkroo/catacolor" title="GitHub Repo">source <img class="svg" src="/github-142-svgrepo-com.svg" alt="github icon" /></a> 
  </span>
</header>
<main>
  <slot />
</main>

<style>
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
    /* border-bottom: 1px solid #009d00; */
    padding: 1rem 0;
    margin-bottom: 1rem;
  }
  h1 {
    margin: 0;
    font-weight: 900;
  }
  .gh a {
    font-size: 0.75rem;
    color: #76b5fc;
    text-decoration: none;
  }
  .gh a:hover {
    text-decoration: underline;
  }
  .gh .svg {
    width: 1rem;
    height: 1rem;
  }
  h1 .svg {
    width: 2rem;
    height: 2rem;
  }
</style>