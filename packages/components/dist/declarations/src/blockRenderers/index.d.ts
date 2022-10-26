/// <reference types="react" />
export declare const BlockRenderers: (imageOveride?: (props: any) => JSX.Element, peopleOveride?: (peopleProps: any) => JSX.Element) => {
    image: (props: any) => JSX.Element;
    video: (props: any) => JSX.Element;
    button: (props: any) => JSX.Element;
    associatedPeople: (props: any) => JSX.Element;
};
