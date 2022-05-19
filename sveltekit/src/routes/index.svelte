<script context="module">
  import client from '$lib/client';
  export async function load() {
    const query = `*[_type == "post"]`;
    const apps = await client.fetch(query);
    return {
      props: { apps }
    };
  }
</script>

<script>
  import { focusable_children, trap } from '$lib/actions/focus';
  import { query, searching } from '$lib/search/stores.js';

  export let apps;
  let filteredApps = [];
  let modal;

  $: filteredApps = apps.filter((app) => {
    let appName = app.title.toLowerCase();
    return appName.includes($query.toLowerCase());
  });

  function close() {
    if ($searching) {
      $searching = false;
      const scroll = -parseInt(document.body.style.top || 0);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.tabIndex = -1;
      document.body.focus();
      document.body.removeAttribute('tabindex');
      window.scrollTo(0, scroll);
    }
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'k' && (navigator.platform === 'MacIntel' ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      $query = '';
      if ($searching) {
        close();
      } else {
        $searching = true;
      }
    }
    if (e.code === 'Escape') {
      close();
      $query = '';
    }
  }}
/>

<!-- Search input -->

{#if $searching && filteredApps}
  <div class="modal-background" on:click={close} />
  <div
    bind:this={modal}
    class="modal"
    on:keydown={(e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const group = focusable_children(e.currentTarget);
        const selector = 'a,input';

        if (e.key === 'ArrowDown') {
          group.next(selector);
        } else {
          group.prev(selector);
        }
      }
    }}
    use:trap
  >
    <div class="search-box">
      <input
        type="text"
        aria-describedby="search-description"
        autofocus
        placeholder="Search"
        on:keydown={(e) => {
          if (e.key === 'Enter') {
            if (filteredApps.length > 0) {
              modal.querySelector('a').click();
            }
          }
        }}
        on:input={(e) => {
          $query = e.target.value;
        }}
      />
      <div class="result" class:hide={!$query}>
        {#if filteredApps.length > 0}
          <ul>
            {#each filteredApps as app, index}
              <li>
                <a href={`/posts/${app.slug.current}`}>{app.title} </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  input {
    width: 100%;
    padding: 0.7rem;
    font-size: 1.4rem;
    flex-shrink: 0;
    outline: none;
    border-color: transparent;
  }
  input:focus-visible {
    background-color: rgb(44, 56, 86);
    color: white;
  }
  /* .search-container {
    position: relative;
    display: flex;
    align-items: center;
    animation: fade-in 0.2s;
    width: 100%;
    height: 100%;
  }
  .search-container input {
    padding: 0.5em 0.5em 0.4em 0.5em;
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: 1.6rem;
  }
  input[type='search'] {
    text-align: center;
    appearance: none;
    -webkit-apperance: none;
  } */
  input::placeholder {
    font-size: 1.4rem;
  }
  input:focus-visible::placeholder {
    color: rgb(255, 255, 255);
  }
  .modal-background,
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-background {
    background-color: rgba(182, 182, 182, 0.135);
  }
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  .search-box {
    position: relative;
    height: calc(100% - 2rem);
    width: calc(100vw - 2rem);
    max-width: 50rem;
    max-height: 50rem;
    filter: drop-shadow(2px 4px 16px rgba(0, 0, 0, 0.2));
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: 20rem;
  }

  .search-box > * {
    pointer-events: all;
  }
  .hide {
    display: none;
  }
  .result {
    background-color: white;
  }
  ul {
    padding-left: 0;
  }
  li {
    list-style: none;
    width: 100%;
  }
  a {
    width: 100%;
    padding: 1rem;
    display: block;
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
  }
  a:focus {
    background: rgb(44, 56, 86);
    color: white;
    outline: none;
  }
</style>
