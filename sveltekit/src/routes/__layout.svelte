<script>
  import '../css/styles.css';
  import Navigation from '../components/Navigation.svelte';
  import { query, searching } from '$lib/search/stores.js';
  import { onMount } from 'svelte';

  let platform;
  onMount(() => {
    platform = navigator.platform === 'MacIntel' ? '⌘' : 'Ctrl';
  });
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
        <span>Search <kbd>{platform == undefined ? '' : '⌘'}</kbd> <kbd>K</kbd></span>
      </label>
    </div>
  {/if}
  <slot />
</main>

<style>
  main {
    position: relative;
    padding-top: 64px;
  }
  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    animation: fade-in 0.5s;
    width: 100%;
    height: 100%;
  }
  input {
    border-radius: 18px;
    border: none;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
