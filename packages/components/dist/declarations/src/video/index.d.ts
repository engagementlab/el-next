/// <reference types="react" />
interface VideoProps {
    thumbUrl: string;
    videoUrl: string;
    videoLabel: string;
    isSlide?: boolean;
    themeColor?: string;
}
export declare const Video: ({ thumbUrl, videoUrl, videoLabel, isSlide, themeColor, }: VideoProps) => JSX.Element;
export {};
