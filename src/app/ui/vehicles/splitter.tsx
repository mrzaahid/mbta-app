'use client';

import { usePathname,useSearchParams,useRouter  } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Splitter({itemsPerPage}:{itemsPerPage : number}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const itemparams = Number(searchParams.get('itemsperpage'))||6;
    // setShowPopup(false)
    const handleChange = useDebouncedCallback((term) => {
        try {
            const angka = Number(term);
            const params = new URLSearchParams(searchParams);
            if (angka !== 0) {
                if (angka !== itemparams) {
                console.log(`Searching... ${angka}`);
                
                params.set('itemsperpage', angka.toString());
                replace(`${pathname}?${params.toString()}`);
            }
            }else{
                params.delete('itemsperpage')
            }
        } catch (error) {
            setShowPopup(!showPopup);
        }
    }, 300);
    return(
        <div className='basis-auto relative inline-block justify-center bg-danger'>
            {/* <input
                type="text" // Tetap gunakan type text untuk kontrol penuh
                inputMode="numeric" // Memunculkan keypad numerik di mobile
                pattern="[0-9]*" // Untuk browser yang mendukung
                // value={itemsPerPage}
                onChange={(e) => {
                    handleChange(e.target.value);
                    }}
                width={150}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={itemsPerPage.toString()}
                /> */}
                <div>
                <label className="sr-only"> Quantity </label>

                <div className="flex items-center rounded-sm border border-gray-200">
                    <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                        onClick={ ()=>
                            handleChange(itemparams-1)
                        }
                    >
                    &minus;
                    </button>

                    <input
                    type="number"
                    inputMode="numeric" // Memunculkan keypad numerik di mobile
                    pattern="[0-9]*" // Untuk browser yang mendukung
                    id="Quantity"
                    onChange={(e) => {
                    handleChange(e.target.value);
                    }}
                    // value="1"
                    placeholder={itemsPerPage.toString()}
                    className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                        onClick={ ()=>
                            handleChange(itemparams+1)
                        }
                    >
                    +
                    </button>
                </div>
                </div>
                {showPopup && (
                        <p className="absolute flex items-center justify-center w-48 p-3 text-gray-600 bg-white rounded-lg shadow-lg -left-[13.2rem] -top-1 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white">
                            <span className="truncate ">Please</span>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-6 h-6 text-white transform rotate-45 -translate-y-1/2 border fill-current -right-3 top-1/2 dark:text-gray-800" stroke="currentColor" viewBox="0 0 24 24" >
                                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                            </svg>
                        </p>
                     )}
        </div>
    )
}


