import type { PageServerLoad } from './$types';
import { migrationFormSchema } from '$lib/formSchema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(migrationFormSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(migrationFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Thanks for filling in the form.');
	}
};
