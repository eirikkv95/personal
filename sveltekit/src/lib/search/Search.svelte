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
  import { searching, query, logThis } from './stores';

  export let apps;
  let searchTerm;
  let filteredApps = [];

  $: filteredApps = apps.filter((app) => {
    let appName = app.title.toLowerCase();
    return appName.includes(searchTerm);
  });

  function close() {
    if ($searching) {
      $searching = false;
      const scroll = -parseInt(document.body.style.top || '0');
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
    if (
      e.key === 'k' &&
      (navigator?.userAgentData?.platform || navigator.platform === 'MacIntel'
        ? e.metaKey
        : e.ctrlKey)
    ) {
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
    }
  }}
/>
{#if $searching}
  <div
    class="wrapper"
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
    <input
      type="text"
      aria-describedby="search-description"
      on:input={(e) => {
        $query = e.target.value;
      }}
    />
    <div class="result">
      {#if $query}
        {#if filteredApps.length > 0}
          <ul>
            {#each filteredApps as app}
              <li>
                <a href={`/posts/${app.slug.current}`}>{app.title} </a>
              </li>
            {/each}
          </ul>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<style>
  input {
    width: 100%;
  }
  a:focus {
    background: rgb(46, 52, 69) (120, 103, 103);
    color: white;
    outline: none;
  }
  a {
    width: 100%;
    padding: 1rem;
    display: block;
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
</style>
