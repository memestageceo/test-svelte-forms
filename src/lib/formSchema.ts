import { accountingSoftware, supportedSoftware } from '$lib/accountingApps';
import { z } from 'zod';

export const migrationFormSchema = z
	.object({
		name: z.string().default('Kimi no na wa'),
		email: z.string().email().min(5).max(50),
		tel: z.string().optional(),
		fromApp: z.enum(accountingSoftware),
		toApp: z.enum(supportedSoftware).default('myob'),
		agree: z
			.boolean()
			.default(false)
			.refine((data) => {
				console.log('date -> ', data);
				return data === true;
			})
	})
	.refine(
		(data) => {
			const { fromApp, toApp } = data;
			return fromApp !== toApp;
		},
		{
			message: 'Both apps cannot be the same asswhole',
			path: ['toApp']
		}
	);

export type MigrationFormSchemaType = typeof migrationFormSchema;

/* 
.boolean()
.default(false)
.refine((val) => val === true, {
	message: 'Must agree to terms and conditions. Your life belongs to me.'
})
*/
