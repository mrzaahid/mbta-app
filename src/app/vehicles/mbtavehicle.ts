// types/mbta.ts

export type Carriage = {
  label: string;
  occupancy_status: string;
  occupancy_percentage: number | null;
};

export type VehicleAttributes = {
  bearing: number;
  carriages: Carriage[];
  current_status: string;
  current_stop_sequence: number;
  direction_id: number;
  label: string;
  latitude: number;
  longitude: number;
  occupancy_status: string | null;
  revenue: string;
  speed: number;
  updated_at: string; // or Date if parsed
};

export type RelationshipData = {
  id: string;
  type: string;
};

export type VehicleRelationships = {
  route: {
    data: RelationshipData;
  };
  stop: {
    data: RelationshipData | null;
  };
  trip: {
    data: RelationshipData | null;
  };
};

export type mbtaVehicle = {
  attributes: VehicleAttributes;
  id: string;
  links: {
    self: string;
  };
  relationships: VehicleRelationships;
  type: 'vehicle';
};

export type mbtaVehicleResponse = {
  data: mbtaVehicle[];
  version : string;
  links :{
    first : string | null;
    last : string | null;
    next : string | null;
    prev : string | null;
  }
}

export type mbtaVehiclesPage = {
  data: mbtaVehicle[];
  totalPages: number;
  totalItems: number
}