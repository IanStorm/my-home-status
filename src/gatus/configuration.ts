import type { AlertingConfiguration } from "./alerting";
import type { EndpointConfigurationList } from "./endpoints";
import type { MaintenanceConfiguration } from "./maintenance";
import type { StorageConfiguration } from "./storage";

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#configuration
 */
export interface Configuration {
	alerting?: AlertingConfiguration;
	disableMonitoringLock?: unknown;
	endpoints: EndpointConfigurationList;
	externalEndpoints?: unknown;
	maintenance?: MaintenanceConfiguration;
	metrics?: unknown;
	security?: unknown;
	skipInvalidConfigUpdate?: unknown;
	storage?: StorageConfiguration;
	ui?: unknown;
	web?: unknown;
}
