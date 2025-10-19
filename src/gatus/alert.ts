import type { AlertingConfiguration } from "./alerting";

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#alerting
 */
export type AlertConfigurationList = Array<AlertConfiguration>

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#alerting
 */
export interface AlertConfiguration {
	/**
	 * Description of the alert. Will be included in the alert sent.
	 * @default ""
	 */
	description?: string

	/**
	 * Whether to enable the alert.
	 * @default true
	 */
	enabled?: boolean

	/**
	 * Number of failures in a row needed before triggering the alert.
	 * @default 3
	 */
	failureThreshold?: number

	/**
	 * Alerting provider configuration override for the given alert type
	 * @default {}
	 */
	providerOverride?: unknown

	/**
	 * Whether to send a notification once a triggered alert is marked as resolved.
	 * @default false
	 */
	sendOnResolved?: boolean

	/**
	 * Number of successes in a row before an ongoing incident is marked as resolved.
	 * @default 2
	 */
	successThreshold?: number

	/**
	 * Type of alert.
	 */
	type: keyof AlertingConfiguration
}
