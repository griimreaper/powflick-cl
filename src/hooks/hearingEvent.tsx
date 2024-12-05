import { useState } from "react";

type HearingEvent = {
    actualize: boolean;
    setActualize: () => void;
}

export default function useHearingEvent(): HearingEvent {
    const [actualize, setActualizeState] = useState<boolean>(false);

    const setActualize = () => {
        setActualizeState(prevState => !prevState);
    };

    return { actualize, setActualize };
};
