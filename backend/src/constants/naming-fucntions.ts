import { ValidationError } from '@nestjs/common';

export const extractErrorMessages = (
  error: ValidationError,
  parent?: ValidationError,
) => {
  let messages = [];
  if (error.constraints) {
    messages = Object.values(error.constraints).map((err) =>
      toCapitalizeFirst(
        err
          .replace(
            new RegExp(error.property, 'g'),
            toTitleCase(error.property) +
              (parent ? ` (in ${toTitleCase(parent.property)})` : ''),
          )
          .replace(/No /g, 'Number ')
          .replace(/a string/g, 'text')
          .replace(/should not be empty/g, 'is required')
          .replace(
            /.*must be a mongodb id/g,
            `Select a valid ${toTitleCase(error.property.replace(/id/i, ''))}`,
          ),
      ),
    );
  }
  if (error.children) {
    error.children.forEach((childError) => {
      messages = [...messages, ...extractErrorMessages(childError, error)];
    });
  }
  return messages;
};

function toTitleCase(input: string): string {
  const result = input?.replace(/([A-Z])/g, ' $1');
  return result?.charAt(0)?.toUpperCase() + result?.slice(1);
}
function toCapitalizeFirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
