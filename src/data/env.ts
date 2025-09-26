import type { ScreamingSnakeCase }from "type-fest";

/* no export */ type RuntimeEnvValue = `\${${ScreamingSnakeCase<string>}}`;
/* no export */ interface RuntimeEnv {
	readonly [key: string]: RuntimeEnvValue | RuntimeEnv
}

/**
 * ☝️ Needs to be _manually_ kept in sync with all envs defined in `Dockerfile`.
 */
export const runtimeEnv = {
	domains: {
		".de": {
			migaduVerify: "${DOMAINS_DE_MIGADUVERIFY}",
			name: "${DOMAINS_DE_NAME}",
			subDomains: {
				ch: {
					migaduVerify: "${DOMAINS_DE_SUBDOMAINS_CH_MIGADUVERIFY}",
					name: "${DOMAINS_DE_SUBDOMAINS_CH_NAME}",
				},
				"nc": {
					name: "${DOMAINS_DE_SUBDOMAINS_NC_NAME}",
					storageShareID: "${DOMAINS_DE_SUBDOMAINS_NC_STORAGESHAREID}",
				},
				nr: {
					migaduVerify: "${DOMAINS_DE_SUBDOMAINS_NR_MIGADUVERIFY}",
					name: "${DOMAINS_DE_SUBDOMAINS_NR_NAME}",
				},
				sa: {
					migaduVerify: "${DOMAINS_DE_SUBDOMAINS_SA_MIGADUVERIFY}",
					name: "${DOMAINS_DE_SUBDOMAINS_SA_NAME}",
				},
			},
		},
		".me": {
			name: "${DOMAINS_ME_NAME}",
			subDomains: {
				ch: {
					migaduVerify: "${DOMAINS_ME_SUBDOMAINS_CH_MIGADUVERIFY}",
					name: "${DOMAINS_ME_SUBDOMAINS_CH_NAME}",
				},
				fam: {
					migaduVerify: "${DOMAINS_ME_SUBDOMAINS_FAM_MIGADUVERIFY}",
					name: "${DOMAINS_ME_SUBDOMAINS_FAM_NAME}",
				},
				sa: {
					migaduVerify: "${DOMAINS_ME_SUBDOMAINS_SA_MIGADUVERIFY}",
					name: "${DOMAINS_ME_SUBDOMAINS_SA_NAME}",
				},
			},
		},
	},
	gatus: {
		alerting: {
			email: {
				from: "${GATUS_ALERTING_EMAIL_FROM}",
				host: "${GATUS_ALERTING_EMAIL_HOST}",
				password: "${GATUS_ALERTING_EMAIL_PASSWORD}",
				port: "${GATUS_ALERTING_EMAIL_PORT}",
				to: "${GATUS_ALERTING_EMAIL_TO}",
				username: "${GATUS_ALERTING_EMAIL_USERNAME}",
			},
		},
	},
} as const satisfies RuntimeEnv;
