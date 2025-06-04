import axios from 'axios';
import { mbtaVehicle, mbtaVehicleResponse } from '@/app/vehicles/mbtavehicle';
import { MBTARoute } from '../vehicles/mbtaroute';


const USER_TOKEN = process.env.API_KEY;
const AuthStr = `bearer ${USER_TOKEN}`;
const instance = axios.create({
      headers:{Authorization: AuthStr},
      baseURL: 'https://api-v3.mbta.com',
      timeout: 6000,
    });


export async function fetchFilteredVehicles(
  itemsPerPage:number,
  currentPage: number,
  filterRoute:string,
  filterTrip:string
) : Promise<mbtaVehicle[]>{
  const instance = axios.create({
    headers:{Authorization: AuthStr},
    baseURL: 'https://api-v3.mbta.com',
    timeout: 6000,
  });
  const offset = (currentPage - 1) * itemsPerPage;
    try {
    // Build params object dynamically
    const params: Record<string, any> = {
      'page[limit]': itemsPerPage,
      'page[offset]': offset
    };

    // Add filters only if they have values
    if (filterRoute) params['filter[route]'] = filterRoute;
    if (filterTrip) params['filter[trip]'] = filterTrip;

    const response = await instance.get('/vehicles', { params });

    // // Debug logging (optional)
    // if (process.env.NODE_ENV === 'development') {
    //   console.debug('API Request:', response.request);
    //   console.debug('Response Status:', response.status);
    //   console.debug('Filter Params:', { filterRoute, filterTrip });
    // }

    return response.data.data;
        
      } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch vehicles.');
      }
};

export async function fetchVehiclesPages(
  itemsPerPage:number,
  currentPage: number,
  filterRoute:string,
  filterTrip:string
) {
  const offset = (currentPage - 1) * itemsPerPage;
   try {
    const params: Record<string, any> = {
      // 'page[limit]': itemsPerPage, // We only need the count
      // 'page[offset]': offset,
    };

    // Add filters properly
    if (filterRoute) params['filter[route]'] = filterRoute;
    if (filterTrip) params['filter[trip]'] = filterTrip;

    const response = await instance.get('/vehicles', { params });
    
    // Debug log the actual request URL
    console.log('Request URL:', response.config.params);

    // Get total count - try meta first, then fallback to array length
    const totalItems = response.data.meta?.total || response.data.data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // // Debug logging (optional)
    // if (process.env.NODE_ENV === 'development') {
    //   console.debug('API Request:', response.request);
    //   console.debug('Response Status:', response.status);
    //   console.debug('total pages:', response.data.data.length);
    //   console.debug('total pages:', totalPages);
    //   console.debug('Filter Params:', { filterRoute, filterTrip });
      
    // }

    return {
      totalPages,
      totalItems
    };
        
      } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch vehicles.');
      }
//   try {
//     const data =  await instance.get('/vehicles')
//     console.log('total pages ', data.data.data.length)
//     const totalPages = Math.ceil(Number(data.data.data.length) / itemsPerPage);
//     const totalItems = data.data.data.length;
//     console.log('total pages ', totalPages)
//     return {
//       totalPages,
//       totalItems
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
}


// export async function fetchVehicleById(id:string) {
//   try {
//     const instance = axios.create({
//   headers:{Authorization: AuthStr},
//   baseURL: 'https://api-v3.mbta.com',
//   timeout: 6000,
// });
//     const data = await instance.get(`/vehicles/${id}`)
//     const vehicle = data.data.data
//     return vehicle;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoice.');
//   }
// }

export async function fetchRoutes(): Promise<MBTARoute[]>{
  try {
    
    const data = await instance.get(`/routes`)
    const routes = data.data.data
    return routes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Routes.');
  }
}
