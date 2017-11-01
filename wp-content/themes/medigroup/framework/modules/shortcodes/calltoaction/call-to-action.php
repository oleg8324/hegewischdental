<?php
namespace Medigroup\Modules\CallToAction;

use Medigroup\Modules\Shortcodes\Lib\ShortcodeInterface;

/**
 * Class CallToAction
 */
class CallToAction implements ShortcodeInterface {

	/**
	 * @var string
	 */
	private $base;

	public function __construct() {
		$this->base = 'mkd_call_to_action';

		add_action('vc_before_init', array($this, 'vcMap'));
	}

	/**
	 * Returns base for shortcode
	 * @return string
	 */
	public function getBase() {
		return $this->base;
	}

	/**
	 * Maps shortcode to Visual Composer. Hooked on vc_before_init
	 *
	 * @see mkd_core_get_carousel_slider_array_vc()
	 */
	public function vcMap() {

		$call_to_action_button_icons_array     = array();
		$call_to_action_button_IconCollections = medigroup_mikado_icon_collections()->iconCollections;
		foreach($call_to_action_button_IconCollections as $collection_key => $collection) {

			$call_to_action_button_icons_array[] = array(
				'type'        => 'dropdown',
				'heading'     => esc_html__('Button Icon', 'medigroup'),
				'param_name'  => 'button_'.$collection->param,
				'value'       => $collection->getIconsArray(),
				'save_always' => true,
				'dependency'  => Array('element' => 'button_icon_pack', 'value' => array($collection_key))
			);

		}

		vc_map(array(
			'name'                      => esc_html__('Call to Action', 'medigroup'),
			'base'                      => $this->getBase(),
			'category'                  => esc_html__('by MIKADO', 'medigroup'),
			'icon'                      => 'icon-wpb-call-to-action extended-custom-icon',
			'allowed_container_element' => 'vc_row',
			'params'                    => array_merge(
				array(
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Full Width', 'medigroup'),
						'param_name'  => 'full_width',
						'admin_label' => true,
						'value'       => array(
							esc_html__('Yes', 'medigroup') => 'yes',
							esc_html__('No', 'medigroup')  => 'no'
						),
						'save_always' => true,
						'description' => '',
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Content in grid', 'medigroup'),
						'param_name'  => 'content_in_grid',
						'value'       => array(
							esc_html__('Yes', 'medigroup') => 'yes',
							esc_html__('No', 'medigroup')  => 'no'
						),
						'save_always' => true,
						'description' => '',
						'dependency'  => array('element' => 'full_width', 'value' => 'yes')
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Grid size', 'medigroup'),
						'param_name'  => 'grid_size',
						'value'       => array(
							'75/25' => '75',
							'50/50' => '50',
							'66/33' => '66'
						),
						'save_always' => true,
						'description' => '',
						'dependency'  => array('element' => 'content_in_grid', 'value' => 'yes')
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Type', 'medigroup'),
						'param_name'  => 'type',
						'admin_label' => true,
						'value'       => array(
							esc_html__('Normal', 'medigroup')    => 'normal',
							esc_html__('With Icon', 'medigroup') => 'with-icon',
						),
						'save_always' => true,
						'description' => ''
					)
				),
				medigroup_mikado_icon_collections()->getVCParamsArray(array(
					'element' => 'type',
					'value'   => array('with-icon')
				)),
				array(
					array(
						'type'        => 'attach_image',
						'heading'     => esc_html__('Background Image', 'medigroup'),
						'param_name'  => 'background_image',
						'description' => '',
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'textfield',
						'heading'     => esc_html__('Icon Size (px)', 'medigroup'),
						'param_name'  => 'icon_size',
						'description' => '',
						'dependency'  => array('element' => 'type', 'value' => array('with-icon')),
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'textfield',
						'heading'     => esc_html__('Box Padding (top right bottom left) px', 'medigroup'),
						'param_name'  => 'box_padding',
						'admin_label' => true,
						'description' => esc_html__('Default padding is 20px on all sides', 'medigroup'),
						'group'       => esc_html__('Design Options', 'medigroup')
					),
					array(
						'type'        => 'colorpicker',
						'heading'     => esc_html__('Box Background Color', 'medigroup'),
						'param_name'  => 'box_background_color',
						'admin_label' => true,
						'group'       => esc_html__('Design Options', 'medigroup')
					),
					array(
						'type'        => 'colorpicker',
						'heading'     => esc_html__('Box Border Color', 'medigroup'),
						'param_name'  => 'box_border_color',
						'admin_label' => true,
						'group'       => esc_html__('Design Options', 'medigroup')
					),
					array(
						'type'        => 'textfield',
						'heading'     => esc_html__('Box Border Width (px)', 'medigroup'),
						'param_name'  => 'box_border_width',
						'admin_label' => true,
						'group'       => esc_html__('Design Options', 'medigroup')
					),
					array(
						'type'        => 'textfield',
						'heading'     => esc_html__('Default Text Font Size (px)', 'medigroup'),
						'param_name'  => 'text_size',
						'description' => esc_html__('Font size for p tag', 'medigroup'),
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Show Button', 'medigroup'),
						'param_name'  => 'show_button',
						'value'       => array(
							esc_html__('Yes', 'medigroup') => 'yes',
							esc_html__('No', 'medigroup')  => 'no'
						),
						'admin_label' => true,
						'save_always' => true,
						'description' => ''
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Button Type', 'medigroup'),
						'param_name'  => 'button_type',
						'value'       => array_flip(medigroup_mikado_get_btn_types(true)),
						'save_always' => true,
						'admin_label' => true,
						'dependency'  => array('element' => 'show_button', 'value' => array('yes')),
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Hover Button Type', 'medigroup'),
						'param_name'  => 'button_hover_type',
						'value'       => array_flip(medigroup_mikado_get_btn_types(true)),
						'save_always' => true,
						'admin_label' => true,
						'dependency'  => array('element' => 'show_button', 'value' => array('yes')),
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Button Hover Animation', 'medigroup'),
						'param_name'  => 'button_hover_animation',
						'value'       => array_flip(medigroup_mikado_get_btn_hover_animation_types(true)),
						'save_always' => true,
						'admin_label' => true,
						'dependency'  => array('element' => 'show_button', 'value' => array('yes')),
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Button Position', 'medigroup'),
						'param_name'  => 'button_position',
						'value'       => array(
							esc_html__('Default/right', 'medigroup') => '',
							esc_html__('Center', 'medigroup')        => 'center',
							esc_html__('Left', 'medigroup')          => 'left'
						),
						'description' => '',
						'dependency'  => array('element' => 'show_button', 'value' => array('yes'))
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Button Size', 'medigroup'),
						'param_name'  => 'button_size',
						'value'       => array(
							esc_html__('Default', 'medigroup')     => '',
							esc_html__('Small', 'medigroup')       => 'small',
							esc_html__('Medium', 'medigroup')      => 'medium',
							esc_html__('Large', 'medigroup')       => 'large',
							esc_html__('Extra Large', 'medigroup') => 'big_large'
						),
						'description' => '',
						'dependency'  => array('element' => 'show_button', 'value' => array('yes')),
						'group'       => esc_html__('Design Options', 'medigroup'),
					),
					array(
						'type'        => 'textfield',
						'heading'     => esc_html__('Button Text', 'medigroup'),
						'param_name'  => 'button_text',
						'admin_label' => true,
						'description' => esc_html__('Default text is "button"', 'medigroup'),
						'dependency'  => array('element' => 'show_button', 'value' => array('yes'))
					),
					array(
						'type'        => 'textfield',
						'heading'     => esc_html__('Button Link', 'medigroup'),
						'param_name'  => 'button_link',
						'description' => '',
						'admin_label' => true,
						'dependency'  => array('element' => 'show_button', 'value' => array('yes'))
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Button Target', 'medigroup'),
						'param_name'  => 'button_target',
						'value'       => array(
							''      => '',
							esc_html__('Self', 'medigroup')  => '_self',
							esc_html__('Blank', 'medigroup') => '_blank'
						),
						'description' => '',
						'dependency'  => array('element' => 'show_button', 'value' => array('yes'))
					),
					array(
						'type'        => 'dropdown',
						'heading'     => esc_html__('Button Icon Pack', 'medigroup'),
						'param_name'  => 'button_icon_pack',
						'value'       => array_merge(array('No Icon' => ''), medigroup_mikado_icon_collections()->getIconCollectionsVC()),
						'save_always' => true,
						'dependency'  => array('element' => 'show_button', 'value' => array('yes'))
					)
				),
				$call_to_action_button_icons_array,
				array(
					array(
						'type'        => 'textarea_html',
						'admin_label' => true,
						'heading'     => esc_html__('Content', 'medigroup'),
						'param_name'  => 'content',
						'value'       => '<p>'.esc_html__('I am test text for Call to action.', 'medigroup').'</p>',
						'description' => ''
					)
				)
			)
		));

	}

	/**
	 * Renders shortcodes HTML
	 *
	 * @param $atts array of shortcode params
	 * @param $content string shortcode content
	 *
	 * @return string
	 */
	public function render($atts, $content = null) {

		$args = array(
			'type'                   => 'normal',
			'button_type'            => '',
			'button_hover_type'      => '',
			'full_width'             => 'yes',
			'content_in_grid'        => 'yes',
			'grid_size'              => '75',
			'icon_size'              => '',
			'background_image'       => '',
			'box_padding'            => '20px',
			'box_background_color'   => '',
			'box_border_color'       => '',
			'box_border_width'       => '',
			'text_size'              => '',
			'show_button'            => 'yes',
			'button_position'        => 'right',
			'button_size'            => '',
			'button_link'            => '',
			'button_text'            => 'button',
			'button_target'          => '',
			'button_icon_pack'       => '',
			'button_hover_animation' => ''
		);

		$call_to_action_icons_form_fields = array();

		foreach(medigroup_mikado_icon_collections()->iconCollections as $collection_key => $collection) {

			$call_to_action_icons_form_fields['button_'.$collection->param] = '';

		}

		$args = array_merge($args, medigroup_mikado_icon_collections()->getShortcodeParams(), $call_to_action_icons_form_fields);

		$params = shortcode_atts($args, $atts);

		$params['content']               = $content;
		$params['text_wrapper_classes']  = $this->getTextWrapperClasses($params);
		$params['content_styles']        = $this->getContentStyles($params);
		$params['call_to_action_styles'] = $this->getCallToActionStyles($params);
		$params['icon']                  = $this->getCallToActionIcon($params);
		$params['button_parameters']     = $this->getButtonParameters($params);

		$params['button_type'] = !empty($params['button_type']) ? $params['button_type'] : 'solid';

		//Get HTML from template
		$html = medigroup_mikado_get_shortcode_module_template_part('templates/call-to-action-template', 'calltoaction', '', $params);

		return $html;

	}

	/**
	 * Return Classes for Call To Action text wrapper
	 *
	 * @param $params
	 *
	 * @return string
	 */
	private function getTextWrapperClasses($params) {
		return ($params['show_button'] == 'yes') ? 'mkd-call-to-action-column1 mkd-call-to-action-cell' : '';
	}

	/**
	 * Return CSS styles for Call To Action Icon
	 *
	 * @param $params
	 *
	 * @return string
	 */
	private function getIconStyles($params) {
		$icon_style = array();

		if($params['icon_size'] !== '') {
			$icon_style[] = 'font-size: '.$params['icon_size'].'px';
		}

		return implode(';', $icon_style);
	}

	/**
	 * Return CSS styles for Call To Action Content
	 *
	 * @param $params
	 *
	 * @return string
	 */
	private function getContentStyles($params) {
		$content_styles = array();

		if($params['text_size'] !== '') {
			$content_styles[] = 'font-size: '.$params['text_size'].'px';
		}

		return implode(';', $content_styles);
	}

	/**
	 * Return CSS styles for Call To Action shortcode
	 *
	 * @param $params
	 *
	 * @return string
	 */
	private function getCallToActionStyles($params) {
		$call_to_action_styles = array();

		if($params['background_image'] != '') {
			$image = wp_get_attachment_image_src($params['background_image'], 'full');
			$image_url = $image[0];
			$call_to_action_styles[] = 'background-image: url('.esc_attr($image_url).');';
		}

		if($params['box_padding'] != '') {
			$call_to_action_styles[] = 'padding: '.$params['box_padding'].';';
		}

		if($params['box_background_color'] != '') {
			$call_to_action_styles[] = 'background-color: '.$params['box_background_color'].';';
		}

		if($params['box_border_color'] != '') {
			$call_to_action_styles[] = 'border-color: '.$params['box_border_color'].';';
			$call_to_action_styles[] = 'border-style: solid';

			$border_width = 2;

			if($params['box_border_width'] !== '') {
				$border_width = medigroup_mikado_filter_px($params['box_border_width']);
			}

			$call_to_action_styles[] = 'border-width: '.$border_width.'px';
		}

		return $call_to_action_styles;
	}

	/**
	 * Return Icon for Call To Action Shortcode
	 *
	 * @param $params
	 *
	 * @return mixed
	 */
	private function getCallToActionIcon($params) {

		$icon                                   = medigroup_mikado_icon_collections()->getIconCollectionParamNameByKey($params['icon_pack']);
		$iconStyles                             = array();
		$iconStyles['icon_attributes']['style'] = $this->getIconStyles($params);
		$call_to_action_icon                    = '';
		if(!empty($params[$icon])) {
			$call_to_action_icon = medigroup_mikado_icon_collections()->renderIcon($params[$icon], $params['icon_pack'], $iconStyles);
		}

		return $call_to_action_icon;

	}

	private function getButtonParameters($params) {
		$button_params_array = array();

		if(!empty($params['button_link'])) {
			$button_params_array['link'] = $params['button_link'];
		}

		if(!empty($params['button_size'])) {
			$button_params_array['size'] = $params['button_size'];
		}

		if(!empty($params['button_type'])) {
			$button_params_array['type'] = $params['button_type'];
		}

		if(!empty($params['button_icon_pack'])) {
			$button_params_array['icon_pack']   = $params['button_icon_pack'];
			$iconPackName                       = medigroup_mikado_icon_collections()->getIconCollectionParamNameByKey($params['button_icon_pack']);
			$button_params_array[$iconPackName] = $params['button_'.$iconPackName];
		}

		if(!empty($params['button_target'])) {
			$button_params_array['target'] = $params['button_target'];
		}

		if(!empty($params['button_text'])) {
			$button_params_array['text'] = $params['button_text'];
		}

		$button_params_array['hover_type']      = $params['button_hover_type'];
		$button_params_array['hover_animation'] = $params['button_hover_animation'];

		return $button_params_array;
	}
}