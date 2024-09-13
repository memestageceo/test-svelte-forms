import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { formSchema } from '$lib/schema';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		await sleep(3000);
		const formData = await request.formData();
		const parsedData = {
			name: String(formData.get('name')),
			email: String(formData.get('email')),
			tel: String(formData.get('tel')),
			'from-app': String(formData.get('from-app')),
			'to-app': String(formData.get('to-app')),
			agree: formData.get('agree')
		};
		const result = formSchema.safeParse(parsedData);
		if (!result.success) {
			const error = result.error.flatten();
			return {
				success: result.success,
				error,
				data: Object.fromEntries(formData)
			};
		}

		return {
			success: result.success,
			data: result.data
		};
	}
};

async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/* function parseError(issue: ZodIssue) {
	return {
		message: issue.message
	};
}
 */
