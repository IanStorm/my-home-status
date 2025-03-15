import fse from "fs-extra";
import _ from "lodash";
import * as Yaml from "yaml";

import { myGatusConfig } from "./data";

/**
 * 🔗 https://stackoverflow.com/a/39126851/6694769
 */
const mapKeysDeep = <T extends object>(object: T, iteratee: (key: string) => string) => {
	return _.transform(object, (result, curVal, curKey) => {
		const key = _.isString(curKey) ? iteratee(curKey) : curKey;
		const value = _.isObject(curVal) ? mapKeysDeep(curVal, iteratee): curVal;
		if (_.isObject(result)) {
			Object.assign(result, { [key]: value });
		} else {
			throw new Error("Unexpected type encountered for `result`");
		}
	});
};

const camelConfig = myGatusConfig;
const kebabConfig = mapKeysDeep(camelConfig, (key) => _.kebabCase(key));

const yaml = Yaml.stringify(kebabConfig);
/* no await */ fse.writeFile("./alpine-root/config/config.yaml", yaml, { encoding: "utf-8" });
