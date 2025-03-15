import type { Configuration } from "../gatus";
import { EVERY_DAY } from "../gatus";
import {
	createEndpointCfgListForProton,
	createEndpointCfgListForSimpleLogin,
	createIsAliveEndpointCfg,
} from "./utils";

/* no export */ const GROUP_01 = "01 - my-home-dns";
/* no export */ const GROUP_02 = "02 - my-smart-home";
/* no export */ const GROUP_03 = "03 - domains";

export const myGatusConfig: Configuration = {
	alerting: {
		email: {
			from: "${ALERTING_EMAIL_FROM}",
			host: "${ALERTING_EMAIL_HOST",
			password: "${ALERTING_EMAIL_PASSWORD}",
			port: 587,
			to: "${ALERTING_EMAIL_TO}",
			username: "${ALERTING_EMAIL_USERNAME}",
		},
	},
	endpoints: [
		createIsAliveEndpointCfg({ group: GROUP_01, name: "pihole", url: "http://my-home-dns/admin" }),

		createIsAliveEndpointCfg({ group: GROUP_02, name: "mqtt", url: "http://my-smart-home:8083" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "node-red", url: "http://my-smart-home:1880/ui" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "zigbee2mqtt", url: "http://my-smart-home:8099" }),

		...createEndpointCfgListForProton({
			domain: "${DOMAIN_01}",
			domainKey: "${PROTON_DOMAINKEY}",
			group: GROUP_03,
			name: "@.de",
		}),

		...createEndpointCfgListForSimpleLogin({
			domain: "${DOMAIN_01}",
			group: GROUP_03,
			name: "ch.@.de",
			subDomain: "${DOMAIN_01_SUBDOMAIN_01}",
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: "${DOMAIN_01}",
			group: GROUP_03,
			name: "sa.@.de",
			subDomain: "${DOMAIN_01_SUBDOMAIN_02}",
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: "${DOMAIN_02}",
			group: GROUP_03,
			name: "@.me",
			subDomain: undefined,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: "${DOMAIN_02}",
			group: GROUP_03,
			name: "ch.@.me",
			subDomain: "${DOMAIN_02_SUBDOMAIN_01}",
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: "${DOMAIN_02}",
			group: GROUP_03,
			name: "fa.@.me",
			subDomain: "${DOMAIN_02_SUBDOMAIN_02}",
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: "${DOMAIN_02}",
			group: GROUP_03,
			name: "sa.@.me",
			subDomain: "${DOMAIN_02_SUBDOMAIN_03}",
		}),
	],
	maintenance: {
		duration: "1h",
		every: EVERY_DAY,
		start: "02:45",
		timezone: "Europe/Berlin",
	},
	storage: {
		type: "memory",
	},
};
