'use client';
import AOS from 'aos';
    
import 'aos/dist/aos.css';
import { Fragment, useEffect } from 'react';
    
const AOSProvider = ({ children }:{children:React.ReactNode}) => {
   useEffect(() => {
     AOS.init({duration:650});
   }, []);

   return <Fragment >{children}</Fragment>;
};

 export default AOSProvider;