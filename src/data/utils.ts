import type { EndpointConfiguration } from "../gatus";

export const createIsAliveEndpointCfg: (
	opts: Readonly<Pick<EndpointConfiguration, "group" | "name" | "url">>
) => EndpointConfiguration = ({ group, name, url }) => ({
	alerts: [{ type: "email" }],
	conditions: [
		"[CONNECTED] == true",
		"[STATUS] <= 299",
	],
	group,
	interval: "5m",
	name,
	url,
});
