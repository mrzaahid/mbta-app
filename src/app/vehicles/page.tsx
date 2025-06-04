import Pagination from '@/app/ui/pagination';
// import Search from '@/app/ui/search';
import Table from '@/app/ui/vehicles/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchVehiclesPages } from '@/app/lib/data';
import Splitter from '../ui/vehicles/splitter';

 
export default async function Page(props: {
  searchParams?: Promise<{
    itemsperpage?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const itemsPerPage = Number(searchParams?.itemsperpage)||6;
  const currentPage = Number(searchParams?.page) || 1;
  const infoData = await fetchVehiclesPages(itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, infoData.totalItems);
  return (
    <div className="container mx-2 my-2">
      <div className="flex w-full items-center justify-between mb-2 mt-4">
        <h1 className={`${lusitana.className} text-2xl`}>Vehicles Table</h1>
        <p>{`Current Page : ${currentPage} from ${infoData.totalPages} pages`}</p>
        <p>{
           `${startItem}-${endItem} from ${infoData.totalItems} Data `
          }
        </p>
      </div>
      <div className='flex flex-row-reverse my-3'>
          <Suspense>
            <Splitter itemsPerPage={itemsPerPage}/>
          </Suspense>
      </div>
      <div>
          <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
            <Table currentPage={currentPage} itemsPerPage={itemsPerPage}/>
          </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={infoData.totalPages} />
      </div>
    </div>
  );
}








// 'use client'
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { fetchVehiclesPages } from '../lib/data';
// import { mbtaVehicle } from 'app/vehicles/mbtavehicle';

// const VehicleList = () => {
//   const [vehicles, setVehicles] = useState<mbtaVehicle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

// const pages = fetchVehiclesPages();
// console.log('Total pages:', pages);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await axios.get('https://api-v3.mbta.com/vehicles',{
//             params: {
//             'page[limit]': 5,
//             'page[offset]':2
//       },
//         });
        
        
//         setVehicles(response.data.data);
//         console.log('data',response.data.data)
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load vehicle data');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="vehicle-list">
//       <h2>MBTA Vehicles (First 5)</h2>
//       <p>{pages}</p>
//       <ul>
//         {vehicles.map((vehicle) => (
//           <li key={vehicle.id} className="vehicle-item">
//             <h3>Vehicle {vehicle.attributes.label}</h3>
//             <p>
//               Status: {vehicle.attributes.current_status}
//               {vehicle.attributes.current_status === 'STOPPED_AT' && ' (Stopped)'}
//               {vehicle.attributes.current_status === 'IN_TRANSIT_TO' && ' (In Transit)'}
//             </p>
//             <p>Location: {vehicle.attributes.latitude.toFixed(4)}, {vehicle.attributes.longitude.toFixed(4)}</p>
//             <p>Last updated: {new Date(vehicle.attributes.updated_at).toLocaleString()}</p>
            
//           </li>
//         ))}
//       </ul>
      
//     </div>
//   );
// };

// export default VehicleList;