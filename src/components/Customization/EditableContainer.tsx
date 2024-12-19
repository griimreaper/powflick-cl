import { Customization, Logo, Number as Numb, Text } from 'models/types';
import React, { useState } from 'react'
import { useCustomizationsStore } from 'store/customizations';
import { deleteImage, setImageBlob } from 'services/imageStorage';
import CustomTooltip from 'components/Tooltip/tooltip';
import InputTeam from './inputTeam';
import { ChevronRightOutlined, ErrorOutline } from '@mui/icons-material';
import { SwatchesPicker } from 'react-color';

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
        event: React.ChangeEvent<HTMLSelectElement>,
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
        <div className='w-full flex'>
            {selection.type === "Logo" && (
                <div className="w-full">
                    <div className="max-w-full overflow-x-scroll mini-scroll rounded-md flex gap-2 px-4 pb-2">
                        {logos.map(
                            (each: Logo, index: number) =>
                                each.logoUrl && (
                                    <img
                                        key={index + "logos" + sideName}
                                        src={each.logoUrl}
                                        className={`h-8 w-8 bg-gray-200 rounded-md p-2 ${selection.index === index
                                            ? "bg-logo"
                                            : "bg-gray-200 cursor-pointer hover:bg-logo"
                                            }`}
                                        onClick={() => setSelection({ type: 'Logo', index })}
                                    ></img>
                                )
                        )}
                        <button
                            className={`w-auto p-1 bg-gray-200 rounded-md hover:bg-logo hover:text-white`}
                            onClick={() => addNewElement("Logo")}
                        >
                            +
                        </button>
                    </div>
                    {/* Logo */}
                    <div className="flex-col flex w-full items-center justify-center gap-2">
                        <input
                            type="file"
                            accept="image/png"
                            onChange={handleFileChange}
                            className="py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <button
                            onClick={() => handleSubmit(selection.index)}
                            disabled={!file}
                            className={`px-1 w-28 mx-auto flex items-center justify-center rounded-md border border-transparent
                     sm:w-28 text-base font-medium text-white
                        ${!file
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-neutral hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
                                }`}
                        >
                            Upload
                        </button>
                        <button
                            onClick={() => removeLogo(selection.index)}
                            disabled={!logos[selection.index].logoUrl}
                            className={`px-1 mx-auto flex items-center justify-center rounded-md border border-transparent bg-red-600 w-28 text-base font-medium text-white
                        ${!logos[selection.index].logoUrl
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                }`}
                        >
                            Remove
                        </button>

                        <button
                            onClick={() => handleSetForAll("Logo")}
                            disabled={
                                customizations?.length === 1 ||
                                !logos[selection.index].logoUrl
                            }
                            className={`gap-1 px-1  mx-auto flex items-center justify-center rounded-md border border-transparent  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
                        ${customizations?.length === 1 ||
                                    !logos[selection.index].logoUrl
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-neutral hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
                                }`}
                        >
                            Set For All
                            <CustomTooltip content={textTooltip} position="bottom">
                                <ErrorOutline className="w-6 h-6 opacity-50 hover:opacity-100 transition duration-300" />
                            </CustomTooltip>
                        </button>
                    </div>
                </div>
            )}
            {/* Text */}
            {selection.type === "Text" && (
                <div className="w-full flex flex-col">
                    <div className="max-w-full overflow-x-scroll mini-scroll flex gap-2 px-4 pb-2">
                        {texts.map(
                            (each: Text, index: number) =>
                                (each.text || selection.index === index) && (
                                    <input
                                        key={index + "texts" + sideName}
                                        className={`w-auto p-0 bg-gray-200 rounded-md text-center whitespace-nowrap ${selection.index === index
                                            ? "bg-logo text-white"
                                            : "bg-gray-200 cursor-pointer hover:bg-logo hover:text-white"
                                            }`}
                                        style={
                                            { width: `${(each.text ?? '').length + 0.5}ch` }
                                        }
                                        onClick={() => setSelection({ type: 'Text', index })}
                                        defaultValue={each.text}
                                        value={each.text}
                                        onChange={(e) => handleTextChange(e, selection.index)}
                                    >
                                    </input>
                                )
                        )}
                        <button
                            className={`w-auto p-1 bg-gray-200 rounded-md hover:bg-logo hover:text-white`}
                            onClick={(e) => addNewElement("Text")}
                        >
                            +
                        </button>
                    </div>
                    <div
                        className={`flex flex-row sm:flex justify-center gap-2 mt-2
                    ${showInputsEdit === "Text" ? " hidden " : ""}`}
                    >
                        <div className="flex-col flex gap-2 justify-center items-center">
                            <div className="flex-row flex gap-2 w-full justify-center items-center">
                                {Number(
                                    list.find(({ productId }) => productId === id)?.customizations
                                        .length
                                ) > 1 && (
                                        <div
                                            className="w-auto flex flex-row font-medium text-sm text-logo hover:underline cursor-pointer items-center "
                                            onClick={() =>
                                                showInputsEdit === "Text"
                                                    ? setShowInputsEdit("")
                                                    : setShowInputsEdit("Text")
                                            }
                                        >
                                            <CustomTooltip content={textTooltipTeam} position="bottom">
                                                <ErrorOutline className="w-6 h-6 opacity-50 hover:opacity-100 transition duration-300" />
                                            </CustomTooltip>
                                            Team
                                            <ChevronRightOutlined className="w-4 h-4" />
                                        </div>
                                    )}
                            </div>
                            <select
                                value={texts[selection.index].font}
                                onChange={(e) =>
                                    handleFontChange(e, selection.index, "Text")
                                }
                                className="mb-2 rounded-lg border border-gray-200 w-full"
                            >
                                {Object.entries(fonts).map(([fontName, fontFamily]) => (
                                    <option
                                        key={fontName}
                                        value={fontName}
                                        style={{ fontFamily }}
                                    >
                                        {fontName}
                                    </option>
                                ))}
                            </select>
                            <div className="flex w-full justify-center">
                                <SwatchesPicker
                                    color={texts[selection.index].textColor || "000000"}
                                    onChange={(e:any) =>
                                        handleTextColorChange(e, selection.index)
                                    }
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <button
                                onClick={() => handleSetForAll("Text")}
                                disabled={customizations?.length === 1}
                                className={`gap-1 px-1 mx-auto flex items-center justify-center rounded-md border border-transparent  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
                        ${customizations?.length === 1
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-neutral hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
                                    }`}
                            >
                                Set For All
                                <CustomTooltip content={textTooltip} position="bottom">
                                    <ErrorOutline className="w-6 h-6 opacity-50 hover:opacity-100 transition duration-300" />
                                </CustomTooltip>
                            </button>
                        </div>
                        <InputTeam
                            sideName={sideName}
                            selection={selection}
                            name={"Text"}
                            id={id}
                            showInput={showInputsEdit === "Text"}
                            setShowInput={setShowInputsEdit}
                        />
                    </div>
                </div>
            )}
            {/* Number */}
            {selection.type === "Number" && (
                <div className="w-full flex flex-col">
                    <div className="max-w-full overflow-x-scroll mini-scroll flex gap-2 px-4 pb-2">
                        {numbers?.map(
                            (each: Numb, index: number) =>
                                (each.number || selection.index === index) && (
                                    <input
                                        key={index + "numbers" + sideName}
                                        className={`w-auto p-0 text-center bg-gray-200 rounded-md ${selection.index === index
                                            ? "bg-logo text-white"
                                            : "bg-gray-200 cursor-pointer hover:bg-logo hover:text-white"
                                            }`}
                                        onClick={() => setSelection({ type: 'Number', index })}
                                        style={
                                            { width: `${(each.number ?? '').length + 1}ch` }
                                        }
                                        value={each.number}
                                        onChange={(e) => handleNumberChange(e, selection.index)}
                                    >
                                    </input>
                                )
                        )}
                        <button
                            className={`w-auto p-1 bg-gray-200 rounded-md hover:bg-logo hover:text-white`}
                            onClick={() => addNewElement("Number")}
                        >
                            +
                        </button>
                    </div>
                    <div
                        className={`flex flex-row sm:flex justify-center gap-2 mt-2
                    ${showInputsEdit === "Number" ? " hidden" : ""}`}
                    >
                        <div className="flex-col flex justify-center items-center gap-2">
                            <div className="w-full flex w-full justify-center items-center gap-2">
                                {Number(
                                    list.find(({ productId }) => productId === id)?.customizations
                                        .length
                                ) > 1 && (
                                        <div
                                            className="w-auto flex flex-row font-medium text-sm text-logo hover:underline cursor-pointer items-center"
                                            onClick={() =>
                                                showInputsEdit === "Number"
                                                    ? setShowInputsEdit("")
                                                    : setShowInputsEdit("Number")
                                            }
                                        >
                                            <CustomTooltip content={textTooltipTeam} position="bottom">
                                                <ErrorOutline className="w-6 h-6 opacity-50 hover:opacity-100 transition duration-300" />
                                            </CustomTooltip>
                                            Team
                                            <ChevronRightOutlined className="w-4 h-4" />
                                        </div>
                                    )}
                            </div>
                            <select
                                value={numbers[selection.index].font}
                                onChange={(e) =>
                                    handleFontChange(e, selection.index, "Number")
                                }
                                className="mb-2 rounded-lg border border-gray-200 w-full"
                            >
                                {Object.entries(fonts).map(([fontName, fontFamily]) => (
                                    <option
                                        key={fontName}
                                        value={fontName}
                                        style={{ fontFamily }}
                                    >
                                        {fontName}
                                    </option>
                                ))}
                            </select>
                            <div className="flex w-full justify-center rounded-lg">
                                <SwatchesPicker
                                    color={numbers[selection.index].numberColor || '000000'}
                                    onChange={(e:any) =>
                                        handleNumberColorChange(e, selection.index)
                                    }
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <button
                                onClick={() => handleSetForAll("Number")}
                                disabled={customizations?.length === 1}
                                className={`gap-1 px-1 mx-auto flex items-center justify-center rounded-md border border-transparent  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
                        ${customizations?.length === 1
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-neutral hover:bg-neutral/80 focus:outline-none focus:ring-2 focus:ring-logo focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
                                    }`}
                            >
                                Set For All
                                <CustomTooltip content={textTooltip} position="bottom">
                                    <ErrorOutline className="w-6 h-6 opacity-50 hover:opacity-100 transition duration-300" />
                                </CustomTooltip>
                            </button>
                        </div>
                        <InputTeam
                            sideName={sideName}
                            selection={selection}
                            name={"Number"}
                            id={id}
                            showInput={showInputsEdit === "Number"}
                            setShowInput={setShowInputsEdit}
                        />
                    </div>
                </div>
            )}
            <div className="w-full sm:hidden">
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
            </div>
        </div>
    )
}

export default EditableContainer
