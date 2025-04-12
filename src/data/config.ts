import type { Configuration } from "../gatus";
import { EVERY_DAY } from "../gatus";
import { runtimeEnv } from "./env";
import {
	createEndpointCfgForHetznerStorageShare,
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
			from: runtimeEnv.gatus.alerting.email.from,
			host: runtimeEnv.gatus.alerting.email.host,
			password: runtimeEnv.gatus.alerting.email.password,
			port: 587,
			to: runtimeEnv.gatus.alerting.email.to,
			username: runtimeEnv.gatus.alerting.email.username,
		},
	},
	endpoints: [
		createIsAliveEndpointCfg({ group: GROUP_01, name: "pihole", url: "http://my-home-dns/admin" }),

		createIsAliveEndpointCfg({ group: GROUP_02, name: "cctv-nestbox", url: "http://my-home-cctv-nestbox" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "mqtt", url: "http://my-smart-home:8083" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "nginx", url: "http://my-smart-home" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "node-red", url: "http://my-smart-home:1880/ui" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "zigbee2mqtt", url: "http://my-smart-home:8099" }),

		createEndpointCfgForHetznerStorageShare({
			domain: `${runtimeEnv.domains[".de"].subDomains.nc.name}.${runtimeEnv.domains[".de"].name}`,
			group: GROUP_03,
			name: "nc.@.de",
			storageShareID: runtimeEnv.domains[".de"].subDomains.nc.storageShareID,
		}),

		...createEndpointCfgListForProton({
			domain: runtimeEnv.domains[".de"].name,
			domainKey: runtimeEnv.domains[".de"].protonDomainKey,
			group: GROUP_03,
			name: "@.de",
		}),

		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains[".de"].name,
			group: GROUP_03,
			name: "ch.@.de",
			subDomain: runtimeEnv.domains[".de"].subDomains.ch.name,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains[".de"].name,
			group: GROUP_03,
			name: "sa.@.de",
			subDomain: runtimeEnv.domains[".de"].subDomains.sa.name,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_03,
			name: "@.me",
			subDomain: undefined,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_03,
			name: "ch.@.me",
			subDomain: runtimeEnv.domains[".me"].subDomains.ch.name,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_03,
			name: "fa.@.me",
			subDomain: runtimeEnv.domains[".me"].subDomains.fam.name,
		}),
		...createEndpointCfgListForSimpleLogin({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_03,
			name: "sa.@.me",
			subDomain: runtimeEnv.domains[".me"].subDomains.sa.name,
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
