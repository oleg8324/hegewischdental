<?php
namespace Medigroup\Modules\Shortcodes\VideoBanner;

use Medigroup\Modules\Shortcodes\Lib\ShortcodeInterface;

class VideoBanner implements ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'mkd_video_banner';

		add_action('vc_before_init', array($this, 'vcMap'));
	}

	public function getBase() {
		return $this->base;
	}

	public function vcMap() {
		vc_map(array(
			'name'                      => esc_html__('Video Banner', 'medigroup'),
			'base'                      => $this->base,
			'category'                  => esc_html__('by MIKADO', 'medigroup'),
			'icon'                      => 'icon-wpb-video-banner extended-custom-icon',
			'allowed_container_element' => 'vc_row',
			'params'                    => array(
				array(
					'type'        => 'textfield',
					'heading'     => esc_html__('Video Link', 'medigroup'),
					'param_name'  => 'video_link',
					'value'       => '',
					'save_always' => true,
					'admin_label' => true
				),
				array(
					'type'        => 'attach_image',
					'heading'     => esc_html__('Video Banner', 'medigroup'),
					'param_name'  => 'video_banner',
					'value'       => '',
					'save_always' => true,
					'admin_label' => true
				)
			)
		));
	}

	public function render($atts, $content = null) {
		$default_atts = array(
			'video_link'   => '',
			'video_banner' => ''
		);

		$params              = shortcode_atts($default_atts, $atts);
		$params['banner_id'] = rand();

		return medigroup_mikado_get_shortcode_module_template_part('templates/video-banner', 'video-banner', '', $params);
	}

}