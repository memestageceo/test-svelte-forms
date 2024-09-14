<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, FieldErrors, Description } from 'formsnap';

	import { accountingSoftware, supportedSoftware } from '$lib/accountingApps';
	import { fly } from 'svelte/transition';
	import type { MigrationFormSchemaType } from '$lib/formSchema';

	import type { SuperValidated, Infer } from 'sveltekit-superforms';

	let { data }: { data: SuperValidated<Infer<MigrationFormSchemaType>> } = $props();

	/**form is a svelte store, access with $*/
	const { form, errors, constraints, enhance, message } = superForm(data);

	function deslugify(str: string) {
		return str
			.split('-')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');
	}
</script>

{#if $message}
	<p
		class="fixed left-1/2 top-4 -translate-x-1/2 rounded-md bg-green-500 p-2 font-bold text-white"
		transition:fly={{ y: '-100%' }}
	>
		{$message}
	</p>
{/if}

<form
	method="post"
	class="my-10 flex flex-col items-start gap-4 text-lg"
	use:enhance
	action="/superforms"
>
	<div class="flex flex-col gap-1">
		<label for="name">Name</label>
		<input bind:value={$form.name} type="text" name="name" id="name" {...$constraints.name} />
		{#if $errors.name}
			<small>{$errors.name}</small>
		{/if}
	</div>
	<div class="flex flex-col gap-1">
		<label for="email">Email</label>
		<input bind:value={$form.email} type="email" name="email" id="email" {...$constraints.email} />
		{#if $errors.email}
			<span class="text-red-400">{$errors.email}</span>
		{/if}
	</div>
	<div class="flex flex-col gap-1">
		<label for="tel">Phone no.</label>
		<input bind:value={$form.tel} type="tel" name="tel" id="tel" {...$constraints.tel} />
		{#if $errors.tel}
			<small>{$errors.tel}</small>
		{/if}
	</div>
	<div class="flex flex-col gap-1">
		<label for="fromApp">Migrating From</label>
		<select name="fromApp" id="fromApp">
			{#each accountingSoftware as app}
				<option value={app}>{deslugify(app)}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-1">
		<label for="toApp">Migrating From</label>
		<select name="toApp" id="toApp" bind:value={$form.toApp}>
			{#each supportedSoftware as app}
				<option value={app}>{deslugify(app)}</option>
			{/each}
		</select>
	</div>
	{#if $errors.toApp}
		{$errors.toApp}
	{/if}
	<button type="submit" class="rounded-md bg-blue-600 p-4 text-lg text-white">Submit</button>
</form>

<SuperDebug data={$form} />

<style>
	input,
	select {
		padding: 10px;
		border-radius: 10px;
		border: 2px solid gray;
		transition: border-color 0.3s ease; /* Smooth transition */
	}

	input:focus,
	select:focus {
		border: 2px solid blue; /* Change to desired border color */
		outline: none; /* Remove default outline */
	}

	input:focus-within,
	select:focus-within {
		border: 2px solid blue; /* Style when element contains focus */
	}
</style>
