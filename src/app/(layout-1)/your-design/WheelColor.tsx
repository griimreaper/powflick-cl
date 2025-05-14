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
        const handleClickOutside = (event: MouseEvent) => {
            const pickerEl = colorPickerRef.current;
            const target = event.target as Node;

            // Si el click no ocurrió dentro del color picker ni sobre una burbuja de color
            if (
                pickerEl &&
                !pickerEl.contains(target) &&
                !(target instanceof HTMLElement && target.closest(".color-bubble"))
            ) {
                setEditingIndex(null);
                editingIndexRef.current = null;
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    }, []);

    // Registra el listener una vez
    useEffect(() => {
        if (!colorPickerInstance.current) return;

        const picker = colorPickerInstance.current;

        const handleColorChange = () => {
            const currentColor = colorPickerInstance.current.color.hexString;
            const index = editingIndexRef.current;

            setSelectedColors((prevColors) => {
                const updatedColors = [...prevColors];

                if (index !== null && index < prevColors.length) {
                    updatedColors[index] = currentColor;
                } else if (prevColors.length < 3 && !prevColors.includes(currentColor)) {
                    updatedColors.push(currentColor);
                }

                picker.setColors(updatedColors);
                onColorChange(updatedColors);

                editingIndexRef.current = index; // Resetea el índice después de aplicar el color

                return updatedColors;
            });
        };

        picker.on("input:end", handleColorChange);

        return () => {
            picker.off("input:end", handleColorChange); // limpia al desmontar
        };
    }, []);

    useEffect(() => {
        if (!colorPickerInstance.current) return;

        const picker = colorPickerInstance.current;

        const handleActiveColorChange = (color: any) => {
            const index = color?.index;

            setEditingIndex(index);
            editingIndexRef.current = index;
        };

        picker.on("color:setActive", handleActiveColorChange);

        return () => {
            picker.off("color:setActive", handleActiveColorChange);
        };
    }, []);


    const handleRemoveColor = (index: number) => {
        let updated: any = selectedColors.filter((_, i) => i !== index);

        if (updated.length === 0) {
            updated = null;
            onColorChange([])
            setSelectedColors([]);
            return
        };

        setSelectedColors(updated);

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
                {selectedColors.map((color, index) => (
                    <div
                        key={index}
                        className="color-bubble"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: color,
                            border: "2px solid #ccc",
                            position: "relative",
                            cursor: "pointer",
                            boxShadow: editingIndexRef.current === index ? "0 0 0 2px black" : undefined,
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
