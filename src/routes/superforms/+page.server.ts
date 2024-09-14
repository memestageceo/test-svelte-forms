import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { migrationFormSchema } from '$lib/formSchema';

export const load: PageServerLoad = async () => {
	// api(adapter(schema))
	const form = await superValidate(zod(migrationFormSchema));

	return {
		name: 'Aditya',
		form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(migrationFormSchema));

		if (!form.valid) {
			fail(400, { form });
		}

		return message(form, 'Thanks for submitting the form.');
	}
};
