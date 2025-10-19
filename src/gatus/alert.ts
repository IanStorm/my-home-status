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
	 * Minimum time interval between alert reminders.
	 * E.g. "30m", "1h45m30s" or "24h". If empty or 0, reminders are disabled.
	 * Cannot be lower than 5m.
	 * @default 0
	 */
	minimumReminderInterval?: string | number

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
