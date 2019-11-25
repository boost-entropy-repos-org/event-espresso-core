<?php

namespace EventEspresso\core\domain\services\graphql\inputs;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\inputs\InputBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;

/**
 * Class TicketsConnectionOrderbyInput
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\inputs
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class TicketsConnectionOrderbyInput extends InputBase
{

    /**
     * TicketsConnectionOrderbyInput constructor.
     */
    public function __construct()
    {
        $this->setName('TicketsConnectionOrderbyInput');
        $this->setDescription(esc_html__('Options for ordering the connection', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    protected function getFields()
    {
        return [
            new GraphQLField(
                'field',
                ['non_null' => 'TicketsConnectionOrderbyEnum']
            ),
            new GraphQLField(
                'order',
                'OrderEnum'
            ),
        ];
    }
}