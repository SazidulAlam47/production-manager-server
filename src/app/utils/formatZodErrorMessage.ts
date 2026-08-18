import { ZodError } from 'zod';
import capitalize from './capitalize';

const formatZodErrorMessage = (err: ZodError) => {
    const errorMessages = err.issues.map((issue) => {
        const fieldName = capitalize(
            String(issue.path[issue.path.length - 1] || ''),
        );

        const message =
            issue.message.charAt(0).toLowerCase() + issue.message.slice(1);
        return `${fieldName ? fieldName + ': ' : ''} ${message}.`;
    });

    const errorMessage = errorMessages.join('\n');

    return errorMessage;
};

export default formatZodErrorMessage;
