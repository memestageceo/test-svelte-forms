import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { migrationFormSchema } from '$lib/formSchema';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(migrationFormSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(migrationFormSchema));

		console.log('🚀 ~ default: ~ form:', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(
			form,
			"Thanks for submitting the form. We've your data now. And we'll use it for nafarious purposes."
		);
	}
};
