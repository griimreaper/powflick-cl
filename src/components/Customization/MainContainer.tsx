import React, { useRef } from 'react'
import { Logo, Number, Text } from 'models/types';
import useFlag from 'hooks/useFlag';
import ManipulableContainer from './ManipulableContainer';

interface MainContainerProps {
    selection: {
        type:  'Text' | 'Number' | 'Logo' | '';
        index: number;
    }
    setSelection: Function;
    image: string;
    logos: Logo[] & any;
    setLogos: Function;
    texts: Text[] & any;
    setTexts: Function;
    handleTextChange: Function;
    numbers: Number[] & any;
    setNumbers: Function;
    handleNumberChange: Function;
    saveDataToLocal: () => void;
    setActualize: () => void;
}

function MainContainer({
    selection,
    setSelection,
    image,
    logos,
    setLogos,
    texts,
    setTexts,
    handleTextChange,
    numbers,
    setNumbers,
    handleNumberChange,
    saveDataToLocal,
    setActualize
}: MainContainerProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const [isDraggingLogo, setIsDraggingLogo] = useFlag();
    const [isDraggingText, setIsDraggingText] = useFlag();
    const [isDraggingNumber, setIsDraggingNumber] = useFlag();

    const handleDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const panelRect = panelRef.current?.getBoundingClientRect();
        const { clientX, clientY } = event;
        if (panelRect) {
            if (isDraggingLogo) {
                const offsetX =
                    clientX -
                    panelRect.left -
                    logos[selection.index].logoDragOffset.x;
                const offsetY =
                    clientY - panelRect.top - logos[selection.index].logoDragOffset.y;
                const maxX = panelRect.width;
                const maxY = panelRect.height;
                const constrainedX = Math.max(0, Math.min(maxX, offsetX));
                const constrainedY = Math.max(0, Math.min(maxY, offsetY));
                setLogos(
                    logos.map((l: Logo, i: number) =>
                        i === selection.index
                            ? { ...l, logoPosition: { x: constrainedX, y: constrainedY } }
                            : l
                    )
                );
            } else if (isDraggingText) {
                const offsetX =
                    clientX -
                    panelRect.left -
                    texts[selection.index].textDragOffset.x;
                const offsetY =
                    clientY - panelRect.top - texts[selection.index].textDragOffset.y;
                const maxX = panelRect.width;
                const maxY = panelRect.height;
                const constrainedX = Math.max(
                    0,
                    Math.min(
                        maxX -
                        (texts[selection.index].textSize *
                            texts[selection.index].text.length) /
                        2,
                        offsetX
                    )
                );
                const constrainedY = Math.max(0, Math.min(maxY, offsetY));
                setTexts(
                    texts.map((t: Text, i: number) =>
                        i === selection.index
                            ? { ...t, textPosition: { x: constrainedX, y: constrainedY } }
                            : t
                    )
                );
            } else if (isDraggingNumber) {
                const offsetX =
                    clientX -
                    panelRect.left -
                    numbers[selection.index].numberDragOffset.x;
                const offsetY =
                    clientY -
                    panelRect.top -
                    numbers[selection.index].numberDragOffset.y;
                const maxX = panelRect.width;
                const maxY = panelRect.height;
                const constrainedX = Math.max(0, Math.min(maxX, offsetX));
                const constrainedY = Math.max(0, Math.min(maxY, offsetY));
                setNumbers(
                    numbers.map((n: Number, i: number) =>
                        i === selection.index
                            ? { ...n, numberPosition: { x: constrainedX, y: constrainedY } }
                            : n
                    )
                );
            }
        }
        setActualize();
    };

    const handleLogoDragStart = (
        event: React.MouseEvent<HTMLDivElement>,
        index: number
    ) => {
        setIsDraggingLogo(true);
        const panelRect = panelRef.current?.getBoundingClientRect();
        if (panelRect) {
            setSelection({ type: 'Logo', index });
            const { left, top } = panelRect;
            const offsetX = event.clientX - left - logos[index].logoPosition.x;
            const offsetY = event.clientY - top - logos[index].logoPosition.y;
            setLogos(
                logos.map((l: Logo, i: number) =>
                    i === index
                        ? {
                            ...l,
                            logoDragOffset: { x: offsetX, y: offsetY },
                            logoPosition: {
                                x: logos[index].logoPosition.x,
                                y: logos[index].logoPosition.y,
                            },
                        }
                        : l
                )
            );
            setActualize();
        }
    };

    const handleLogoTouchStart = (
        event: React.TouchEvent<HTMLImageElement>,
        index: number
    ) => {
        setIsDraggingLogo(true);
        const panelRect = panelRef.current?.getBoundingClientRect();
        if (panelRect) {
            setSelection({ type: 'Logo', index });
            const { left, top } = panelRect;
            const touch = event.touches[0]; // Obtener el primer toque
            const offsetX = touch.clientX - left - logos[index].logoPosition.x;
            const offsetY = touch.clientY - top - logos[index].logoPosition.y;
            setLogos(
                logos.map((l: Logo, i: number) =>
                    i === index
                        ? {
                            ...l,
                            logoDragOffset: { x: offsetX, y: offsetY },
                            logoPosition: {
                                x: logos[index].logoPosition.x,
                                y: logos[index].logoPosition.y,
                            },
                        }
                        : l
                )
            );
            setActualize();
        }
    };

    const handleTextDragStart = (
        event: React.MouseEvent<HTMLDivElement>,
        index: number
    ) => {
        setIsDraggingText(true);
        const panelRect = panelRef.current?.getBoundingClientRect();
        if (panelRect) {
            setSelection({ type: 'Text', index });
            const { left, top } = panelRect;
            const offsetX = event.clientX - left - texts[index].textPosition.x;
            const offsetY = event.clientY - top - texts[index].textPosition.y;
            setTexts(
                texts.map((t: Text, i: number) =>
                    i === index
                        ? {
                            ...t,
                            textDragOffset: { x: offsetX, y: offsetY },
                            textPosition: {
                                x: texts[index].textPosition.x,
                                y: texts[index].textPosition.y,
                            },
                        }
                        : t
                )
            );
            setActualize();
        }
    };

    const handleTextTouchStart = (
        event: React.TouchEvent<HTMLDivElement>,
        index: number
    ) => {
        setIsDraggingText(true);
        const panelRect = panelRef.current?.getBoundingClientRect();
        if (panelRect) {
            setSelection({ type: 'Text', index });
            const { left, top } = panelRect;
            const touch = event.touches[0]; // Obtener el primer toque
            const offsetX = touch.clientX - left - texts[index].textPosition.x;
            const offsetY = touch.clientY - top - texts[index].textPosition.y;
            setTexts(
                texts.map((t: Text, i: number) =>
                    i === index
                        ? {
                            ...t,
                            textDragOffset: { x: offsetX, y: offsetY },
                            textPosition: {
                                x: texts[index].textPosition.x,
                                y: texts[index].textPosition.y,
                            },
                        }
                        : t
                )
            );
            setActualize();
        }
    };

    const handleNumberDragStart = (
        event: React.MouseEvent<HTMLDivElement>,
        index: number
    ) => {
        setIsDraggingNumber(true);
        const panelRect = panelRef.current?.getBoundingClientRect();
        if (panelRect) {
            setSelection({ type: 'Number', index });
            const { left, top } = panelRect;
            const offsetX = event.clientX - left - numbers[index].numberPosition.x;
            const offsetY = event.clientY - top - numbers[index].numberPosition.y;
            setNumbers(
                numbers.map((n: Number, i: number) =>
                    i === index
                        ? {
                            ...n,
                            numberDragOffset: { x: offsetX, y: offsetY },
                            numberPosition: {
                                x: numbers[index].numberPosition.x,
                                y: numbers[index].numberPosition.y,
                            },
                        }
                        : n
                )
            );
            setActualize();
        }
    };

    const handleNumberTouchStart = (
        event: React.TouchEvent<HTMLDivElement>,
        index: number
    ) => {
        setIsDraggingNumber(true);
        const panelRect = panelRef.current?.getBoundingClientRect();
        if (panelRect) {
            setSelection({ type: 'Number', index });
            const { left, top } = panelRect;
            const touch = event.touches[0]; // Obtener el primer toque
            const offsetX = touch.clientX - left - numbers[index].numberPosition.x;
            const offsetY = touch.clientY - top - numbers[index].numberPosition.y;
            setNumbers(
                numbers.map((n: Number, i: number) =>
                    i === index
                        ? {
                            ...n,
                            numberDragOffset: { x: offsetX, y: offsetY },
                            numberPosition: {
                                x: numbers[index].numberPosition.x,
                                y: numbers[index].numberPosition.y,
                            },
                        }
                        : n
                )
            );
            setActualize();
        }
    };

    const handleDragMoveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
        const panelRect = panelRef.current?.getBoundingClientRect();
        const touch = event.touches[0];
        const { clientX, clientY } = touch;
        if (panelRect) {
            if (isDraggingLogo) {
                const offsetX =
                    clientX -
                    panelRect.left -
                    logos[selection.index].logoDragOffset.x;
                const offsetY =
                    clientY - panelRect.top - logos[selection.index].logoDragOffset.y;
                const maxX = panelRect.width;
                const maxY = panelRect.height;
                const constrainedX = Math.max(0, Math.min(maxX, offsetX));
                const constrainedY = Math.max(0, Math.min(maxY, offsetY));
                setLogos(
                    logos.map((l: Logo, i: number) =>
                        i === selection.index
                            ? { ...l, logoPosition: { x: constrainedX, y: constrainedY } }
                            : l
                    )
                );
            } else if (isDraggingText) {
                const offsetX =
                    clientX -
                    panelRect.left -
                    texts[selection.index].textDragOffset.x;
                const offsetY =
                    clientY - panelRect.top - texts[selection.index].textDragOffset.y;
                const maxX = panelRect.width;
                const maxY = panelRect.height;
                const constrainedX = Math.max(
                    0,
                    Math.min(
                        maxX -
                        (texts[selection.index].textSize *
                            texts[selection.index].text.length) /
                        2,
                        offsetX
                    )
                );
                const constrainedY = Math.max(0, Math.min(maxY, offsetY));
                setTexts(
                    texts.map((t: Text, i: number) =>
                        i === selection.index
                            ? { ...t, textPosition: { x: constrainedX, y: constrainedY } }
                            : t
                    )
                );
            } else if (isDraggingNumber) {
                const offsetX =
                    clientX -
                    panelRect.left -
                    numbers[selection.index].numberDragOffset.x;
                const offsetY =
                    clientY -
                    panelRect.top -
                    numbers[selection.index].numberDragOffset.y;
                const maxX = panelRect.width;
                const maxY = panelRect.height;
                const constrainedX = Math.max(0, Math.min(maxX, offsetX));
                const constrainedY = Math.max(0, Math.min(maxY, offsetY));
                setNumbers(
                    numbers.map((n: Number, i: number) =>
                        i === selection.index
                            ? { ...n, numberPosition: { x: constrainedX, y: constrainedY } }
                            : n
                    )
                );
            }
        }
        setActualize();
    };

    const handleRotation = (
        type: string,
        rotate: number,
        index: number
    ) => {
        if (type === 'Logo') {
            setLogos(
                logos.map((l: Logo, i: number) => i === index ? { ...l, rotate } : l
                )
            );
        } else if (type === 'Text') {
            setTexts(
                texts.map((t: Text, i: number) => i === index ? { ...t, rotate } : t
                )
            );
        } else {
            setNumbers(
                numbers.map((n: Number, i: number) => i === index ? { ...n, rotate } : n
                )
            );
        }
        saveDataToLocal();
        setActualize();
    };

    const handleDragEnd = () => {
        setIsDraggingLogo(false);
        setIsDraggingText(false);
        setIsDraggingNumber(false);
        saveDataToLocal();
    };
    const handleTextSizeChanger = (textSize: number, index: number) => {
        setTexts(
            texts.map((t: Text, i: number) => (i === index ? { ...t, textSize } : t))
        );
        saveDataToLocal();
        setActualize();
    };

    const handleNumberSizeChanger = (
        numberSize: number,
        index: number
    ) => {
        setNumbers(
            numbers.map((n: Number, i: number) => i === index ? { ...n, numberSize } : n));
        saveDataToLocal();
        setActualize();
    };

    const handleLogoSizeChanger = (
        logoSize: number,
        index: number
    ) => {
        setLogos(
            logos.map((l: Logo, i: number) => i === index ? { ...l, logoSize } : l
            )
        );
        saveDataToLocal();
        setActualize();
    };

    return (
        <div>
            <div
                ref={panelRef}
                id="customization-panel"
                className="relative w-[500px] h-[500px] overflow-hidden"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchMove={handleDragMoveTouch}
                onTouchEnd={handleDragEnd}
            >
                <img
                    src={image}
                    draggable="false"
                    className="rounded-full relative w-full h-auto"
                />
                {logos &&
                    logos.map(
                        ({ logoPosition, logoSize, logoUrl, rotate }: Logo, index: number) => logoUrl &&
                            <ManipulableContainer // Componente para manejar la ubicacion, tamaño, y rotacion de cada elemento
                                parentRef={panelRef}
                                key={index}
                                index={index}
                                selection={selection}
                                setSelection={setSelection}
                                onMouseDown={(e) => handleLogoDragStart(e, index)}
                                onTouchStart={(e) => handleLogoTouchStart(e, index)}
                                sizeChange={handleLogoSizeChanger}
                                handleRotation={handleRotation}
                                each={{ position: logoPosition, size: logoSize, logoUrl, rotate, type: 'Logo' }}
                            />
                    )}
                {texts &&
                    texts.map(
                        ({ font, text, textColor, textPosition, textSize, rotate }: Text, index: number) =>
                            <ManipulableContainer
                                parentRef={panelRef}
                                key={index}
                                index={index}
                                selection={selection}
                                setSelection={setSelection}
                                handleChange={handleTextChange}
                                onMouseDown={(e) => handleTextDragStart(e, index)}
                                onTouchStart={(e) => handleTextTouchStart(e, index)}
                                sizeChange={handleTextSizeChanger}
                                handleRotation={handleRotation}
                                each={{ text: text, font, position: textPosition, color: textColor, size: textSize, rotate, type: 'Text' }}
                            />
                    )}
                {numbers &&
                    numbers.map(
                        ({ font, number, numberColor, numberPosition, numberSize, rotate }: Number, index: number) => (
                            <ManipulableContainer
                                parentRef={panelRef}
                                key={index}
                                index={index}
                                selection={selection}
                                setSelection={setSelection}
                                handleChange={handleNumberChange}
                                onMouseDown={(e) => handleNumberDragStart(e, index)}
                                onTouchStart={(e) => handleNumberTouchStart(e, index)}
                                sizeChange={handleNumberSizeChanger}
                                handleRotation={handleRotation}
                                each={{ font, text: number, position: numberPosition, color: numberColor, size: numberSize, rotate, type: 'Number' }}
                            />
                        ))}
            </div>
        </div>
    )
}

export default MainContainer
