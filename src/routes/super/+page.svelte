<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types.js';

	import SuperDebug from 'sveltekit-superforms';
	import { formSchemaSnap } from '$lib/schema.js';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchemaSnap)
	});
	const { form: formData, enhance } = form;
</script>

<form
	action="/super"
	class="mx-auto rounded bg-white px-8 pb-8 pt-6 shadow-md"
	method="post"
	use:enhance
>
	<Field {form} name="name">
		<Control let:attrs>
			<Label>name</Label>
			<input {...attrs} type="text" bind:value={$formData.name} />
		</Control>
		<Description>Use your company email if you have one.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="email">
		<Control let:attrs>
			<Label>Email</Label>
			<input {...attrs} type="text" bind:value={$formData.email} />
		</Control>
		<Description>Use your company email if you have one.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="tel">
		<Control let:attrs>
			<Label>tel</Label>
			<input {...attrs} type="tel" bind:value={$formData.tel} />
		</Control>
		<Description>Use your company email if you have one.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="from-app">
		<Control let:attrs>
			<Label>from-app</Label>
			<select {...attrs} bind:value={$formData['from-app']}>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
			</select>
		</Control>
		<Description>Help us address you properly.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="to-app">
		<Control let:attrs>
			<Label>to-app</Label>
			<select {...attrs} bind:value={$formData['to-app']}>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
			</select>
		</Control>
		<Description>Help us address you properly.</Description>
		<FieldErrors />
	</Field>

	<Field {form} name="agree">
		<Control let:attrs>
			<Label>Email</Label>
			<input {...attrs} type="checkbox" bind:checked={$formData.agree} />
		</Control>
		<Description>Use your company email if you have one.</Description>
		<FieldErrors />
	</Field>
	<button type="submit">Submit</button>
</form>

<SuperDebug data={$formData} />
