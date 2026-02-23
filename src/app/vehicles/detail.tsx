'use client'
import React, { useEffect, useState } from 'react';
import { mbtaVehicle } from './mbtavehicle';
import Maps from '../ui/vehicles/maps';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { streamVehicleById} from '../lib/data';
   interface DetailProps {
    vehicleData: mbtaVehicle;  
   }

   export default function Detail({ vehicleData }: DetailProps ) {
    const [showPopup, setShowPopup] = useState(false);
    const [liveData, setLiveData] = useState<mbtaVehicle>(vehicleData);
     const togglePopup = () => {
       setShowPopup(!showPopup);
     };
    useEffect(() => {
      if (!showPopup) return;
      const vehiclesStream = streamVehicleById(vehicleData.id);
      vehiclesStream.addEventListener('update', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        setLiveData(Array.isArray(data) ? data[0] : data);
      });
      
      vehiclesStream.addEventListener('reset', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        setLiveData(Array.isArray(data) ? data[0] : data);
      });

      return () => {
        vehiclesStream.close();
      };
    }, [showPopup, vehicleData.id]);
        

     return (
        
       <div>
        
         <button onClick={togglePopup} className="flex rounded-md border p-2 hover:bg-gray-100" ><p>Detail</p> <DocumentMagnifyingGlassIcon className='w-5'/>
         </button>
         {showPopup && (
           <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-base font-semibold text-gray-900" >Vehicle Detail</h3>
                        <div className="mt-2">
                        <h2>Vehicle {liveData?.id }</h2>
                            <p>Vehicle Label : {liveData?.attributes.label}</p>
                            <p>Vehicle Status : {liveData?.attributes.current_status}</p>
                            <p>Vehicle Lat & Lgt : {liveData?.attributes.latitude} & {vehicleData.attributes.longitude}</p>
                            <p>Vehicle Last Updated : {liveData?.attributes.updated_at}</p>
                            <p>Vehicle Route : {liveData?.relationships.route.data.id}</p>
                            <p>Vehicle Trip {liveData?.relationships.trip.data?.id}</p>
                                {liveData?.attributes.revenue ? (
                                liveData?.attributes.revenue === 'REVENUE' ? (
                                    
                                    <p>This trip is accepting passengers.</p>
                                    ) : (
                                    <p>THis trip is not accepting passengers</p>
                                    )
                                ):(
                                <p>Revenue status unknown</p>
                                )}
                            <Maps longitude={liveData?.attributes.longitude ?? vehicleData.attributes.longitude} latitude={liveData?.attributes.latitude ?? vehicleData.attributes.latitude} zoom={16}/>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={togglePopup} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">exit</button>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>
         )}
       </div>
     );
   };
   