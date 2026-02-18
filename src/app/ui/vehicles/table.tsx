import VehiclesStatus from './status';
import Detail from '@/app/vehicles/detail';
import { mbtaVehicle } from '@/app/vehicles/mbtavehicle';

export default async function vehiclesTable({
  // itemsPerPage,
  // currentPage,
  // filterRoute,
  // filterTrip
  vehicles
}: {
  // itemsPerPage: number,
  // currentPage: number;
  // filterRoute: string;
  // filterTrip: string;
  vehicles:mbtaVehicle[]
}) {
  // const vehicles = await fetchFilteredVehicles(itemsPerPage,currentPage,filterRoute,filterTrip)
  // const [showPopup, setShowPopup] = useState(false);

  //    const togglePopup = () => {
  //      setShowPopup(!showPopup);
  //    };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles?.map((vehicle) => (
          <div 
            key={vehicle.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Vehicle Label : {vehicle.attributes.label}</h3>
                <VehiclesStatus status={vehicle.attributes.current_status} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Latitude</p>
                  <p>{vehicle.attributes.latitude}</p>
                </div>
                <div>
                  <p className="text-gray-500">Longitude</p>
                  <p>{vehicle.attributes.longitude}</p>
                </div>
                <div>
                  <p className="text-gray-500">Updated</p>
                  <p>{new Date(vehicle.attributes.updated_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Detail vehicleData={vehicle} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
