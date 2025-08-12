import React, { FC } from 'react'
import Shipping from './Shipping';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping - Pow Flick',
  alternates: {
    canonical: 'https://www.powflick.com/en/shipping',
    languages: {
      en: 'https://www.powflick.com/en/shipping',
      es: 'https://www.powflick.com/es/shipping',
      'x-default': 'https://www.powflick.com/en/shipping',
    },
  },
};

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  return (
    <Shipping />
  )
}

export default page;