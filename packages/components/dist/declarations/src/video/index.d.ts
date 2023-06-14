/// <reference types="react" />
interface VideoProps {
    thumbUrl: string;
    videoUrl: string;
    videoLabel: string;
    isSlide?: boolean;
}
export declare const Video: ({ thumbUrl, videoUrl, videoLabel, isSlide, }: VideoProps) => JSX.Element;
export {};
