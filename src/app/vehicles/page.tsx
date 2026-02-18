import Pagination from '@/app/ui/pagination';
// import Search from '@/app/ui/search';
import Table from '@/app/ui/vehicles/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredVehiclesManual, fetchRoutes, fetchTrip } from '@/app/lib/data';
import Splitter from '../ui/vehicles/splitter';
import { formatedDate } from '../lib/utils';
import FilterRouteAndTrip from '../ui/vehicles/FilterRouteAndTrip';
// import { useLocation } from 'react-router-dom';

 
export default async function Page(props: {
  searchParams?: Promise<{
    itemsperpage?: string;
    page?: string;
    'filter[route]':string;
    'filter[trip]':string
  }>;
}) {
  const routesresponse = await fetchRoutes();
  const routeOptions = routesresponse.map(route => ({
          id: route.id,
          label: route.attributes.long_name
  }));
  console.log('routes',routeOptions.length);
  let tripOptions: { id: string, label: string }[] = [];
  
  // const location = useLocation();
  const searchParams = await props.searchParams;
  const itemsPerPage = Number(searchParams?.itemsperpage)||6;
  const currentPage = Number(searchParams?.page) || 1;
  const filterRoute = decodeURIComponent(searchParams?.['filter[route]'] || '');
  const filterTrip = searchParams?.['filter[trip]'] || '';
  console.log('batu',`${filterRoute},${filterTrip}`);
  // const infoData = await fetchFilteredVehicles(itemsPerPage,currentPage,filterRoute,filterTrip);
  const infoData = await fetchFilteredVehiclesManual(itemsPerPage,currentPage,filterRoute,filterTrip);
  const totalPages = infoData?.totalPages;
  const totalItems = infoData?.totalItems;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);
  console.log('data',`${totalItems} ${totalPages} ${startItem} ${endItem}`);
  const vehicles = infoData?.data || [];
  console.log('vehicles',vehicles.length);
  const noData = vehicles.length === 0;
  const date = new Date()
  const today = formatedDate(date);
  if(filterRoute != "") {
    const tripsresponse = await fetchTrip(filterRoute,today);
    tripOptions = tripsresponse.map(trip => ({
          id: trip.id,
          label: trip.attributes.headsign+" "+trip.id
    }));
  }
  
  // console.log('p',response);
  return (
    <div className="container mx-2 my-2">
      <div className="flex w-full items-center justify-between mb-2 mt-4">
        <h1 className={`${lusitana.className} text-2xl`}>Vehicles Table</h1>
        <p>{`Current Page : ${currentPage} from ${totalPages} pages`}</p>
        <p>{
           `${startItem}-${endItem} from ${totalItems} Data `
          }
        </p>
      </div>
      <div className='flex flex-row-reverse justify-between my-3'>
          <Suspense>
            <FilterRouteAndTrip routeOptions={routeOptions} tripOptions={tripOptions}/>
            <Splitter itemsPerPage={itemsPerPage}/>
          </Suspense>
      </div>
      <div>
        {noData ? (
        <div className="container mx-auto p-4 bg-yellow-50 border border-yellow-200 rounded">
          No vehicles found for Route: <strong>{filterRoute}</strong> and Trip: <strong>{filterTrip}</strong>.
        </div>
      ) : (
        <Suspense key={`${currentPage}-${filterRoute}`} fallback={<InvoicesTableSkeleton />}>
          <Table vehicles={vehicles} />
        </Suspense>
      )}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages||1} />
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