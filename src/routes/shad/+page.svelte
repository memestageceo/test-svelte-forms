<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import SuperDebug from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { migrationFormSchema } from '$lib/formSchema';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { accountingSoftware, supportedSoftware } from '$lib/accountingApps';

	let { data }: { data: PageData } = $props();
	const form = superForm(data.form, {
		validators: zodClient(migrationFormSchema)
	});

	const { form: formData, enhance } = form;

	function deslugify(str: string) {
		return str
			.split('-')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');
	}

	let fromApp = $derived(
		$formData.email
			? {
					label: $formData.email,
					value: $formData.email
				}
			: undefined
	);
</script>

<h1 class="text-semibold my-2 text-center text-3xl">Shadcn Svelte Form {fromApp}</h1>

<form action="" class="my-10 flex flex-col gap-2" method="post">
	<!-- Name of the User 👤👤👤 -->
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>Name of the User.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<!-- Email of the user 📧📧📧 -->
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>Email ID of the user</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Phone no of the user ☎️☎️☎️ -->
	<Form.Field {form} name="tel">
		<Form.Control let:attrs>
			<Form.Label>Phone no.</Form.Label>
			<Input {...attrs} bind:value={$formData.tel} />
		</Form.Control>
	</Form.Field>

	<!-- Migrating from  (🍎) 🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️ -->
	<Form.Field {form} name="fromApp">
		<Form.Control let:attrs>
			<Form.Label>Current Accounting Solution:</Form.Label>
			<Select.Root
				selected={fromApp}
				onSelectedChange={(v) => {
					v && ($formData.fromApp = v.value);
				}}
			>
				<Select.Trigger class="w-[180px]" {...attrs}>
					<Select.Value placeholder="Migrating From" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Migrating From</Select.Label>
						{#each accountingSoftware as app}
							<Select.Item value={app} label={app}>{deslugify(app)}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="fromApp" />
			</Select.Root>
		</Form.Control>
		<Form.Description>Current Accounting Solution that you are using.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="toApp">
		<Form.Control let:attrs>
			<Form.Label>Destination Accounting Solution:</Form.Label>

			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Migrating To" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Migrating To</Select.Label>
						{#each supportedSoftware as app}
							<Select.Item value={app} label={deslugify(app)}>{deslugify(app)}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="toApp" />
			</Select.Root>
		</Form.Control>
		<Form.Description>The accounting solution you want to switch to.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
</form>
<SuperDebug data={$formData} />
