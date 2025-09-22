/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#alerting
 */
export interface AlertingConfiguration {
	awsses?: unknown;
	custom?: unknown;
	discord?: unknown;
	email?: EmailAlertingConfiguration;
	gitea?: unknown;
	github?: unknown;
	gitlab?: unknown;
	googlechat?: unknown;
	gotify?: unknown;
	incidentIo?: unknown;
	jetbrainsspace?: unknown;
	matrix?: unknown;
	mattermost?: unknown;
	messagebird?: unknown;
	ntfy?: unknown;
	opsgenie?: unknown;
	pagerduty?: unknown;
	pushover?: unknown;
	slack?: unknown;
	teams?: unknown;
	teamsWorkflows?: unknown;
	telegram?: unknown;
	twilio?: unknown;
	zulip?: unknown;
}

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#configuring-email-alerts
 */
export interface EmailAlertingConfiguration {
	client?: {
		insecure?: boolean;
	};
	defaultAlert?: unknown;
	from: string;
	host: string;
	overrides?: unknown;
	password?: string;
	port: number | string;
	to: string;
	username?: string;
}
