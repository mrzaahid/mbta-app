// types/mbta.ts

export type RouteDirection = {
  destinations: [string, string];
  names: [string, string];
};

export type RouteAttributes = {
  color: string; // Hex color without #
  description: string;
  direction_destinations: [string, string];
  direction_names: [string, string];
  fare_class: string;
  long_name: string;
  short_name: string;
  sort_order: number;
  text_color: string; // Hex color without #
  type: 0 | 1 | 2 | 3 | 4; // 0: Light Rail, 1: Heavy Rail, 2: Commuter Rail, 3: Bus, 4: Ferry
};

export type RelationshipData = {
  id: string;
  type: string;
};

export type RouteRelationships = {
  agency: {
    data: RelationshipData;
  };
  line: {
    data: RelationshipData;
  };
};

export type MBTARoute = {
  attributes: RouteAttributes;
  id: string;
  links: {
    self: string;
  };
  relationships: RouteRelationships;
  type: 'route';
};