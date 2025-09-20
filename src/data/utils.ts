import type { AlertConfiguration, EndpointConfiguration, EndpointConfigurationList } from "../gatus";

/* no export */ const CLOUDFLARE_DNS_URL = "1.1.1.1";

/* no export */ const EMAIL_ALERT: AlertConfiguration = { sendOnResolved: true, type: "email" };

const createDNSLookupEndpointCfg: (
	opts: Readonly<Required<Pick<EndpointConfiguration, "conditions" | "dns" | "group" | "name">>>
) => EndpointConfiguration = ({ conditions, dns, group, name }) => ({
	alerts: [EMAIL_ALERT],
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
		name: `${name} CNAME`,
	})
;

export const createEndpointCfgListForMigadu: (
	opts: Readonly<{
		domain: string
		subDomain?: string
	} & Required<Pick<EndpointConfiguration, "group" | "name">>>
) => EndpointConfigurationList = ({ domain, group, name, subDomain }) => [
	// TODO: 1x verification via TXT

	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == any(aspmx1.migadu.com.,aspmx2.migadu.com.)"],
		dns: { queryName: `${subDomain ? subDomain + "." : ""}${domain}`, queryType: "MX" },
		group,
		name: `${name} MX`,
	}),

	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == key1.${subDomain ? subDomain + "." : ""}${domain}._domainkey.migadu.com.`],
		dns: { queryName: `key1._domainkey.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `${name} DKIM+ARC 1`,
	}),
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == key2.${subDomain ? subDomain + "." : ""}${domain}._domainkey.migadu.com.`],
		dns: { queryName: `key2._domainkey.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `${name} DKIM+ARC 2`,
	}),
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == key3.${subDomain ? subDomain + "." : ""}${domain}._domainkey.migadu.com.`],
		dns: { queryName: `key3._domainkey.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `${name} DKIM+ARC 3`,
	}),

	// TODO: 1x SPF via TXT

	// TODO: 1x DMARC via TXT

	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == autoconfig.migadu.com."],
		dns: { queryName: `autoconfig.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "CNAME" },
		group,
		name: `${name} autoconfig/autodiscovery 1`,
	}),
	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == autodiscover.migadu.com.:443"],
		dns: { queryName: `_autodiscover._tcp.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "SRV" },
		group,
		name: `${name} autoconfig/autodiscovery 2`,
	}),
	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == smtp.migadu.com.:465"],
		dns: { queryName: `_submissions._tcp.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "SRV" },
		group,
		name: `${name} SMTP`,
	}),
	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == imap.migadu.com.:993"],
		dns: { queryName: `_imaps._tcp.${subDomain ? subDomain + "." : ""}${domain}`, queryType: "SRV" },
		group,
		name: `${name} IMAP`,
	}),
];

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
		name: `${name} CNAME 1`,
	}),
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == protonmail2.domainkey.${domainKey}.domains.proton.ch.`],
		dns: { queryName: `protonmail2._domainkey.${domain}`, queryType: "CNAME" },
		group,
		name: `${name} CNAME 2`,
	}),
	createDNSLookupEndpointCfg({
		conditions: [`[BODY] == protonmail3.domainkey.${domainKey}.domains.proton.ch.`],
		dns: { queryName: `protonmail3._domainkey.${domain}`, queryType: "CNAME" },
		group,
		name: `${name} CNAME 3`,
	}),

	createDNSLookupEndpointCfg({
		conditions: ["[BODY] == any(mail.protonmail.ch.,mailsec.protonmail.ch.)"],
		dns: { queryName: domain, queryType: "MX" },
		group,
		name: `${name} MX`,
	}),

	// TODO: TXT
];

export const createIsAliveEndpointCfg: (
	opts: Readonly<Pick<EndpointConfiguration, "group" | "name" | "url">>
) => EndpointConfiguration = ({ group, name, url }) => ({
	alerts: [EMAIL_ALERT],
	conditions: [
		"[CONNECTED] == true",
		"[STATUS] <= 299",
	],
	group,
	interval: "5m",
	name,
	url,
});
