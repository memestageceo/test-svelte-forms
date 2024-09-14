import { z } from 'zod';

export const formSchema = z.object({
	name: z.string(),
	email: z.string().email().min(10).max(50),
	tel: z.string().min(10).max(25),
	'from-app': z.enum(['option1', 'option2', 'option3']), // Assuming there are multiple options
	'to-app': z.enum(['option1', 'option2', 'option3']), // Assuming there are multiple options
	agree: z.enum(['on'])
});

export type ContactFormData = z.infer<typeof formSchema>;
export type ContactFormError = z.inferFlattenedErrors<typeof formSchema>;

export const formSchemaSnap = z.object({
	name: z.string().min(5),
	email: z.string().email().min(10).max(50),
	tel: z.string().min(10).max(25),
	'from-app': z.enum(['option1', 'option2', 'option3']), // Assuming there are multiple options
	'to-app': z.enum(['option1', 'option2', 'option3']), // Assuming there are multiple options
	agree: z.boolean().default(false)
});
/* 	.refine(
		(data) => {
			const fromApp = data['from-app'];
			const toApp = data['to-app'];
			console.log(fromApp, toApp);
			return fromApp !== toApp;
		},
		{
			message: 'Both apps need to be different.',
			path: ['to-app']
		}
	); */

export type FormSchemaSnapType = z.infer<typeof formSchemaSnap>;
