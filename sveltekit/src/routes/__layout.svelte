<script>
  import '../css/styles.css';
  import Navigation from '../components/Navigation.svelte';
</script>

<Navigation />
<main class="maxWidthWrapper">
  <slot />
</main>

<style>
  main {
    position: relative;
    display: grid;
    grid-template:
      'newest categories'
      'newest popular' 1fr / 2fr 1fr;
    gap: 64px 96px;
    padding-top: 64px;
  }
</style>
