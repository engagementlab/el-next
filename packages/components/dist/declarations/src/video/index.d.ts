/// <reference types="react" />
interface VideoProps {
    videoUrl: string;
    videoLabel: string;
    thumbUrl?: string;
    isSlide?: boolean;
    themeColor?: {
        fill: string;
        stroke: string;
    };
    noUi?: boolean;
    play?: boolean;
}
export declare const Video: ({ thumbUrl, videoUrl, videoLabel, isSlide, themeColor, noUi, play, }: VideoProps) => JSX.Element;
export {};
