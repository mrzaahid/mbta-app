import axios from 'axios';
import { mbtaVehicle } from '@/app/vehicles/mbtavehicle';


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
) : Promise<mbtaVehicle[]>{
  const offset = (currentPage - 1) * itemsPerPage;
  try {
        const response = await instance.get('/vehicles',{
            params: {
            'page[limit]': itemsPerPage,
            'page[offset]': offset
        },
        });
        
        console.log('p','masuk')
        console.log('data',response.data.status)
        return response.data.data;
      } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch vehicles.');
      }
};

export async function fetchVehiclesPages(itemsPerPage : number) {
  try {
    const data =  await instance.get('/vehicles')
    console.log('total pages ', data.data.data.length)
    const totalPages = Math.ceil(Number(data.data.data.length) / itemsPerPage);
    const totalItems = data.data.data.length;
    console.log('total pages ', totalPages)
    return {
      totalPages,
      totalItems
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchVehicleById(id:string) {
  try {
    const data = await instance.get(`/vehicles/${id}`)
    const vehicle = data.data.data
    return vehicle;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}