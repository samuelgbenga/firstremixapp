/**
 * Concatenate classNames together
 */
export function classes(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}