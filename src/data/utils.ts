import type { EndpointConfiguration, EndpointConfigurationList } from "../gatus";

/* no export */ const CLOUDFLARE_DNS_URL = "1.1.1.1";

const createDNSLookupEndpointCfg: (
	opts: Readonly<Required<Pick<EndpointConfiguration, "conditions" | "dns" | "group" | "name">>>
) => EndpointConfiguration = ({ conditions, dns, group, name }) => ({
	alerts: [{ type: "email" }],
	conditions: [
		"[DNS_RCODE] == NOERROR",
		...conditions,
	],
	dns,
	group,
	interval: "1h",
	name,
	url: CLOUDFLARE_DNS_URL,
});

export const createEndpointCfgForHetznerStorageShare: (
	opts: Readonly<{
		domain: string
		storageShareID: string
	}> & Required<Pick<EndpointConfiguration, "group" | "name">>
) => EndpointConfiguration = ({ domain, group, name, storageShareID }) =>
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == nx${storageShareID}.your-storageshare.de.`],
		dns: { queryName: domain, queryType: "CNAME" },
		group,
		name: `CNAME ${name}`,
	})
;

export const createEndpointCfgListForProton: (
	opts: Readonly<{
		domain: string
		domainKey: string
	} & Required<Pick<EndpointConfiguration, "group" | "name">>>
) => EndpointConfigurationList = ({ domain, domainKey, group, name }) => [
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == protonmail.domainkey.${domainKey}.domains.proton.ch.`],
		dns: { queryName: `protonmail._domainkey.${domain}`, queryType: "CNAME" },
		group,
		name: `CNAME ${name} 1`,
	}),
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == protonmail2.domainkey.${domainKey}.domains.proton.ch.`],
		dns: { queryName: `protonmail2._domainkey.${domain}`, queryType: "CNAME" },
		group,
		name: `CNAME ${name} 2`,
	}),
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == protonmail3.domainkey.${domainKey}.domains.proton.ch.`],
		dns: { queryName: `protonmail3._domainkey.${domain}`, queryType: "CNAME" },
		group,
		name: `CNAME ${name} 3`,
	}),

	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == any(mail.protonmail.ch.,mailsec.protonmail.ch.)"],
		dns: { queryName: domain, queryType: "MX" },
		group,
		name: `MX ${name}`,
	}),

	// TODO: TXT
];

export const createEndpointCfgListForSimpleLogin: (
	opts: Readonly<{
		domain: string
		subDomain?: string
	} & Required<Pick<EndpointConfiguration, "group" | "name">>>
) => EndpointConfigurationList = ({ domain, group, name, subDomain }) => [
	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == dkim._domainkey.simplelogin.co."],
		dns: { queryName: `dkim._domainkey.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `CNAME ${name} 1`,
	}),
	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == dkim02._domainkey.simplelogin.co."],
		dns: { queryName: `dkim02._domainkey.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `CNAME ${name} 2`,
	}),
	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == dkim03._domainkey.simplelogin.co."],
		dns: { queryName: `dkim03._domainkey.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `CNAME ${name} 3`,
	}),

	subDomain
		? createDNSLookupEndpointCfg({
			conditions: ["[BODY] == any(mx1.simplelogin.co.,mx2.simplelogin.co.)"],
			dns: { queryName: `${subDomain}.${domain}`, queryType: "MX" },
			group,
			name: `MX ${name}`,
		})
		: undefined,

	// TODO: TXT
].filter((c) => c !== undefined);

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
