import type { Configuration } from "../gatus";
import { EVERY_DAY } from "../gatus";
import { createIsAliveEndpointCfg } from "./utils";

/* no export */ const GROUP_01 = "01 - my-home-dns";
/* no export */ const GROUP_02 = "02 - my-smart-home";

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
