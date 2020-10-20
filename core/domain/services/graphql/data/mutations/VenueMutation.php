<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

/**
 * Class VenueMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class VenueMutation
{

    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array  $input         Data coming from the GraphQL mutation query input
     * @param string $mutation_name Name of the mutation being performed
     * @return array
     */
    public static function prepareFields(array $input, $mutation_name)
    {

        $args = [];

        if (! empty($input['name'])) {
            $args['VNU_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['description'])) {
            $args['VNU_desc'] = wp_kses_post($input['description']);
        }

        if (! empty($input['shortDescription'])) {
            $args['VNU_short_desc'] = sanitize_text_field($input['shortDescription']);
        }

        if (! empty($input['identifier'])) {
            $args['VNU_identifier'] = sanitize_title($input['identifier']);
        }

        if (! empty($input['created'])) {
            $args['VNU_created'] = new DateTime(sanitize_text_field($input['created']));
        }

        if (! empty($input['order'])) {
            $args['VNU_order'] = absint($input['order']);
        }

        if (! empty($input['wpUser'])) {
            $args['VNU_wp_user'] = absint($input['wpUser']);
        }

        if (! empty($input['address'])) {
            $args['VNU_address'] = sanitize_text_field($input['address']);
        }

        if (! empty($input['address2'])) {
            $args['VNU_address2'] = sanitize_text_field($input['address2']);
        }

        if (! empty($input['city'])) {
            $args['VNU_city'] = sanitize_text_field($input['city']);
        }

        if (! empty($input['state'])) {
            $args['STA_ID'] = absint($input['state']);
        }

        if (! empty($input['country'])) {
            $args['CNT_ISO'] = sanitize_text_field($input['country']);
        }

        if (! empty($input['zip'])) {
            $args['VNU_zip'] = sanitize_text_field($input['zip']);
        }

        if (! empty($input['capacity'])) {
            $args['VNU_capacity'] = absint($input['capacity']);
        }

        if (! empty($input['phone'])) {
            $args['VNU_phone'] = sanitize_text_field($input['phone']);
        }

        if (! empty($input['virtualPhone'])) {
            $args['VNU_virtual_phone'] = sanitize_text_field($input['virtualPhone']);
        }

        if (! empty($input['url'])) {
            $args['VNU_url'] = sanitize_text_field($input['url']);
        }

        if (! empty($input['virtualUrl'])) {
            $args['VNU_virtual_url'] = sanitize_text_field($input['virtualUrl']);
        }

        if (! empty($input['googleMapLink'])) {
            $args['VNU_google_map_link'] = sanitize_text_field($input['googleMapLink']);
        }

        if (! empty($input['enableForGmap'])) {
            $args['VNU_enable_for_gmap'] = (bool) $input['enableForGmap'];
        }

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_data_mutations__venue_args',
            $args,
            $input
        );
    }
}
