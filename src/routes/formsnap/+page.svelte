<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { migrationFormSchema } from '$lib/formSchema';
	import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
	import { accountingSoftware, supportedSoftware } from '$lib/accountingApps';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(migrationFormSchema)
	});

	const { form: formData, enhance, message } = form;

	function deslugify(str: string) {
		return str
			.split('-')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');
	}
</script>

{#if $message}
	{$message}
{/if}

<form method="post" action="" use:enhance class="mb-3 flex flex-col gap-2">
	<Field {form} name="name">
		<Control let:attrs>
			<Label>Name</Label>
			<input {...attrs} type="text" bind:value={$formData.name} />
		</Control>
		<Description>Name of the user</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="email">
		<Control let:attrs>
			<Label>Email</Label>
			<input {...attrs} type="email" bind:value={$formData.email} />
		</Control>
		<Description>Email of the user</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="tel">
		<Control let:attrs>
			<Label>Phone no:</Label>
			<input {...attrs} type="tel" bind:value={$formData.tel} />
		</Control>
		<Description>Phone number of the user</Description>
		<FieldErrors />
	</Field>

	<!-- 💧💧💧💧💧 -->
	<Field {form} name="fromApp">
		<Control let:attrs>
			<Label>Migrating From</Label>
			<select {...attrs} bind:value={$formData.fromApp}>
				{#each accountingSoftware as app}
					<option value={app}>{deslugify(app)}</option>
				{/each}
			</select>
		</Control>
		<Description>Current accounting solution of the user.</Description>
		<FieldErrors />
	</Field>

	<Field {form} name="toApp">
		<Control let:attrs>
			<Label>Migrating To:</Label>
			<select {...attrs} bind:value={$formData.toApp}>
				{#each supportedSoftware as app}
					<option value={app}>{deslugify(app)}</option>
				{/each}
			</select>
		</Control>
		<Description>App user wants to switch to.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="agree">
		<Control let:attrs>
			<div class="flex flex-row flex-nowrap items-center gap-3">
				<input type="checkbox" {...attrs} bind:checked={$formData.agree} />
				<Label
					>Agree to
					<span class="text-slate-600"> Terms & Conditions </span>
				</Label>
			</div>
		</Control>
		<Description>User must agree of bugger off.</Description>
		<FieldErrors />
	</Field>

	<button
		type="submit"
		class=" rounded-md bg-blue-600 px-3 py-4 text-lg font-semibold text-white disabled:bg-slate-600"
	>
		Submit
	</button>
</form>

<SuperDebug data={$formData} />

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
