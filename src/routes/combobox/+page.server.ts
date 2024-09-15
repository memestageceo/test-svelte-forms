import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './+page.svelte';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'thanks for filling in the form');
	}
};
