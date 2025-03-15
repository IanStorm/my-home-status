/**
 * 🔗 https://github.com/TwiN/gatus?tab=readme-ov-file#storage
 */
export type StorageConfiguration =
	| {
		type: "memory";
	} | {
		caching?: boolean;
		path?: string;
		type: "postgres" | "sqlite";
	}
;
