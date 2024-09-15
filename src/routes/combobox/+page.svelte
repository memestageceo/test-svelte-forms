<script module>
	import { accountingSoftware, supportedSoftware } from '$lib/accountingApps';
	import { z } from 'zod';
	import type { PageData } from './$types';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export const formSchema = z
		.object({
			fromApp: z.enum(accountingSoftware),
			toApp: z.enum(supportedSoftware)
		})
		.refine((data) => data.fromApp !== data.toApp, {
			message: "are you kiddin' me?",
			path: ['toApp']
		});
</script>

<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index';
	import * as Form from '$lib/components/ui/form';
	import { cn, deslugify } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { tick } from 'svelte';
	import { Combobox } from 'bits-ui';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, message } = form;

	let isFromOpen = $state(false);
	let isToOpen = $state(false);

	function closeAndFocusTrigger(triggerId: string) {
		tick().then(() => {
			document.getElementById(triggerId)?.focus;
		});
	}
	let inputValue = $state('');
	let touchedInput = $state(false);

	let filteredApps = $derived(
		inputValue && touchedInput
			? accountingSoftware.filter((app) => accountingSoftware.includes())
			: accountingSoftware
	);
</script>

<form
	action=""
	method="post"
	use:enhance
	class="grid max-h-[500px] max-w-lg place-content-center place-items-center"
>
	<Form.Field {form} name="fromApp" class="flex flex-col">
		<Popover.Root let:ids bind:open={isFromOpen}>
			<Form.Control let:attrs>
				<Form.Label>Current App</Form.Label>
				<Popover.Trigger
					class={cn(buttonVariants({ variant: 'outline' }))}
					role="combobox"
					{...attrs}
				>
					{@const selectedApp = accountingSoftware.find((app) => app === $formData.fromApp)}
					{selectedApp ? deslugify(selectedApp) : 'Select app'}
				</Popover.Trigger>
				<input {...attrs} name={attrs.name} value={$formData.fromApp} hidden />
				<Popover.Content>
					<Combobox.Root items={filteredApps} bind:inputValue bind:touchedInput>
						<Combobox.Input placeholder="Input name of your app." />
						<Combobox.Label />

						<Combobox.Content>
							{#each filteredApps as app}
								<Combobox.Item value={app} label={app}>
									{app}
									<Combobox.ItemIndicator />
								</Combobox.Item>
							{/each}
							<Combobox.Separator />
						</Combobox.Content>
						<Combobox.Arrow />
						<Combobox.HiddenInput />
					</Combobox.Root>
				</Popover.Content>
			</Form.Control>
		</Popover.Root>
	</Form.Field>

	<!-- <Form.Field {form} name="toApp" class="flex flex-col">
		<Popover.Root let:ids bind:open={isToOpen}>
			<Form.Control let:attrs>
				<Form.Label>Switch To App {ids.trigger}</Form.Label>
				<Popover.Trigger
					class={cn(buttonVariants({ variant: 'outline' }))}
					role="combobox"
					{...attrs}
				>
					{@const selectedApp = supportedSoftware.find((app) => app === $formData.toApp)}
					{selectedApp ? deslugify(selectedApp) : 'Select app'}
				</Popover.Trigger>
				<input {...attrs} name={attrs.name} value={$formData.toApp} hidden />
				<Popover.Content>
					<Combobox.Dialog>
						<Combobox.Input placeholder="Select destination app." autofocus />
						<Combobox.Empty>No match found.</Combobox.Empty>
						{#each supportedSoftware as app}
							<Combobox.Item
								value={app}
								onSelect={() => {
									$formData.toApp = app;
									isToOpen = false;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								{deslugify(app)}
							</Combobox.Item>
						{/each}
					</Combobox.Dialog>
				</Popover.Content>
			</Form.Control>
		</Popover.Root>
		<Form.FieldErrors />
	</Form.Field> -->
	<Form.Button>Submit</Form.Button>
</form>

<div class="absolute bottom-0 left-0 size-80 overflow-scroll p-5">
	<SuperDebug data={$formData} />
	{#if $message}
		{$message}
	{/if}
</div>
