import type { AlertConfigurationList } from "./alert";

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#conditions
 */
export type ConditionComparison =
	| "=="
	| "<"
	| "<="
	| ">"
;

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#placeholders
 */
export type ConditionPlaceholder =
	| "BODY"
	| "CONNECTED"
	| "CERTIFICATE_EXPIRATION"
	| "DNS_RCODE"
	| "DOMAIN_EXPIRATION"
	| "IP"
	| "RESPONSE_TIME"
	| "STATUS"
;

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#conditions
 */
export type EndpointConditionList = Array<EndpointCondition>;

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#conditions
 */
export type EndpointCondition = `[${ConditionPlaceholder}] ${ConditionComparison} ${string}`;

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#endpoints
 */
export type EndpointConfigurationList = Array<EndpointConfiguration>;

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#endpoints
 */
export interface EndpointConfiguration {
	alerts?: AlertConfigurationList
	body?: unknown
	client?: unknown
	conditions: EndpointConditionList
	dns?: unknown
	enabled?: boolean
	graphql?: unknown
	group?: string
	headers?: unknown
	interval?: string
	maintenanceWindows?: unknown
	method?: unknown
	name: string
	ssh?: unknown
	ui?: unknown
	url: string
}
