import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { migrationFormSchema } from '$lib/formSchema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(migrationFormSchema));

	return { form };
};
