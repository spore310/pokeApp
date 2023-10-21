export const upperCaseString = (str: string | null | undefined) =>
  str ? str[0].toUpperCase() + str.slice(1) : undefined;
