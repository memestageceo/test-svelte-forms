<script lang="ts">
	import MigrationForm from './MigrationForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<MigrationForm data={data.form} />
