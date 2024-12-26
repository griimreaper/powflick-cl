import { Customization, Logo, Number as Numb, Text } from 'models/types';
import React, { useState } from 'react'
import { useCustomizationsStore } from 'store/customizations';
import { deleteImage, setImageBlob } from 'services/imageStorage';
import CustomTooltip from 'components/Tooltip/tooltip';
import InputTeam from './inputTeam';
import { ChevronRightOutlined, ErrorOutline } from '@mui/icons-material';
import { SwatchesPicker } from "react-color";
import { Box, Button, FormControl, IconButton, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material';

const textTooltip = [
    "You can add this customization to all products if there are several",
];
const textTooltipTeam = [
    "You can use this same customization in other products if you have more than 1",
];

interface EditableContainerProps {
    id: string;
    selection: {
        type: 'Text' | 'Number' | 'Logo' | '';
        index: number;
    };
    setSelection: Function;
    logos: Logo[] & any;
    setLogos: Function;
    texts: Text[] & any;
    setTexts: Function;
    handleTextChange: Function;
    numbers: Numb[] & any;
    setNumbers: Function;
    handleNumberChange: Function;
    sideName: 'frontSide' | 'backSide';
    saveDataToLocal: () => void;
    setActualize: () => void;
    fonts: { [key: string]: string };
    font: string;
    fontColor: string;
    showInputsEdit: string;
    setShowInputsEdit: Function;
}
function EditableContainer({
    id,
    selection,
    setSelection,
    logos,
    setLogos,
    texts,
    setTexts,
    handleTextChange,
    numbers,
    setNumbers,
    handleNumberChange,
    sideName,
    saveDataToLocal,
    setActualize,
    fonts,
    font,
    fontColor,
    showInputsEdit,
    setShowInputsEdit,
}: EditableContainerProps) {
    const [file, setFile] = useState<File | null>(null);
    const { list, setCustomizationsInList } = useCustomizationsStore();
    const customizations = list.find(({ productId }) => productId === id)?.customizations;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (index: number) => {
        if (file) {
            if (logos[index].logoUrl !== "") {
                try {
                    await deleteImage(logos[index].logoUrl);
                    setLogos(
                        logos.map((l: Logo, i: number) =>
                            i === index ? { ...l, logoUrl: "" } : l
                        )
                    );
                    saveDataToLocal();
                    setActualize();
                } catch (error) {
                    console.error("Error deleting logo:", error);
                }
            }
            try {
                const data = await setImageBlob(file, "Customizations");

                setLogos(
                    logos.map((l: Logo, i: number) =>
                        i === index ? { ...l, logoUrl: data.secure_url } : l
                    )
                );

                saveDataToLocal();
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
        }
    };

    const removeLogo = async (index: number) => {
        if (logos[index].logoUrl !== "") {
            try {
                await deleteImage(logos[index].logoUrl);
                setLogos(
                    logos.map((l: Logo, i: number) =>
                        i === index ? { ...l, logoUrl: "" } : l
                    )
                );
                saveDataToLocal();
                setActualize();
                setFile(null);
            } catch (error) {
                console.error("Error deleting logo:", error);
            }
        }
    };

    const handleTextColorChange = (color: any, index: number) => {
        setTexts(
            texts.map((t: Text, i: number) =>
                i === index ? { ...t, textColor: color.hex } : t
            )
        );
        saveDataToLocal();
        setActualize();
    };

    const handleNumberColorChange = (color: any, index: number) => {
        setNumbers(
            numbers.map((n: Numb, i: number) =>
                i === index ? { ...n, numberColor: color.hex } : n
            )
        );
        saveDataToLocal();
        setActualize();
    };

    const handleFontChange = (
        event: SelectChangeEvent ,
        index: number,
        type: "Text" | "Number"
    ) => {
        if (type === "Text") {
            setTexts(
                texts.map((t: Text, i: number) =>
                    i === index ? { ...t, font: event.target.value } : t
                )
            );
        } else {
            setNumbers(
                numbers.map((n: Numb, i: number) =>
                    i === index ? { ...n, font: event.target.value } : n
                )
            );
        }
        saveDataToLocal();
        setActualize();
    };

    const addNewElement = (element: string) => {
        if (element === "Text") {
            if (texts.some((e: Text) => !e.text)) {
                setSelection({
                    type: element,
                    index: texts.findIndex((e: Text) => !e.text),
                });
            }
            setTexts([
                ...texts,
                {
                    type: "Text",
                    text: "Insert Text",
                    font: typeof font === "string" && fonts[font] ? font : "",
                    textColor: (typeof fontColor === "string" && fontColor) || "black",
                    textSize: 24,
                    textPosition: { x: 80, y: 100 },
                    textDragOffset: { x: 0, y: 0 },
                    rotate: 0,
                },
            ]);
            setSelection({ type: 'Text', index: texts.length });

        } else if (element === "Number") {
            if (numbers.some((e: Numb) => !e.number)) {
                setSelection({
                    type: element,
                    index: numbers.findIndex((e: Numb) => !e.number),
                });
            }
            setNumbers([
                ...numbers,
                {
                    type: "Number",
                    number: "0",
                    font: typeof font === "string" && fonts[font] ? font : "",
                    numberColor:
                        (typeof fontColor === "string" && fontColor) || "black",
                    numberPosition: { x: 200, y: 200 },
                    numberDragOffset: { x: 0, y: 0 },
                    numberSize: 50,
                    rotate: 0,
                },
            ]);
            setSelection({
                type: element,
                index: numbers.length,
            });

        } else if (element === "Logo") {
            if (logos.some((e: Logo) => !e.logoUrl)) {
                setSelection({
                    type: element,
                    index: logos.findIndex((e: Logo) => !e.logoUrl),
                });
            } else {
                setLogos([
                    ...logos,
                    {
                        type: "Logo",
                        logoUrl: "",
                        logoSize: 80,
                        logoPosition: { x: 200, y: 200 },
                        logoDragOffset: { x: 0, y: 0 },
                        rotate: 0,
                    },
                ]);
                setSelection({ type: element, index: logos.length });
            }
        }
    };

    const handleSetForAll = (name: string) => {
        let setting: { [key: string]: any } = {};
        if (name === "Logo") {
            setting.logos = logos;
        } else if (name === "Text") {
            setting.texts = texts;
        } else if (name === "Number") {
            setting.numbers = numbers;
        }
        const foundItem = list.find(({ productId }) => productId === id);

        if (foundItem) {
            // Manejar el caso cuando no se encuentra el producto
            const newList: Customization[] = foundItem.customizations.map(
                (customization: any) => {
                    return {
                        ...customization,
                        [sideName]: {
                            ...customization[sideName],
                            ...setting,
                        },
                    };
                }
            );

            setCustomizationsInList(id, newList);
        }
        setActualize();
    };

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
            {selection.type === "Logo" && (
                <Box sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            maxWidth: "100%",
                            overflowX: "auto",
                            display: "flex",
                            gap: 2,
                            px: 4,
                            pb: 2,
                            borderRadius: 1,
                        }}
                    >
                        {logos.map(
                            (each: Logo, index: number) =>
                                each.logoUrl && (
                                    <Box
                                        component="img"
                                        key={`${index}logos${sideName}`}
                                        src={each.logoUrl}
                                        sx={{
                                            height: 32,
                                            width: 32,
                                            backgroundColor: selection.index === index ? "primary.main" : "grey.200",
                                            borderRadius: 1,
                                            p: 0.5,
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "primary.main",
                                            },
                                        }}
                                        onClick={() => setSelection({ type: "Logo", index })}
                                    />
                                )
                        )}
                        <Button
                            variant="contained"
                            sx={{ p: 1, backgroundColor: "grey.200", "&:hover": { backgroundColor: "primary.main", color: "white" } }}
                            onClick={() => addNewElement("Logo")}
                        >
                            +
                        </Button>
                    </Box>
                    {/* Logo */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            sx={{
                                py: 1,
                                fontSize: "0.875rem",
                                "&:focus": {
                                    outline: "none",
                                    borderColor: "primary.main",
                                    ring: "2px solid primary.main",
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleSubmit(selection.index)}
                            disabled={!file}
                            sx={{
                                width: 112,
                                backgroundColor: !file ? "grey.300" : "neutral.main",
                                cursor: !file ? "not-allowed" : "pointer",
                                "&:hover": {
                                    backgroundColor: !file ? "grey.300" : "neutral.dark",
                                },
                            }}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => removeLogo(selection.index)}
                            disabled={!logos[selection.index]?.logoUrl}
                            sx={{
                                width: 112,
                                opacity: !logos[selection.index]?.logoUrl ? 0.5 : 1,
                                cursor: !logos[selection.index]?.logoUrl ? "not-allowed" : "pointer",
                                "&:hover": {
                                    backgroundColor: !logos[selection.index]?.logoUrl ? "error.main" : "error.dark",
                                },
                            }}
                        >
                            Remove
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => handleSetForAll("Logo")}
                            disabled={customizations?.length === 1 || !logos[selection.index]?.logoUrl}
                            sx={{
                                backgroundColor:
                                    customizations?.length === 1 || !logos[selection.index]?.logoUrl
                                        ? "grey.300"
                                        : "neutral.main",
                                cursor:
                                    customizations?.length === 1 || !logos[selection.index]?.logoUrl
                                        ? "not-allowed"
                                        : "pointer",
                                "&:hover": {
                                    backgroundColor:
                                        customizations?.length === 1 || !logos[selection.index]?.logoUrl
                                            ? "grey.300"
                                            : "neutral.dark",
                                },
                            }}
                        >
                            Set For All
                            <Tooltip title={textTooltip} placement="bottom">
                                <IconButton>
                                    <ErrorOutline fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Button>
                    </Box>
                </Box>
            )}
            {/* Text */}
            {selection.type === "Text" && (
                <Box display="flex" flexDirection="column" width="100%">
                    <Box
                        sx={{
                            maxWidth: "100%",
                            overflowX: "auto",
                            display: "flex",
                            gap: 2,
                            px: 2,
                            pb: 1,
                        }}
                    >
                        {texts.map((each: Text, index: number) => (
                            (each.text || selection.index === index) && (
                                <TextField
                                    key={index + "texts" + sideName}
                                    variant="outlined"
                                    size="small"
                                    value={each.text || ""}
                                    onClick={() => setSelection({ type: "Text", index })}
                                    onChange={(e) => handleTextChange(e, selection.index)}
                                    inputProps={{
                                        style: { textAlign: "center" },
                                    }}
                                    sx={{
                                        width: `${(each.text ?? "").length + 2}ch`,
                                        "&.Mui-focused": {
                                            backgroundColor: selection.index === index ? "#D23F57" : "#f5f5f5",
                                        },
                                        backgroundColor: selection.index === index ? "#D23F57" : "#f5f5f5",
                                        cursor: selection.index === index ? "default" : "pointer",
                                        "&:hover": { backgroundColor: "#D23F57" },
                                    }}
                                />
                            )
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => addNewElement("Text")}
                        >
                            +
                        </Button>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection={{ xs: "column", sm: "row" }}
                        justifyContent="center"
                        gap={2}
                        mt={2}
                        sx={{ display: showInputsEdit === "Text" ? "none" : "flex" }}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <Box display="flex" alignItems="center" gap={2}>
                                {Number(
                                    list.find(({ productId }) => productId === id)?.customizations?.length
                                ) > 1 && (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                                showInputsEdit === "Text"
                                                    ? setShowInputsEdit("")
                                                    : setShowInputsEdit("Text")
                                            }
                                        >
                                            <Tooltip title={textTooltipTeam} placement="bottom">
                                                <ErrorOutline
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        opacity: 0.5,
                                                        "&:hover": { opacity: 1 },
                                                    }}
                                                />
                                            </Tooltip>
                                            <Typography variant="body2" color="primary" sx={{ textDecoration: "underline" }}>
                                                Team
                                            </Typography>
                                            <ChevronRightOutlined sx={{ width: 16, height: 16 }} />
                                        </Box>
                                    )}
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel id="font-select-label">Font</InputLabel>
                                <Select
                                    labelId="font-select-label"
                                    value={texts[selection.index]?.font || ""}
                                    onChange={(e) => handleFontChange(e, selection.index, "Text")}
                                    defaultValue={font}
                                >
                                    {Object.entries(fonts).map(([fontName, fontFamily]) => (
                                        <MenuItem
                                            key={fontName}
                                            value={fontName}
                                            style={{ fontFamily }}
                                        >
                                            {fontName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box display="flex" justifyContent="center" borderRadius={1}>
                                <SwatchesPicker
                                    color={texts[selection.index]?.textColor || "000000"}
                                    onChange={(e: any) => handleTextColorChange(e, selection.index)}
                                    width={300}
                                    height={300}
                                />
                            </Box>
                            <Button
                                onClick={() => handleSetForAll("Text")}
                                disabled={customizations?.length === 1}
                                sx={{
                                    gap: 1,
                                    color: "white",
                                    backgroundColor: customizations?.length === 1 ? "#e0e0e0" : "#D23F57",
                                    "&:hover": {
                                        backgroundColor: customizations?.length === 1 ? "#D23F57" : "#D23F57",
                                    },
                                }}
                            >
                                Set For All
                                <Tooltip title={textTooltip} placement="bottom">
                                    <ErrorOutline
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            opacity: 0.5,
                                            "&:hover": { opacity: 1 },
                                        }}
                                    />
                                </Tooltip>
                            </Button>
                        </Box>
                        <InputTeam
                            sideName={sideName}
                            selection={selection}
                            name={"Text"}
                            id={id}
                            showInput={showInputsEdit === "Text"}
                            setShowInput={setShowInputsEdit}
                        />
                    </Box>
                </Box>
            )}
            {/* Number */}
            {selection.type === "Number" && (
                <Box display="flex" flexDirection="column" width="100%">
                    <Box
                        sx={{
                            maxWidth: "100%",
                            overflowX: "auto",
                            display: "flex",
                            gap: 2,
                            px: 2,
                            pb: 1,
                        }}
                    >
                        {numbers?.map((each: Numb, index: number) => (
                            (each.number || selection.index === index) && (
                                <TextField
                                    key={index + "numbers" + sideName}
                                    value={each.number}
                                    color='primary'
                                    onChange={(e) => handleNumberChange(e, selection.index)}
                                    onClick={() => setSelection({ type: "Number", index })}
                                    inputProps={{
                                        style: {
                                            textAlign: "center",
                                            width: `${(each.number ?? "").length + 1}ch`,
                                        },
                                    }}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        "&.Mui-focused": {
                                            backgroundColor: selection.index === index ? "#D23F57" : "#f5f5f5",
                                        },
                                        backgroundColor: selection.index === index ? "#D23F57" : "#f5f5f5",
                                        cursor: selection.index === index ? "default" : "pointer",
                                        "&:hover": { backgroundColor: "#D23F57", color: "#fff" },
                                    }}
                                />
                            )
                        ))}
                        <Button
                            onClick={() => addNewElement("Number")}
                            variant="contained"
                            color='primary'
                            size="small"
                        >
                            +
                        </Button>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection={{ xs: "column", sm: "row" }}
                        justifyContent="center"
                        gap={2}
                        mt={2}
                        sx={{ display: showInputsEdit === "Number" ? "none" : "flex" }}
                    >
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <Box display="flex" alignItems="center" gap={2}>
                                {Number(
                                    list.find(({ productId }) => productId === id)?.customizations.length
                                ) > 1 && (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                                showInputsEdit === "Number"
                                                    ? setShowInputsEdit("")
                                                    : setShowInputsEdit("Number")
                                            }
                                        >
                                            <Tooltip title={textTooltipTeam} placement="bottom">
                                                <ErrorOutline
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        opacity: 0.5,
                                                        "&:hover": { opacity: 1 },
                                                    }}
                                                />
                                            </Tooltip>
                                            <Typography variant="body2" color="primary" sx={{ textDecoration: "underline" }}>
                                                Team
                                            </Typography>
                                            <ChevronRightOutlined sx={{ width: 16, height: 16 }} />
                                        </Box>
                                    )}
                            </Box>

                            <FormControl fullWidth>
                                <InputLabel id="font-select-label">Font</InputLabel>
                                <Select
                                    labelId="font-select-label"
                                    value={numbers[selection.index]?.font || ""}
                                    onChange={(e) => handleFontChange(e, selection.index, "Text")}
                                    defaultValue={font}
                                >
                                    {Object.entries(fonts).map(([fontName, fontFamily]) => (
                                        <MenuItem
                                            key={fontName}
                                            value={fontName}
                                            style={{ fontFamily }}
                                        >
                                            {fontName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box display="flex" justifyContent="center" borderRadius={1}>
                                <SwatchesPicker
                                    color={numbers[selection.index]?.numberColor || "#000000"}
                                    onChange={(e: any) => handleNumberColorChange(e, selection.index)}
                                    width={300}
                                    height={300}
                                />
                            </Box>

                            <Button
                                onClick={() => handleSetForAll("Number")}
                                disabled={customizations?.length === 1}
                                sx={{
                                    gap: 1,
                                    color: "white",
                                    backgroundColor: customizations?.length === 1 ? "#e0e0e0" : "#D23F57",
                                    "&:hover": {
                                        backgroundColor: customizations?.length === 1 ? "#D23F57" : "#D23F57",
                                    },
                                }}
                            >
                                Set For All
                                <Tooltip title={textTooltip} placement="bottom">
                                    <ErrorOutline
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            opacity: 0.5,
                                            "&:hover": { opacity: 1 },
                                        }}
                                    />
                                </Tooltip>
                            </Button>
                        </Box>

                        <InputTeam
                            sideName={sideName}
                            selection={selection}
                            name={"Number"}
                            id={id}
                            showInput={showInputsEdit === "Number"}
                            setShowInput={setShowInputsEdit}
                        />
                    </Box>
                </Box>
            )}
            <Box sx={{ width: "100%"        }}>
                {showInputsEdit === "Text" ? (
                    <InputTeam
                        sideName={sideName}
                        selection={selection}
                        name={"Text"}
                        id={id}
                        showInput={showInputsEdit === "Text"}
                        setShowInput={setShowInputsEdit}
                    />
                ) : showInputsEdit === "Number" ? (
                    <InputTeam
                        sideName={sideName}
                        selection={selection}
                        name={"Number"}
                        id={id}
                        showInput={showInputsEdit === "Number"}
                        setShowInput={setShowInputsEdit}
                    />
                ) : null}
            </Box>
        </Box>
    )
}

export default EditableContainer
