import type { DayOfWeek } from "./date-time";

export const EVERY_DAY: Array<DayOfWeek> = [];

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#maintenance
 */
export interface MaintenanceConfiguration {
	enabled?: boolean;
	every?: Array<DayOfWeek>;
	duration: string;
	start: string;
	timezone?: string;
}
