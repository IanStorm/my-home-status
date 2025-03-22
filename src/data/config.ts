import type { Configuration } from "../gatus";
import { EVERY_DAY } from "../gatus";
import { runtimeEnv } from "./env";
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
			from: runtimeEnv.alerting.email.from,
			host: runtimeEnv.alerting.email.host,
			password: runtimeEnv.alerting.email.password,
			port: 587,
			to: runtimeEnv.alerting.email.to,
			username: runtimeEnv.alerting.email.username,
		},
	},
	endpoints: [
		createIsAliveEndpointCfg({ group: GROUP_01, name: "pihole", url: "http://my-home-dns/admin" }),

		createIsAliveEndpointCfg({ group: GROUP_02, name: "cctv-nestbox", url: "http://my-home-cctv-nestbox" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "mqtt", url: "http://my-smart-home:8083" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "nginx", url: "http://my-smart-home" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "node-red", url: "http://my-smart-home:1880/ui" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "zigbee2mqtt", url: "http://my-smart-home:8099" }),

		...createEndpointCfgListForProton({
			domain: runtimeEnv.domains["01"].domain,
			domainKey: runtimeEnv.proton.domainKey,
			group: GROUP_03,
			name: "@.de",
		}),

		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains["01"].domain,
			group: GROUP_03,
			name: "ch.@.de",
			subDomain: runtimeEnv.domains["01"].subdomains["01"],
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains["01"].domain,
			group: GROUP_03,
			name: "sa.@.de",
			subDomain: runtimeEnv.domains["01"].subdomains["02"],
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains["02"].domain,
			group: GROUP_03,
			name: "@.me",
			subDomain: undefined,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains["02"].domain,
			group: GROUP_03,
			name: "ch.@.me",
			subDomain: runtimeEnv.domains["02"].subdomains["01"],
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains["02"].domain,
			group: GROUP_03,
			name: "fa.@.me",
			subDomain: runtimeEnv.domains["02"].subdomains["02"],
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains["02"].domain,
			group: GROUP_03,
			name: "sa.@.me",
			subDomain: runtimeEnv.domains["02"].subdomains["03"],
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
