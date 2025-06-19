"use client";
import React, { FC } from 'react'
import { useMediaQuery } from "@mui/material";

interface pageProps { }

const CustomizationGuide: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const desktopImages = [
        "/assets/images/landing/customization/INSTRUCTIVO_SUPERIOR_SUPERIOR.png",
        "/assets/images/landing/customization/INSTRUCTIVO_PASO_1.png",
        "/assets/images/landing/customization/INSTRUCTIVO_PASO_2.png",
        "/assets/images/landing/customization/INSTRUCTIVO_PASO_3.png",
        "/assets/images/landing/customization/INSTRUCTIVO_PASO_4.png",
        "/assets/images/landing/customization/INSTRUCTIVO_PASO_5.png",
        "/assets/images/landing/customization/INSTRUCTIVO_PASO_6.png",
        "/assets/images/landing/customization/INSTRUCTIVO_FINAL.png",
    ];

    const mobileImages = [
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_SUPERIOR.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_PASO 1.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_PASO 2.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_PASO 3.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_PASO 4.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_PASO 5.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_PASO 6.png",
        "/assets/images/landing/customization/responsive/INSTRUCTIVO_RESPONSIVE_FINAL.png",
    ];

    const images = isMobile ? mobileImages : desktopImages;

    return (
        <div>
            <img
                src={images[0]}
                alt="Instructivo Superior"
                style={{ maxWidth: '100%', height: 'auto', display: 'block', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)' }}
            />
            {/* Aquí puedes agregar lógica o componentes adicionales para cada imagen */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 0,
                        position: 'relative',
                    }}
                >
                    <img
                        src={images[1]}
                        alt="Instructivo Paso 1"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'cover',
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                    <img
                        src="/assets/images/landing/customization/gifs/CUSTOMIZAR.gif"
                        alt="GIF Customizar"
                        style={{
                            position: 'absolute',
                            left: isMobile ? "15vw" : "12vw",
                            top: isMobile ? '70%' : '50%',
                            transform: 'translateY(-50%)',
                            maxHeight: '80%',
                            maxWidth: isMobile ? '70%' : '40%',
                            zIndex: 2,
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 0,
                        position: 'relative',
                    }}
                >
                    {!isMobile && (
                        <img
                            src="/assets/images/landing/customization/elements/INSTRUCTIVO_ESCRITORIO_ELEMENTOS-11.png"
                            alt="Instructivo Paso 2"
                            style={{
                                position: 'absolute',
                                left: "0px",
                                top: '100px',
                                transform: 'translateY(-50%)',
                                maxHeight: '80%',
                                maxWidth: '40%',

                            }}
                        />
                    )}
                    <img
                        src={images[2]}
                        alt="Instructivo Paso 2"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'cover',
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />

                    <img
                        src="/assets/images/landing/customization/gifs/CANTIDAD.gif"
                        alt="GIF Cantidad"
                        style={{
                            position: 'absolute',
                            right: isMobile ? "15vw" : "12vw",
                            top: isMobile ? '70%' : '50%',
                            transform: 'translateY(-50%)',
                            maxHeight: '80%',
                            maxWidth: isMobile ? '70%' : '40%',
                            zIndex: 2,
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 0,
                        position: 'relative',
                        overflow: 'hidden', // <-- evita scroll horizontal
                    }}
                >

                    <img
                        src={images[3]}
                        alt="Instructivo Paso 3"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'cover',
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: isMobile ? "73%" : '68%',
                            left: 0,
                            width: '100%',
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row', // <-- columna en mobile
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            overflow: 'hidden',
                            gap: isMobile ? 16 : 32,
                        }}
                    >
                        <img
                            src="/assets/images/landing/customization/gifs/TALLAS.gif"
                            alt="GIF Tallas"
                            style={{
                                width: "auto",
                                maxHeight: isMobile ? "auto" : "60vh",
                                objectFit: 'contain',
                                marginRight: isMobile ? 0 : 32,
                                marginBottom: isMobile ? 8 : 0,
                                zIndex: 2,
                                maxWidth: isMobile ? "80vw" : "40vw",
                                boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                            }}
                        />
                        <img
                            src="/assets/images/landing/customization/gifs/ELEMENTOS.gif"
                            alt="GIF Elementos"
                            style={{
                                width: "auto",
                                maxHeight: isMobile ? "auto" : "60vh",
                                objectFit: 'contain',
                                marginLeft: isMobile ? 0 : 32,
                                marginTop: isMobile ? 8 : 0,
                                zIndex: 2,
                                maxWidth: isMobile ? "80vw" : "40vw",
                                boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 0,
                        position: 'relative',
                        overflow: 'hidden', // evita scroll horizontal
                    }}
                >
                    <img
                        src={images[4]}
                        alt="Instructivo Paso 4"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'cover',
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                    {!isMobile && (
                        <img
                            src="/assets/images/landing/customization/elements/INSTRUCTIVO_ESCRITORIO_ELEMENTOS-12.png"
                            alt="Instructivo Paso 3 Elementos"
                            style={{
                                position: 'absolute',
                                right: "0px",
                                top: '-180px',

                                maxHeight: '80%',
                                maxWidth: '40%',
                                zIndex: 100,

                            }}
                        />
                    )}
                    <img
                        src="/assets/images/landing/customization/gifs/TEXT.gif"
                        alt="GIF Text"
                        style={{
                            position: 'absolute',
                            left: "10vw",
                            top: isMobile ? '45%' : '12%',
                            width: 'auto',
                            maxWidth: isMobile ? '80%' : '40%',
                            minWidth: 180,
                            height: 'auto',
                            objectFit: 'contain',
                            zIndex: 2,
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                    {/* Agrega los GIFs COLORES y TEAM debajo de TEXT.gif */}
                    <div
                        style={{
                            position: 'absolute',
                            left: isMobile ? "10vw" : "10vw",
                            top: isMobile ? '78%' : '58%',
                            display: 'flex',
                            flexDirection: 'row',
                            zIndex: 2,
                            gap: 42,
                        }}
                    >
                        <img
                            src="/assets/images/landing/customization/gifs/COLORES.gif"
                            alt="GIF Colores"
                            style={{
                                width: 'auto',
                                maxWidth: "35vw",
                                minWidth: 100,
                                height: 'auto',
                                objectFit: 'contain',
                                boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                            }}
                        />
                        <img
                            src="/assets/images/landing/customization/gifs/TEAM.gif"
                            alt="GIF Team"
                            style={{
                                width: 'auto',
                                maxWidth: "35vw",
                                minWidth: 100,
                                height: 'auto',
                                objectFit: 'contain',
                                boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 0,
                        position: 'relative',
                        overflow: 'hidden', // evita scroll horizontal
                    }}
                >
                    <img
                        src={images[5]}
                        alt="Instructivo Paso 5"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'cover',
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                    <img
                        src="/assets/images/landing/customization/gifs/ESCUDO.gif"
                        alt="GIF Escudo"
                        style={{
                            position: 'absolute',
                            right: isMobile ? "15vw" : "12vw",
                            top: isMobile ? '70%' : '50%',
                            transform: 'translateY(-50%)',
                            maxHeight: '80%',
                            maxWidth: isMobile ? '70%' : '40%',
                            zIndex: 2,
                            boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <img
                    src={images[6]}
                    alt="Instructivo Paso 6"
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)' }}
                />
                {/* GIF PDF y PNG PDF */}
                <img
                    src="/assets/images/landing/customization/gifs/PDF.gif"
                    alt="GIF PDF"
                    style={{
                        position: 'absolute',
                        left: "10vw",
                        top: isMobile ? '40%' : '12%',
                        width: 'auto',
                        maxWidth: isMobile ? '80%' : '40%',
                        minWidth: 180,
                        height: 'auto',
                        objectFit: 'contain',
                        zIndex: 2,
                        boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                    }}
                />
                <img
                    src="/assets/images/landing/customization/gifs/INSTRUCTIVO_ESCRITORIO_PDF.png"
                    alt="Instructivo PDF"
                    style={{
                        position: 'absolute',
                        left: isMobile ? "10vw" : "10vw",
                        top: isMobile ? '72%' : '60%',
                        display: 'flex',
                        flexDirection: 'row',
                        width: 'auto',
                        maxWidth: isMobile ? '80%' : '40%',
                        minWidth: 180,
                        zIndex: 2,
                        gap: 42,
                        boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)'
                    }}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <img
                    src={images[7]}
                    alt="Instructivo Final"
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', boxShadow: '0 8px 24px -8px rgba(0,0,0,0.25)' }}
                />
                {!isMobile && (
                    <img
                        src="/assets/images/landing/customization/elements/INSTRUCTIVO_ESCRITORIO_ELEMENTOS-13.png"
                        alt="Instructivo Paso 2"
                        style={{
                            position: 'absolute',
                            left: "0px",
                            top: '10px',
                            transform: 'translateY(-50%)',
                            maxHeight: '80%',
                            maxWidth: '40%',

                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default CustomizationGuide;