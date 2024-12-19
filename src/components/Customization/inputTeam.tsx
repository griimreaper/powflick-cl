import { ChevronLeftOutlined } from '@mui/icons-material';
import { Customization } from 'models/types';
import React, { useEffect, useState } from 'react'
import { useCustomizationsStore, useCustomizationStore } from 'store/customizations';

type Props = {
    id: string;
    sideName: 'frontSide' | 'backSide';
    name: string;
    showInput: boolean;
    selection: {
        type: string,
        index: number,
    }
    setShowInput: Function;
}

const InputTeam = ({ id, sideName, name, showInput, setShowInput, selection }: Props) => {
    const { customization } = useCustomizationStore();
    const { list, setCustomizationInList } = useCustomizationsStore();
    const [inputValues, setInputValues] = useState<{ [side: string]: { [id: string]: { text: string[], number: string[] } } }>({
        frontSide: {},
        backSide: {}
    });
    const customizations = list.find(({ productId }) => productId === id)?.customizations

    useEffect(() => {
        if (customizations) {
            const newInputValues = customizations.reduce((acc, custom) => {
                const currentTexts = custom[sideName].texts
                    .map(textObj => textObj.text || '') // Filtro para asegurar que sea string
                    .filter(Boolean); // Elimina posibles valores undefined
                const currentNumbers = custom[sideName].numbers
                    .map(numberObj => numberObj.number || '') // Filtro para asegurar que sea string
                    .filter(Boolean); // Elimina posibles valores undefined

                acc[sideName] = {
                    ...acc[sideName],
                    [custom.id]: {
                        text: currentTexts,
                        number: currentNumbers,
                    }
                };
                return acc;
            }, { ...inputValues });
            setInputValues(newInputValues);
        }
    }, [customizations]);

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, custom: Customization, index: number) => {
        let inputValue = event.target.value;
        const updatedNumbers = [...(inputValues[sideName]?.[custom.id]?.number || [])];
        updatedNumbers[index] = inputValue;

        // Permitir solo números y hasta 3 dígitos
        if (inputValue !== '') {
            // Asegurarse de que el valor sea numérico y tenga hasta 3 dígitos
            const numericValue = inputValue.replace(/[^0-9]/g, '').slice(0, 3);

            // Convertir a número entero y validar que esté en el rango 0-999
            const validValue = Math.min(Math.max(parseInt(numericValue, 10), 0), 999).toString();

            inputValue = validValue;
        }

        setInputValues({
            ...inputValues,
            [sideName]: {
                ...inputValues[sideName],
                [custom.id]: {
                    ...inputValues[sideName]?.[custom.id],
                    number: updatedNumbers,
                }
            }
        });

        const customUpdated = {
            ...custom,
            [sideName]: {
                ...custom[sideName],
                numbers: index < custom[sideName].numbers.length ?
                    custom[sideName].numbers.map((n, i) => i === index ? { ...customization[sideName].numbers[selection.index], number: inputValue } : n) :
                    [...custom[sideName].numbers, { ...customization[sideName].numbers[selection.index], number: updatedNumbers }]
            }
        };
        setCustomizationInList(id, customUpdated);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>, custom: Customization, index: number) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, "").slice(0, 14);
        const updatedTexts = [...(inputValues[sideName]?.[custom.id]?.text || [])];
        updatedTexts[index] = filteredValue;

        setInputValues({
            ...inputValues,
            [sideName]: {
                ...inputValues[sideName],
                [custom.id]: {
                    ...inputValues[sideName]?.[custom.id],
                    text: updatedTexts,
                }
            }
        });

        const customUpdated = {
            ...custom,
            [sideName]: {
                ...custom[sideName],
                texts: index < custom[sideName].texts.length ?
                    custom[sideName].texts.map((t, i) => i === index ? { ...customization[sideName].texts[selection.index], text: filteredValue } : t) :
                    [...custom[sideName].texts, { ...customization[sideName].texts[selection.index], text: filteredValue }]
            }
        };
        setCustomizationInList(id, customUpdated);
    };

    return (
        Number(customizations?.length) > 1 && showInput &&
        <div className='flex-col flex w-full sm:w-1/3 p-2 items-center gap-2'>
            <div className='flex flex-row w-full items-center justify-center'>
                <div className="w-auto flex flex-row absolute font-medium mr-60 text-sm text-logo hover:underline cursor-pointer items-center sm:hidden"
                    onClick={() => setShowInput('')} >
                    <ChevronLeftOutlined className='w-4 h-4 text-logo cursor-pointer relative' />
                    Back
                </div>
                <div>
                    <h1 className='font-semibold text-xl border-b w-32 text-center'>
                        Team</h1>
                    <h1 className='font-semibold text-md w-32 text-center'>
                        {selection[name.toLowerCase() as keyof {}] + 1 + ' ' + name}</h1>
                </div>
            </div>
            <div className='overflow-y-scroll scroll-chido flex-col flex max-h-[400px]'>

                {customizations && Number(customizations.length) > 1 &&
                    customizations.map((custom, index: number) => custom.id !== customization.id &&
                        <div key={index + 1} className='flex flex-row justify-between items-center justify-center w-full gap-4 font-sm border-b-2 border-gray-100 px-1'>
                            <div className='w-1/4 items-start'>
                                {name === 'Number' ?
                                    <input
                                        type="text"
                                        className="w-full flex py-0 my-2 px-1 font-bold font-medium rounded-lg border border-gray-200"
                                        inputMode="numeric"
                                        value={inputValues[sideName]?.[custom.id]?.number?.[selection.index] || ''}
                                        defaultValue={custom[sideName].numbers[selection.index]?.number}
                                        onChange={(e) => handleNumberChange(e, custom, selection.index)}
                                        placeholder={`#${index + 1}`}
                                    />
                                    :
                                    <p className='text-[16px] font-bold'>{custom[sideName].numbers[selection.index]?.number || `#` + (index + 1)}</p>
                                }
                            </div>
                            <div className='w-4/5'>
                                {name === 'Text' ?
                                    <input
                                        type="text"
                                        className="w-full flex text-md py-0 px-1 font-medium rounded-lg border border-gray-200"
                                        inputMode="numeric"
                                        value={inputValues[sideName]?.[custom.id]?.text?.[selection.index] || ''}
                                        defaultValue={custom[sideName].texts[selection.index]?.text}
                                        onChange={(e) => handleTextChange(e, custom, selection.index)}
                                        placeholder="Rename"
                                    /> :
                                    <p className='text-sm font-bold'>{custom[sideName].texts[selection.index]?.text || 'None'}</p>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default InputTeam;