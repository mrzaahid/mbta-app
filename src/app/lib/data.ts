import axios from 'axios';
import { mbtaVehicle, mbtaVehicleResponse, mbtaVehiclesPage } from '@/app/vehicles/mbtavehicle';
import { MBTARoute } from '../vehicles/mbtaroute';
import { MBTATrip } from '../vehicles/mbtatrip';


const USER_TOKEN = process.env.API_KEY;
const AuthStr = `bearer ${USER_TOKEN}`;
const instance = axios.create({
      headers:{Authorization: AuthStr},
      baseURL: 'https://api-v3.mbta.com',
      timeout: 12000,
    });
function getOffsetFromUrl(urlString: string): number {
  try {
    const url = new URL(urlString);
    const offsetParam = url.searchParams.get('page[offset]');
    return offsetParam ? parseInt(offsetParam, 10) : 0;
  } catch (e) {
    console.error('Invalid URL', e);
    return 0;
  }
}

// export async function fetchFilteredVehiclesPages(
//   itemsPerPage:number,
//   currentPage: number,
//   filterRoute:string,
//   filterTrip:string
// ) : Promise<mbtaVehiclesPage>{
//   const instance = axios.create({
//     headers: { Authorization: AuthStr },
//     baseURL: 'https://api-v3.mbta.com',
//     timeout: 6000,
//     // 👇 Custom serializer to prevent encoding commas/spaces
//     paramsSerializer: (params) => {
//       const queryString = new URLSearchParams();
//       for (const [key, value] of Object.entries(params)) {
//         if (value !== undefined && value !== null) {
//           // Manually append without encoding commas/spaces
//           console.log('coba',value)
//           queryString.append(key, String(value));
//         }
//       }
//       // Replace encoded commas (%2C) with literal commas
//       return queryString.toString().replace(/%2C+/, ',');
//     },
//   });
//   const offset = (currentPage - 1) * itemsPerPage;
//     try {
//     // Build params object dynamically
//     const params: Record<string, any> = {
//       'page[limit]': itemsPerPage,
//       'page[offset]': offset
//     };

//     // Add filters only if they have values
//     if (filterRoute) params['filter[route]'] = filterRoute;
//     if (filterTrip) params['filter[trip]'] = filterTrip;

//     const response = await instance.get('/vehicles', { params });
//     const leghtlast = response.data.links.last;
//     const response2 = await axios.get(leghtlast);
//     const lastbatch = getOffsetFromUrl(leghtlast);
//     const totalItems = lastbatch + response2.data.data.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage)
    
//     console.log('from filteredpages Request URL:', response.data.links.last);
//     console.log('from filteredpages no2 Request URL:', response.data.data.length);
      
//     // Note: For manual pagination with filters, totalItems might be the filtered subset
//     return {
//       data: response.data.data,
//       totalPages: totalPages,
//       totalItems: totalItems
//     };
        
//       } catch (err) {
//         console.error('Database Error:', err);
//         throw new Error('Failed to fetch vehicles.');
//       }
// }

export async function fetchFilteredVehiclesManual(
  itemsPerPage: number,
  currentPage: number,
  filterRoute?: string,
  filterTrip?: string
) {
  const offset = (currentPage - 1) * itemsPerPage;
  let url = `https://api-v3.mbta.com/vehicles?page[limit]=${itemsPerPage}&page[offset]=${offset}`;

  if (filterRoute) url += `&filter[route]=${filterRoute.replace(/\s+/g, "")}`;
  if (filterTrip) url += `&filter[trip]=${filterTrip}`;

  try {
    const response = await fetch(url, { headers: { Authorization: AuthStr } });
    const data: mbtaVehicleResponse = await response.json();
    console.log('from vehicle Request URL:', url);
    // console.log('from vehicle no2 Request URL:', data);
    // Fetch the last page to calculate total items
    if (data.links?.last) {
      const lastPageRes = await fetch(data.links.last, { headers: { Authorization: AuthStr } });
      console.log('from vehicle last Request URL:', data.links.last);
      const lastPageData: mbtaVehicleResponse = await lastPageRes.json();
      const totalItems = getOffsetFromUrl(data.links.last) + lastPageData.data.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      console.log('from vehicle last Request URL:', `${offset + lastPageData.data.length} | Total Items: ${totalItems} | Total Pages: ${totalPages}`);
      return {
        data: data.data,
        totalPages,
        totalItems,
      };
    }

    // throw new Error("Pagination links missing");
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch vehicles.');
  }
}

// export async function fetchFilteredVehicles(
//   itemsPerPage:number,
//   currentPage: number,
//   filterRoute:string,
//   filterTrip:string
// ) : Promise<mbtaVehicle[]>{
//   const instance = axios.create({
//     headers:{Authorization: AuthStr},
//     baseURL: 'https://api-v3.mbta.com',
//     timeout: 6000,
//   });
//   const offset = (currentPage - 1) * itemsPerPage;
//     try {
//     // Build params object dynamically
//     const params: Record<string, any> = {
//       'page[limit]': itemsPerPage,
//       'page[offset]': offset
//     };

