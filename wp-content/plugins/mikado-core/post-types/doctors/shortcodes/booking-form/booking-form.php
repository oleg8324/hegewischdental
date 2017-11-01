<?php

namespace MikadoCore\CPT\Doctors\Shortcodes;

use MikadoCore\Lib\ShortcodeInterface;

class BookingForm implements ShortcodeInterface {
    private $base;

    /**
     * ToursFilter constructor.
     */
    public function __construct() {
        $this->base = 'mkd_booking_form';

        add_action('vc_before_init_vc', array($this, 'vcMap'));
    }

    public function getBase() {
        return $this->base;
    }

    public function vcMap() {
        if(function_exists('vc_map')) {
            vc_map(array(
                'name'                      => esc_html__('Booking Form', 'medigroup'),
                'base'                      => $this->base,
                'category'                  => esc_html__('by MIKADO', 'medigroup'),
                'icon'                      => 'icon-wpb-tours-filters extended-custom-icon',
                'allowed_container_element' => 'vc_row',
                'params'                    => array(
                    array(
                        'type'        => 'textfield',
                        'heading'     => esc_html__('Title', 'medigroup'),
                        'param_name'  => 'form_title',
                        'admin_label' => true,
                        'group'       => esc_html__('Form Content', 'medigroup')
                    ),
                    array(
                        'type'        => 'textfield',
                        'heading'     => esc_html__('Slogan', 'medigroup'),
                        'param_name'  => 'form_slogan',
                        'admin_label' => true,
                        'group'       => esc_html__('Form Content', 'medigroup'),
                        'description' => esc_html__('Appears in Booking Form above the title.', 'medigroup')
                    ),
                    array(
                        'type'        => 'dropdown',
                        'heading'     => esc_html__('Show Request Field?', 'medigroup'),
                        'param_name'  => 'form_request',
                        'value'       => array(
                            esc_html__('No', 'medigroup')  => 'no',
                            esc_html__('Yes', 'medigroup') => 'yes'
                        ),
                        'admin_label' => true,
                        'description' => esc_html__('A place for additional note by the user', 'medigroup'),
                        'save_always' => true,
                        'group'       => esc_html__('Form Content', 'medigroup')
                    ),
                    array(
                        'type'        => 'textfield',
                        'heading'     => esc_html__('Button Text', 'medigroup'),
                        'param_name'  => 'form_button_text',
                        'admin_label' => true,
                        'group'       => esc_html__('Form Content', 'medigroup'),
                        'description' => esc_html__('Appears in Booking Form above the title.', 'medigroup')
                    ),
                    array(
                        'type'        => 'dropdown',
                        'heading'     => esc_html__('Skin', 'medigroup'),
                        'param_name'  => 'form_skin',
                        'value'       => array(
                            esc_html__('Light', 'medigroup') => 'light',
                            esc_html__('Dark', 'medigroup')  => 'dark'
                        ),
                        'admin_label' => true,
                        'save_always' => true,
                        'group'       => esc_html__('Design Options', 'medigroup')
                    ),
                    array(
                        'type'        => 'dropdown',
                        'heading'     => esc_html__('Full Width?', 'medigroup'),
                        'param_name'  => 'form_full_width',
                        'value'       => array(
                            esc_html__('Yes', 'medigroup') => 'yes',
                            esc_html__('No', 'medigroup')  => 'no'
                        ),
                        'admin_label' => true,
                        'save_always' => true,

                        'group'       => esc_html__('Design Options', 'medigroup')
                    ),
                    array(
                        'type'        => 'dropdown',
                        'heading'     => esc_html__('Columns', 'medigroup'),
                        'param_name'  => 'form_columns',
                        'value'       => array(
                            esc_html__('One', 'medigroup')  => '1',
                            esc_html__('Two', 'medigroup') => '2'
                        ),
                        'admin_label' => true,
                        'description' => esc_html__('A place for additional note by the user', 'medigroup'),
                        'save_always' => true,
                        'group'       => esc_html__('Design Options', 'medigroup')
                    ),
                    array(
                        'type'        => 'textfield',
                        'heading'     => esc_html__('Background Opacity (0-1)', 'medigroup'),
                        'param_name'  => 'form_opacity',
                        'admin_label' => true,
                        'group'       => esc_html__('Design Options', 'medigroup')
                    ),
                    array(
                        'type'        => 'dropdown',
                        'heading'     => esc_html__('Floating Form', 'medigroup'),
                        'param_name'  => 'form_floating',
                        'value'       => array(
                            esc_html__('No', 'medigroup')  => 'no',
                            esc_html__('Yes', 'medigroup') => 'yes'
                        ),
                        'admin_label' => true,
                        'description' => esc_html__('This option is used to put form in front of a section.', 'medigroup'),
                        'save_always' => true,
                        'group'       => esc_html__('Design Options', 'medigroup')
                    ),
                    array(
                        'type'        => 'dropdown',
                        'heading'     => esc_html__('Floating Form Horizontal Position', 'medigroup'),
                        'param_name'  => 'form_floating_h_position',
                        'value'       => array(
                            esc_html__('Left', 'medigroup')  => 'left',
                            esc_html__('Center', 'medigroup') => 'center',
                            esc_html__('Right', 'medigroup') => 'right'
                        ),
                        'admin_label' => true,
                        'save_always' => true,
                        'dependency' => array('element' => 'form_floating', 'value' => array('yes')),
                        'group'       => esc_html__('Design Options', 'medigroup')
                    )
                )
            ));
        }
    }

    public function render($atts, $content = null) {
        $args = array(
            'form_title'       => '',
            'form_slogan'       => '',
            'form_button_text'       => '',
            'form_skin'       => 'light',
            'form_full_width' => 'yes',
            'form_request' => 'no',
            'form_opacity' => '100',
            'form_layout' => 'vertical',
            'form_columns' => '1',
            'form_floating' => 'no',
            'form_floating_h_position' => 'left',
            'form_widget_text' => '',
            'form_widget_link' => ''
        );

        $params = shortcode_atts($args, $atts);

        return mkd_core_get_shortcode_module_template_part('booking-form/templates/booking-form-holder', 'doctors', '', $params);
    }
}