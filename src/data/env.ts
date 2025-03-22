import type { ScreamingSnakeCase }from "type-fest";

/* no export */ type RuntimeEnvValue = `\${${ScreamingSnakeCase<string>}}`;
/* no export */ interface RuntimeEnv {
	readonly [key: string]: RuntimeEnvValue | RuntimeEnv
}

/**
 * ☝️ Needs to be _manually_ kept in sync with all envs defined in `Dockerfile`.
 */
export const runtimeEnv = {
	alerting: {
		email: {
			from: "${ALERTING_EMAIL_FROM}",
			host: "${ALERTING_EMAIL_HOST}",
			password: "${ALERTING_EMAIL_PASSWORD}",
			to: "${ALERTING_EMAIL_TO}",
			username: "${ALERTING_EMAIL_USERNAME}",
		},
	},
	domains: {
		"01": {
			domain: "${DOMAIN_01}",
			subdomains: {
				"01": "${DOMAIN_01_SUBDOMAIN_01}",
				"02": "${DOMAIN_01_SUBDOMAIN_02}",
			},
		},
		"02": {
			domain: "${DOMAIN_02}",
			subdomains: {
				"01": "${DOMAIN_02_SUBDOMAIN_01}",
				"02": "${DOMAIN_02_SUBDOMAIN_02}",
				"03": "${DOMAIN_02_SUBDOMAIN_03}",
			},
		},
	},
	proton: {
		domainKey: "${PROTON_DOMAINKEY}",
	},
} as const satisfies RuntimeEnv;
