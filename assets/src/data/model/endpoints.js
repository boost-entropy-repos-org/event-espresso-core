/**
 * External imports
 */
import { data } from '@eventespresso/eejs';

/**
 * Internal imports
 */
import { assertEntityHasKey } from './assertions';

/**
 * All available endpoints exposed via the eejs.data global from the server.
 *
 * @type {{}}
 */
export const {
	collection_endpoints: endpoints = {},
	base_rest_route: baseRestRoute,
} = data.paths;

/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {Exception}
 */
export const getEndpoint = (modelName) => {
	assertEntityHasKey(modelName, endpoints);
	return endpoints[modelName];
};

/**
 * Applies the provided queryString to the endpoint for the provided model name.
 *
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */
export const applyQueryString = (modelName, queryString = '') => {
	return queryString !== ''
		? getEndpoint(modelName) + '?' + queryString
		: getEndpoint(modelName);
};

/**
 * Strips the base_rest_route (i.e. https://myurl.com/wp-json/) from the provided
 * url string.
 *
 * @param {string} url
 * @return {string} the url with the base rest route removed.
 */
export const stripBaseRouteFromUrl = (url) => {
	return url.replace(baseRestRoute, '');
};
