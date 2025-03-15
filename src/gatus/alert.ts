import type { AlertingConfiguration } from "./alerting";

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#alerting
 */
export type AlertConfigurationList = Array<AlertConfiguration>

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#alerting
 */
export interface AlertConfiguration {
	description?: string
	enabled?: boolean
	failureThreshold?: number
	providerOverride?: unknown
	sendOnResolved?: boolean
	successThreshold?: number
	type: keyof AlertingConfiguration
}
