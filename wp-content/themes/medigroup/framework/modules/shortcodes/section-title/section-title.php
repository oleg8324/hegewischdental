<?php
namespace Medigroup\Modules\Shortcodes\SectionTitle;

use Medigroup\Modules\Shortcodes\Lib;

class SectionTitle implements Lib\ShortcodeInterface {
	private $base;

	/**
	 * SectionTitle constructor.
	 */
	public function __construct() {
		$this->base = 'mkd_section_title';

		add_action('vc_before_init', array($this, 'vcMap'));
	}


	public function getBase() {
		return $this->base;
	}

	public function vcMap() {
		vc_map(array(
			'name'                      => esc_html__('Section Title', 'medigroup'),
			'base'                      => $this->base,
			'category'                  => esc_html__('by MIKADO', 'medigroup'),
			'icon'                      => 'icon-wpb-section-title extended-custom-icon',
			'allowed_container_element' => 'vc_row',
			'params'                    => array(
				array(
					'type'        => 'textfield',
					'heading'     => esc_html__('Title', 'medigroup'),
					'param_name'  => 'title',
					'value'       => '',
					'save_always' => true,
					'admin_label' => true,
					'description' => esc_html__('Enter title text', 'medigroup')
				),
				array(
					'type'        => 'colorpicker',
					'heading'     => esc_html__('Color', 'medigroup'),
					'param_name'  => 'title_color',
					'value'       => '',
					'save_always' => true,
					'admin_label' => true,
					'description' => esc_html__('Choose color of your title', 'medigroup')
				),
				array(
					'type'        => 'dropdown',
					'heading'     => esc_html__('Text Transform', 'medigroup'),
					'param_name'  => 'title_text_transform',
					'value'       => array_flip(medigroup_mikado_get_text_transform_array(true)),
					'save_always' => true,
					'admin_label' => true,
					'description' => esc_html__('Choose text transform for title', 'medigroup')
				),
				array(
					'type'        => 'dropdown',
					'heading'     => esc_html__('Text Align', 'medigroup'),
					'param_name'  => 'title_text_align',
					'value'       => array(
						''       => '',
						esc_html__('Center', 'medigroup') => 'center',
						esc_html__('Left', 'medigroup')   => 'left',
						esc_html__('Right', 'medigroup')  => 'right'
					),
					'save_always' => true,
					'admin_label' => true,
					'description' => esc_html__('Choose text align for title', 'medigroup')
				),
				array(
					'type'        => 'textfield',
					'heading'     => esc_html__('Margin Bottom', 'medigroup'),
					'param_name'  => 'margin_bottom',
					'value'       => '',
					'save_always' => true,
					'admin_label' => true,
				),
				array(
					'type'        => 'dropdown',
					'heading'     => esc_html__('Size', 'medigroup'),
					'param_name'  => 'title_size',
					'value'       => array(
						esc_html__('Default', 'medigroup') => '',
						esc_html__('Small', 'medigroup')   => 'small',
						esc_html__('Medium', 'medigroup')  => 'medium',
						esc_html__('Large', 'medigroup')   => 'large'
					),
					'save_always' => true,
					'admin_label' => true,
					'description' => esc_html__('Choose one of predefined title sizes', 'medigroup')
				)
			)
		));
	}

	public function render($atts, $content = null) {
		$default_atts = array(
			'title'                => '',
			'title_color'          => '',
			'title_size'           => '',
			'title_text_transform' => '',
			'title_text_align'     => '',
			'margin_bottom'        => ''
		);

		$params = shortcode_atts($default_atts, $atts);

		if($params['title'] !== '') {
			$params['section_title_classes'] = array('mkd-section-title');

			if($params['title_size'] !== '') {
				$params['section_title_classes'][] = 'mkd-section-title-'.$params['title_size'];
			}

			$params['section_title_styles'] = array();

			if($params['title_color'] !== '') {
				$params['section_title_styles'][] = 'color: '.$params['title_color'];
			}

			if($params['title_text_transform'] !== '') {
				$params['section_title_styles'][] = 'text-transform: '.$params['title_text_transform'];
			}

			if($params['title_text_align'] !== '') {
				$params['section_title_styles'][] = 'text-align: '.$params['title_text_align'];
			}

			if($params['margin_bottom'] !== '') {
				$params['section_title_styles'][] = 'margin-bottom: '.medigroup_mikado_filter_px($params['margin_bottom']).'px';
			}

			$params['title_tag'] = $this->getTitleTag($params);

			return medigroup_mikado_get_shortcode_module_template_part('templates/section-title-template', 'section-title', '', $params);
		}
	}

	private function getTitleTag($params) {
		switch($params['title_size']) {
			default:
				$titleTag = 'h2';
		}

		return $titleTag;
	}
}