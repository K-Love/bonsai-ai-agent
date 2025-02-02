export interface HealthMetrics {
    soilMoisture: number;  // percentage
    leafColor: string;     // hex color or description
    trunkHealth: string;   // description
    pestPresence: boolean;
    lastInspection: Date;
}

export interface CareEvent {
    date: Date;
    type: 'watering' | 'pruning' | 'fertilizing' | 'repotting' | 'treatment';
    description: string;
    performer: string;
    outcome?: string;
}

export interface BonsaiData {
    species: string;
    age: number;
    health: HealthMetrics;
    careHistory: CareEvent[];
    acquisitionDate: Date;
    lastMaintenanceDate: Date;
}