<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let loading = $state(false);
	let consent = $state(false);

	const submitFunction: SubmitFunction = async () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<div class="mx-auto mt-24 w-full max-w-md">
	<form
		action="/"
		class="mx-auto rounded bg-white px-8 pb-8 pt-6 shadow-md"
		method="post"
		use:enhance={submitFunction}
	>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="name"> Name </label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				type="text"
				name="name"
				id="name"
				value={form?.data?.name ?? ''}
			/>
			{#if form?.error?.fieldErrors?.name}
				<p class="mt-1 text-xs text-red-500">{form.error.fieldErrors.name[0]}</p>
			{/if}
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="email"> Email </label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				type="email"
				name="email"
				id="email"
				value={form?.data?.email ?? ''}
			/>
			{#if form?.error?.fieldErrors?.email}
				<p class="mt-1 text-xs text-red-500">{form.error.fieldErrors.email[0]}</p>
			{/if}
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="tel"> Tel </label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				type="tel"
				name="tel"
				id="tel"
				value={form?.data?.tel ?? ''}
			/>
			{#if form?.error?.fieldErrors?.tel}
				<p class="mt-1 text-xs text-red-500">{form.error.fieldErrors.tel[0]}</p>
			{/if}
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="from-app"> From App </label>
			<select
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-blue-400"
				name="from-app"
				id="from-app"
				value={form?.data?.['from-app'] ?? ''}
			>
				<option value="">Select an option</option>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
			</select>
			{#if form?.error?.fieldErrors['from-app']}
				<p class="mt-1 text-xs text-red-500">{form.error.fieldErrors['from-app'][0]}</p>
			{/if}
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="to-app"> To App </label>
			<select
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-blue-500"
				name="to-app"
				id="to-app"
				value={form?.data?.['to-app'] ?? ''}
			>
				<option value="">Select an option</option>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
			</select>
			{#if form?.error?.fieldErrors['to-app']}
				<p class="mt-1 text-xs text-red-500">{form.error.fieldErrors['to-app'][0]}</p>
			{/if}
		</div>
		<div class="mb-4">
			<label class="flex items-center">
				<input type="checkbox" name="agree" id="agree" class="mr-2 size-4" bind:checked={consent} />
				<span class="text-sm">Agree to terms and conditions.</span>
			</label>
			{#if form?.error?.fieldErrors?.agree}
				<p class="mt-1 text-xs text-red-500">{form.error.fieldErrors.agree[0]}</p>
			{/if}
		</div>
		<div class="flex items-center justify-between">
			<button
				class="rounded-md bg-blue-500 px-4 py-2 font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none disabled:bg-slate-300 disabled:text-black"
				type="submit"
				disabled={!consent}
				aria-busy={loading}
			>
				{#if loading}
					<span class="animate-spin"> 🤔 </span>
				{:else}
					Submit
				{/if}
			</button>
		</div>
	</form>
</div>

{#if form && form.success}
	<ul class="mx-auto mt-10 max-w-md">
		{#each Object.entries(form.data) as [key, value]}
			<li>{key}: {value}</li>
		{/each}
	</ul>
{/if}
