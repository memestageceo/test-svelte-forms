<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	let { children }: { children: Snippet } = $props();
</script>

<div class="mx-auto mt-24 w-full max-w-md">
	{@render children()}
</div>
