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
	import { fly } from 'svelte/transition';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { tick } from 'svelte';

	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { CaretDown } from 'svelte-radix';

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

	let fromApp = $derived(
		$formData.fromApp
			? {
					label: deslugify($formData.fromApp),
					value: $formData.fromApp
				}
			: undefined
	);

	let toApp = $derived(
		$formData.toApp
			? {
					label: deslugify($formData.toApp),
					value: $formData.toApp
				}
			: undefined
	);

	let isOpenFromApp = $state(false);
	let isOpenToApp = $state(false);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		isOpenFromApp = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

{#if $message}
	<p
		class="absolute top-5 rounded-md bg-green-600 p-2 font-semibold text-white shadow-md"
		transition:fly={{ y: '-100%' }}
	>
		{$message}
	</p>
{/if}
<h1 class="text-semibold my-2 text-center text-3xl">Shadcn Svelte Form</h1>

<form action="" class="my-10 flex flex-col gap-2" method="post" use:enhance>
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
		<Popover.Root let:ids>
			<Form.Control let:attrs>
				<Popover.Trigger
					class={cn(buttonVariants({ variant: 'outline' }), 'w-[200px] justify-between')}
					role="combobox"
					{...attrs}
				>
					Current Solution:
					<CaretDown size={12} />
				</Popover.Trigger>
				<input hidden value={$formData.fromApp} name={attrs.name} />
				<Popover.Content>
					<Command.Root>
						<Command.Input placeholder="Filter apps" autofocus />
						<Command.List>
							<Command.Group>
								{#each accountingSoftware as app}
									<Command.Item
										value={app}
										onSelect={() => {
											$formData.fromApp = app;
											closeAndFocusTrigger(ids.trigger);
										}}
									>
										{deslugify(app)}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Form.Control>
		</Popover.Root>
		<Form.Description>Current Accounting Solution that you are using.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="toApp">
		<Form.Control let:attrs>
			<Form.Label>Destination Accounting Solution:</Form.Label>
			<Select.Root
				selected={toApp}
				onSelectedChange={(v) => {
					v && ($formData.toApp = v.value);
				}}
			>
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

	<Form.Field
		{form}
		name="agree"
		class="flex flex-row flex-nowrap items-center space-x-3 rounded-md border-2 border-slate-500 p-2"
	>
		<Form.Control let:attrs>
			<Checkbox {...attrs} bind:checked={$formData.agree as boolean} />
			<input name={attrs.name} value={$formData.agree} hidden />
			<Form.Label>Agree to terms and conditions</Form.Label>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
<SuperDebug data={$formData} />

<!-- 

Configuring with BITS UI.



<Checkbox.Root
				bind:checked={$formData.agree}
				{...attrs}
				class="active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out data-[state=unchecked]:bg-background"
			>
				<Checkbox.Indicator
					let:isChecked
					{...attrs}
					class="inline-flex items-center justify-center text-background"
				>
					{#if isChecked}
						<Check />
					{/if}
				</Checkbox.Indicator>
				<Checkbox.Input />
			</Checkbox.Root>
-->
