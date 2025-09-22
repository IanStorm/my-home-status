import type { Configuration } from "../gatus";
import { EVERY_DAY } from "../gatus";
import { runtimeEnv } from "./env";
import {
	createEndpointCfgForHetznerStorageShare,
	createEndpointCfgListForMigadu,
	createEndpointCfgListForProton,
	createIsAliveEndpointCfg,
} from "./utils";

/* no export */ const GROUP_01 = "01 - my-home-dns";
/* no export */ const GROUP_02 = "02 - my-smart-home";
/* no export */ const GROUP_03 = "03 - .de domain";
/* no export */ const GROUP_04 = "04 - .me domain";

export const myGatusConfig: Configuration = {
	alerting: {
		email: {
			from: runtimeEnv.gatus.alerting.email.from,
			host: runtimeEnv.gatus.alerting.email.host,
			password: runtimeEnv.gatus.alerting.email.password,
			port: runtimeEnv.gatus.alerting.email.port,
			to: runtimeEnv.gatus.alerting.email.to,
			username: runtimeEnv.gatus.alerting.email.username,
		},
	},
	endpoints: [
		createIsAliveEndpointCfg({ group: GROUP_01, name: "pihole (ping)", url: "http://my-home-dns/admin" }),

		createIsAliveEndpointCfg({ group: GROUP_02, name: "cctv-nestbox (ping)", url: "http://my-home-cctv-nestbox" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "mqtt (ping)", url: "http://my-smart-home:8083" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "nginx (ping)", url: "http://my-smart-home" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "node-red (ping)", url: "http://my-smart-home:1880/ui" }),
		createIsAliveEndpointCfg({ group: GROUP_02, name: "zigbee2mqtt (ping)", url: "http://my-smart-home:8099" }),

		createIsAliveEndpointCfg({
			group: GROUP_03,
			name: "nc.@.de (ping)",
			url: `https://${runtimeEnv.domains[".de"].subDomains.nc.name}.${runtimeEnv.domains[".de"].name}`,
		}),
		createEndpointCfgForHetznerStorageShare({
			domain: `${runtimeEnv.domains[".de"].subDomains.nc.name}.${runtimeEnv.domains[".de"].name}`,
			group: GROUP_03,
			name: "nc.@.de (DNS)",
			storageShareID: runtimeEnv.domains[".de"].subDomains.nc.storageShareID,
		}),
		...createEndpointCfgListForProton({
			domain: runtimeEnv.domains[".de"].name,
			domainKey: runtimeEnv.domains[".de"].protonDomainKey,
			group: GROUP_03,
			name: "@.de (DNS)",
		}),
		...createEndpointCfgListForProton({
			domain: `${runtimeEnv.domains[".de"].subDomains.nr.name}.${runtimeEnv.domains[".de"].name}`,
			domainKey: runtimeEnv.domains[".de"].subDomains.nr.protonDomainKey,
			group: GROUP_03,
			name: "nr.@.de (DNS)",
		}),
		...createEndpointCfgListForMigadu({
			domain: runtimeEnv.domains[".de"].name,
			group: GROUP_03,
			name: "ch.@.de (DNS)",
			subDomain: runtimeEnv.domains[".de"].subDomains.ch.name,
		}),
		...createEndpointCfgListForMigadu({
			domain: runtimeEnv.domains[".de"].name,
			group: GROUP_03,
			name: "sa.@.de (DNS)",
			subDomain: runtimeEnv.domains[".de"].subDomains.sa.name,
		}),

		...createEndpointCfgListForMigadu({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_04,
			name: "ch.@.me (DNS)",
			subDomain: runtimeEnv.domains[".me"].subDomains.ch.name,
		}),
		...createEndpointCfgListForMigadu({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_04,
			name: "fam.@.me (DNS)",
			subDomain: runtimeEnv.domains[".me"].subDomains.fam.name,
		}),
		...createEndpointCfgListForMigadu({
			domain: runtimeEnv.domains[".me"].name,
			group: GROUP_04,
			name: "sa.@.me (DNS)",
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
