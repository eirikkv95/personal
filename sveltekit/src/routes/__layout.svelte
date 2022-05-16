<script>
  import '../css/styles.css';
  import Navigation from '../components/Navigation.svelte';
  import { query, searching } from '$lib/search/stores.js';
</script>

<Navigation />

<main class="maxWidthWrapper">
  <!-- Input to open seasrch input ;) -->
  {#if !$searching}
    <div class="search-container">
      <input
        id="search"
        class="first"
        type="search"
        on:input={(e) => {
          $searching = true;
          $query = e.target.value;
          e.target.value('');
        }}
        on:mousedown|preventDefault={() => ($searching = true)}
        on:touchstart|preventDefault={() => ($searching = true)}
      />
      <label for="#search">
        <!-- <span>Search <kbd>{navigator.platform === 'MacIntel' ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd></span> -->
      </label>
    </div>
  {/if}
  <slot />
</main>

<style>
  main {
    position: relative;
    /* display: grid;
    grid-template:
      'newest categories'
      'newest popular' 1fr / 2fr 1fr; */
    /* gap: 64px 96px; */
    padding-top: 64px;
  }
  input {
    border-radius: 18px;
    border: none;
  }
</style>
