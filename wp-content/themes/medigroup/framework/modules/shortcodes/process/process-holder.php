<?php
namespace Medigroup\Modules\Shortcodes\Process;

use Medigroup\Modules\Shortcodes\Lib\ShortcodeInterface;

class ProcessHolder implements ShortcodeInterface
{
	private $base;

	public function __construct()
	{
		$this->base = 'mkd_process_holder';

		add_action('vc_before_init', array($this, 'vcMap'));
	}

	public function getBase()
	{
		return $this->base;
	}

	public function vcMap()
	{
		vc_map(array(
			'name'                    => esc_html__('Process', 'medigroup'),
			'base'                    => $this->getBase(),
			'as_parent'               => array('only' => 'mkd_process_item'),
			'content_element'         => true,
			'show_settings_on_create' => true,
			'category'                => esc_html__('by MIKADO', 'medigroup'),
			'icon'                    => 'icon-wpb-call-to-action extended-custom-icon',
			'js_view'                 => 'VcColumnView',
			'params'                  => array(
				array(
					'type'        => 'dropdown',
					'param_name'  => 'process_type',
					'heading'     => esc_html__('Process type', 'medigroup'),
					'value'       => array(
						esc_html__('Horizontal', 'medigroup') => 'horizontal_process',
						esc_html__('Vertical', 'medigroup')   => 'vertical_process'
					),
					'save_always' => true,
					'admin_label' => true,
					'description' => ''
				),
				array(
					'type'        => 'dropdown',
					'param_name'  => 'number_of_items',
					'heading'     => esc_html__('Number of Process Items', 'medigroup'),
					'value'       => array(
						esc_html__('Three', 'medigroup') => 'three',
						esc_html__('Four', 'medigroup')  => 'four'
					),
					'dependency'  => Array('element' => 'process_type', 'value' => 'horizontal_process'),
					'save_always' => true,
					'admin_label' => true,
					'description' => ''
				)
			)
		));
	}

	public function render($atts, $content = null)
	{
		$default_atts = array(
			'process_type'    => 'horizontal_process',
			'number_of_items' => ''
		);

		$params = shortcode_atts($default_atts, $atts);
		$params['content'] = $content;

		if ($params['process_type'] == 'horizontal_process') {
			$params['holder_classes'] = array(
				'mkd-process-holder',
				'mkd-process-horizontal',
				'mkd-process-holder-items-' . $params['number_of_items']
			);

			return medigroup_mikado_get_shortcode_module_template_part('templates/horizontal-process-holder-template', 'process', '', $params);
		}
		else {
			$params['holder_classes'] = array(
				'mkd-process-holder',
				'mkd-process-vertical'
			);

			return medigroup_mikado_get_shortcode_module_template_part('templates/vertical-process-holder-template', 'process', '', $params);
		}
	}
}