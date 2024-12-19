import { useState } from "react";

type Flag = [
    isRendering: boolean,
    setIsRendering: (value: boolean) => void,
]

export default function useFlag(initialValue: boolean = false): Flag {
    const [isRendering, setIsRenderingState] = useState<boolean>(initialValue);

    const setIsRendering = (value: boolean) => {
        setIsRenderingState(value);
    };

    return [isRendering, setIsRendering];
};