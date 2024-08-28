interface ExternalLinkProps {
    href: string;
    label: string;
    /**
     * Optional tailwindcss class override
     */
    customClass?: string;
}
/**
 * Return a link with "external" SVG icon
 * @returns {JSX.Element} Element
 */
export declare const ExternalLink: ({ href, label, customClass, }: ExternalLinkProps) => any;
export {};
