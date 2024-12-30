import { ChevronLeftOutlined } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import { Customization } from 'models/types';
import React, { useEffect, useState } from 'react'
import { useCustomizationsStore } from 'store/customizationsStore';
import { useCustomizationStore } from 'store/customizationStore';

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
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            sx={{
                sm: { width: '33.33%' },  // Estilo para sm (Pantallas pequeñas)
                p: 2,                     // Padding de 2
                gap: 2,                   // Espaciado entre los elementos
                alignItems: 'center',     // Centrado de los elementos
            }}
        >
            <Box display="flex" flexDirection="row" justifyContent="center" width="100%" position="relative">
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    fontWeight={500}
                    fontSize="0.875rem"
                    color="primary.main"
                    sx={{ position: 'absolute', marginRight: '150px', cursor: 'pointer' }}
                    onClick={() => setShowInput('')}
                >
                    <ChevronLeftOutlined sx={{ width: 16, height: 16, color: 'primary.main'}} />
                    Back
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight={600} textAlign="center" sx={{ width: '8rem', borderBottom: '2px solid' }}>
                        Team
                    </Typography>
                    <Typography variant="body1" fontWeight={600} textAlign="center" sx={{ width: '8rem' }}>
                        {selection.index + 1 + ' ' + name}
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                maxHeight="400px"
                sx={{
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555',
                    },
                }}
            >

                {customizations && Number(customizations.length) > 1 &&
                    customizations.map((custom, index: number) => custom.id !== customization.id &&
                        <Box
                            key={index + 1}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                            gap={2}
                            borderBottom="2px solid #f0f0f0"
                            px={1}
                            py={1}
                        >
                            <div style={{ width: '25%', alignItems: 'flex-start' }}>
                                {name === 'Number' ?
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        inputProps={{ inputMode: 'numeric' }}
                                        value={inputValues[sideName]?.[custom.id]?.number?.[selection.index] || ''}
                                        onChange={(e: any) => handleNumberChange(e, custom, selection.index)}
                                        placeholder={`#${index + 1}`}
                                    />
                                    :
                                    <Typography variant="body1" fontWeight="bold" fontSize={16}>
                                        {custom[sideName].numbers[selection.index]?.number || `#${index + 1}`}
                                    </Typography>
                                }
                            </div>
                            <div style={{ width: '80%' }}>
                                {name === 'Text' ?
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        inputProps={{ inputMode: 'numeric' }}
                                        value={inputValues[sideName]?.[custom.id]?.text?.[selection.index] || ''}
                                        onChange={(e: any) => handleTextChange(e, custom, selection.index)}
                                        placeholder="Rename"
                                    />
                                    :
                                    <Typography variant="body2" fontWeight="bold">
                                        {custom[sideName].texts[selection.index]?.text || 'None'}
                                    </Typography>
                                }
                            </div>
                        </Box>
                    )
                }
            </Box>
        </Box >
    )
}

export default InputTeam;