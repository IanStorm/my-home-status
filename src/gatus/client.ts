/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#client-configuration
 */
export interface ClientConfiguration {
	/**
	 * Override the DNS resolver using the format `{proto}://{host}:{port}`.
	 * @default ""
	 */
	dnsResolver?: string

	/**
	 * Google Identity-Aware-Proxy client configuration.
	 * @default {}
	 */
	identityAwareProxy?: unknown

	/**
	 * Whether to ignore redirects (true) or follow them (false, default).
	 * @default false
	 */
	ignoreRedirect?: boolean

	/**
	 * Whether to skip verifying the server's certificate chain and host name.
	 * @default false
	 */
	insecure?: boolean

	/**
	 * The network to use for ICMP endpoint client (ip, ip4 or ip6).
	 */
	network?: "ip" | "ip4" | "ip6"

	/**
	 * OAuth2 client configuration.
	 * @default {}
	 */
	oauth2?: OAuth2ClientConfiguration

	/**
	 * The URL of the proxy to use for the client
	 * @default ""
	 */
	proxyUrl?: string

	/**
	 * Duration before timing out.
	 * @default 10s
	 */
	timeout?: number | string

	tls?: unknown

	/**
	 * Name of the SSH tunnel to use for this endpoint. See Tunneling.
	 */
	tunnel?: string
}

/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#client-configuration
 */
export interface OAuth2ClientConfiguration {
	/**
	 * The client id which should be used for the `Client credentials flow`
	 */
	clientId: string

	/**
	 * The client secret which should be used for the `Client credentials flow`
	 */
	clientSecret: string

	/**
	 * A list of `scopes` which should be used for the `Client credentials flow`.
	 */
	scopes: Array<string>

	/**
	 * The token endpoint URL
	 */
	tokenUrl: string
}
