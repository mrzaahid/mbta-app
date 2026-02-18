/**
 * Represents a single trip from the MBTA V3 API.
 */
export interface MBTATrip {
  id: string;
  type: "trip";
  links: {
    self: string;
  };
  attributes: MBTATripAttributes;
  relationships: MBTATripRelationships;
}

/**
 * Specific details/metadata about the trip.
 */
interface MBTATripAttributes {
  bikes_allowed: number; // 0 = No, 1 = Yes
  block_id: string;
  direction_id: number;  // 0 or 1
  headsign: string;
  name: string;
  revenue: "REVENUE" | "NON_REVENUE";
  wheelchair_accessible: number; // 0 = No, 1 = Yes
}

/**
 * References to related MBTA resources.
 */
interface MBTATripRelationships {
  route: MBTARelationshipData;
  route_pattern: MBTARelationshipData;
  service: MBTARelationshipData;
  shape: MBTARelationshipData;
}

/**
 * Generic container for API relationship references.
 */
interface MBTARelationshipData {
  data: {
    id: string;
    type: string;
  } | null;
}