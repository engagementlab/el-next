/// <reference types="react" />
interface VideoProps {
    videoUrl: string;
    videoLabel: string;
    thumbUrl?: string;
    isSlide?: boolean;
    themeColor?: string;
    noUi?: boolean;
    play?: boolean;
}
export declare const Video: ({ thumbUrl, videoUrl, videoLabel, isSlide, themeColor, noUi, play, }: VideoProps) => JSX.Element;
export {};
