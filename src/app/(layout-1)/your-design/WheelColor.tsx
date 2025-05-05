import { useState, useEffect, useRef } from "react";
import iro from "@jaames/iro";

const ColorWheelPicker = ({
    onColorChange,
    colors,
}: {
    colors: string[];
    onColorChange: (colors: string[]) => void;
}) => {
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const colorPickerInstance = useRef<any>(null);
    const editingIndexRef = useRef<number | null>(null);

    const [selectedColors, setSelectedColors] = useState<string[]>(
        colors || ["#ff0000", "#00ff00", "#0000ff"]
    );
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        editingIndexRef.current = editingIndex;
    }, [editingIndex]);

    useEffect(() => {
        if (!colorPickerRef.current || colorPickerInstance.current) return;

        const ColorPicker = (iro as any).ColorPicker;
        colorPickerInstance.current = new ColorPicker(colorPickerRef.current, {
            width: 250,
            handleRadius: 8,
            borderWidth: 2,
            colors: selectedColors,
            layout: [{ component: (iro as any).ui.Wheel }],
        });

        colorPickerInstance.current.on("input:end", () => {
            const picker = colorPickerInstance.current;
            const currentColor = picker?.color?.hexString;
            const index = editingIndexRef.current;

            setSelectedColors((prevColors) => {
                const updatedColors = [...prevColors];

                if (index !== null && index < prevColors.length) {
                    updatedColors[index] = currentColor;
                } else if (
                    prevColors.length < 3 &&
                    !prevColors.includes(currentColor)
                ) {
                    updatedColors.push(currentColor);
                }

                if (updatedColors.length === 0) updatedColors.push("#ffffff");

                colorPickerInstance.current.setColors(updatedColors);
                if (onColorChange) onColorChange(updatedColors);

                return updatedColors;
            });

            setEditingIndex(null);
        });
    }, [selectedColors]);

    const handleRemoveColor = (index: number) => {
        let updated = selectedColors.filter((_, i) => i !== index);
        if (updated.length === 0) {
            updated = ['#ffffff']
            onColorChange([])
            return;
        };
        setSelectedColors(updated);
        setEditingIndex(null);

        colorPickerInstance.current?.setColors(updated);
        onColorChange(updated);
    };

    const handleEditColor = (index: number) => {
        setEditingIndex(index);
        editingIndexRef.current = index;
    };

    return (
        <div>
            <div ref={colorPickerRef} />
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                {selectedColors.map((color, index) => ( colors.length !== 0 &&
                    <div
                        key={index}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: color,
                            border: "2px solid #ccc",
                            position: "relative",
                            cursor: "pointer",
                            boxShadow: editingIndex === index ? "0 0 0 2px black" : undefined,
                        }}
                        title="Click to edit"
                        onClick={() => handleEditColor(index)}
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: -6,
                                right: -6,
                                background: "#000",
                                color: "#fff",
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveColor(index);
                            }}
                        >
                            &times;
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorWheelPicker;