//     // Add filters only if they have values
//     if (filterRoute) params['filter[route]'] = filterRoute;
//     if (filterTrip) params['filter[trip]'] = filterTrip;

//     const response = await instance.get('/vehicles', { params });
//     console.log('from filtered Request URL:', response.config.params);

//     // // Debug logging (optional)
//     // if (process.env.NODE_ENV === 'development') {
//     //   console.debug('API Request:', response.request);
//     //   console.debug('Response Status:', response.status);
//     //   console.debug('Filter Params:', { filterRoute, filterTrip });
//     // }

//     return response.data.data;
        
//       } catch (err) {
//         console.error('Database Error:', err);
//         throw new Error('Failed to fetch vehicles.');
//       }
// };

// export async function fetchVehiclesPages(
//   itemsPerPage:number,
//   currentPage: number,
//   filterRoute:string,
//   filterTrip:string
// ) {
//   const offset = (currentPage - 1) * itemsPerPage;
//    try {
//     const params: Record<string, any> = {
//       // 'page[limit]': itemsPerPage, // We only need the count
//       // 'page[offset]': offset,
//     };

//     // Add filters properly
//     if (filterRoute) params['filter[route]'] = filterRoute;
//     if (filterTrip) params['filter[trip]'] = filterTrip;

//     const response = await instance.get('/vehicles', { params });
    
//     // Debug log the actual request URL
    

//     // Get total count - try meta first, then fallback to array length
//     const totalItems = response.data.meta?.total || response.data.data.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage)
//     console.log('from vehicle Request URL:', totalItems);
//     // // Debug logging (optional)
//     // if (process.env.NODE_ENV === 'development') {
//     //   console.debug('API Request:', response.request);
//     //   console.debug('Response Status:', response.status);
//     //   console.debug('total pages:', response.data.data.length);
//     //   console.debug('total pages:', totalPages);
//     //   console.debug('Filter Params:', { filterRoute, filterTrip });
      
//     // }

//     return {
//       totalPages,
//       totalItems
//     };
        
//       } catch (err) {
//         console.error('Database Error:', err);
//         throw new Error('Failed to fetch vehicles.');
//       }
      
// //   try {
// //     const data =  await instance.get('/vehicles')
// //     console.log('total pages ', data.data.data.length)
// //     const totalPages = Math.ceil(Number(data.data.data.length) / itemsPerPage);
// //     const totalItems = data.data.data.length;
// //     console.log('total pages ', totalPages)
// //     return {
// //       totalPages,
// //       totalItems
// //     };
// //   } catch (error) {
// //     console.error('Database Error:', error);
// //     throw new Error('Failed to fetch total number of invoices.');
// //   }
// }

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
    const instance = axios.create({
    headers:{Authorization: AuthStr},
    baseURL: 'https://api-v3.mbta.com',
    timeout: 12000,
  });
    const data = await instance.get(`/routes`)
    const routes = data.data.data
    console.log('routes',routes.length);
    return routes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Routes.');
  }
}

export async function fetchTrip(route: string,date: string): Promise<MBTATrip[]>{
  try {
    const instance = axios.create({
    headers:{Authorization: AuthStr},
    baseURL: 'https://api-v3.mbta.com',
    timeout: 12000,
  });
    const data = await instance.get(`/trips?route=${route}&filter[date]=${date}`)
    const routes = data.data.data
    console.log('trips',routes.length);
    return routes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Trips.');
  }
}

// export async function fetchFilteredVehiclesPages(
//   itemsPerPage:number,
//   currentPage: number,
//   filterRoute:string,
//   filterTrip:string
// ) : Promise<mbtaVehiclesPage>{
//   const instance = axios.create({
//     headers:{Authorization: AuthStr},
//     baseURL: 'https://api-v3.mbta.com',
//     timeout: 6000,
//   });
//   const offset = (currentPage - 1) * itemsPerPage;
//     try {
//     // Build params object dynamically
//     const params: Record<string, any> = {
//       'page[limit]': itemsPerPage,
//       'page[offset]': offset
//     };

//     // Add filters only if they have values
//     if (filterRoute) params['filter[route]'] = filterRoute;
//     if (filterTrip) params['filter[trip]'] = filterTrip;

//     const response = await instance.get('/vehicles', { params });
//     const leghtlast = response.data.links.last;
//     const response2 = await axios.get(leghtlast);
//     const lastbatch = getOffsetFromUrl(leghtlast);
//     const totalItems = response.data.meta?.total || response.data.data.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage)
//     console.log('from filteredpages Request URL:', response.data.links.last);
//     console.log('from filteredpages no2 Request URL:', response2.data.data.length);
//     const allData = response.data.data;
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedData = allData.slice(startIndex, endIndex);
      
//     // Note: For manual pagination with filters, totalItems might be the filtered subset
//     return {
//       data: paginatedData,
//       totalPages: totalPages,
//       totalItems: totalItems
//     };
        
//       } catch (err) {
//         console.error('Database Error:', err);
//         throw new Error('Failed to fetch vehicles.');
//       }
// }

export function coba(term:string){
  console.log('coba',term);
}