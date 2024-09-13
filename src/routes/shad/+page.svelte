<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchemaSnap, type FormSchemaSnapType } from '$lib/schema';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import * as Select from '$lib/components/ui/select';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { Selected } from 'bits-ui';

	let fromApp = $state<Selected<FormSchemaSnapType['from-app']>>();
	let toApp = $state<Selected<FormSchemaSnapType['to-app']>>();

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		// validators: zodClient(formSchemaSnap),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<!-- TODO: FIX ERROR on MIGRATING TO SELECT FIELD. -->
<form method="POST" use:enhance action="/shad">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>email</Form.Label>
			<Input type="email" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="tel">
		<Form.Control let:attrs>
			<Form.Label>tel</Form.Label>
			<Input type="tel" {...attrs} bind:value={$formData.tel} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="from-app">
		<Form.Control let:attrs>
			<Form.Label>Migrating From</Form.Label>
			<Select.Root
				selected={fromApp}
				onSelectedChange={(v) => {
					v && ($formData['from-app'] = v.value);
				}}
			>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Theme" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="option1">option1</Select.Item>
					<Select.Item value="option2">option2</Select.Item>
					<Select.Item value="option3">option3</Select.Item>
				</Select.Content>
			</Select.Root>
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="to-app">
		<Form.Control let:attrs>
			<Form.Label>Migrating To</Form.Label>
			<Select.Root
				selected={toApp}
				onSelectedChange={(v) => {
					v && ($formData['to-app'] = v.value);
				}}
			>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Theme" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="option1">option1</Select.Item>
					<Select.Item value="option2">option2</Select.Item>
					<Select.Item value="option3">option3</Select.Item>
				</Select.Content>
			</Select.Root>
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="agree">
		<Form.Control let:attrs>
			<div class="items-top flex space-x-2">
				<Checkbox id="agree" />
				<Form.Label
					for="agree"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Accept terms and conditions
				</Form.Label>
			</div>
		</Form.Control>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>

<Toaster />
