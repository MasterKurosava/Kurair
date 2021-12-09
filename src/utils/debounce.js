import React, {useEffect } from 'react';

export default function useDebounce(value,fn, delay) {
  useEffect(() => {
      const handler = setTimeout(() => { fn() }, delay);
      return () => {  clearTimeout(handler)} 
    },[value]);
}