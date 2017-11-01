<?php
if(!function_exists('medigroup_mikado_register_side_area_sidebar')) {
	/**
	 * Register side area sidebar
	 */
	function medigroup_mikado_register_side_area_sidebar() {

		register_sidebar(array(
			'name'          => esc_html__('Side Area', 'medigroup'),
			'id'            => 'sidearea', //TODO Change name of sidebar
			'description'   => esc_html__('Side Area', 'medigroup'),
			'before_widget' => '<div id="%1$s" class="widget mkd-sidearea %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="mkd-sidearea-widget-title">',
			'after_title'   => '</h4>'
		));

	}

	add_action('widgets_init', 'medigroup_mikado_register_side_area_sidebar');

}

if(!function_exists('medigroup_mikado_side_menu_body_class')) {
	/**
	 * Function that adds body classes for different side menu styles
	 *
	 * @param $classes array original array of body classes
	 *
	 * @return array modified array of classes
	 */
	function medigroup_mikado_side_menu_body_class($classes) {

		if(is_active_widget(false, false, 'mkd_side_area_opener')) {

			if(medigroup_mikado_options()->getOptionValue('side_area_type')) {

				$classes[] = 'mkd-'.medigroup_mikado_options()->getOptionValue('side_area_type');

				if(medigroup_mikado_options()->getOptionValue('side_area_type') === 'side-menu-slide-with-content') {

					$classes[] = 'mkd-'.medigroup_mikado_options()->getOptionValue('side_area_slide_with_content_width');

				}

			}

		}

		return $classes;

	}

	add_filter('body_class', 'medigroup_mikado_side_menu_body_class');
}


if(!function_exists('medigroup_mikado_get_side_area')) {
	/**
	 * Loads side area HTML
	 */
	function medigroup_mikado_get_side_area() {

		if(is_active_widget(false, false, 'mkd_side_area_opener')) {

			$parameters = array(
				'show_side_area_title' => medigroup_mikado_options()->getOptionValue('side_area_title') !== '' ? true : false,
				//Dont show title if empty
			);

			medigroup_mikado_get_module_template_part('templates/sidearea', 'sidearea', '', $parameters);

		}

	}

}

if(!function_exists('medigroup_mikado_get_side_area_title')) {
	/**
	 * Loads side area title HTML
	 */
	function medigroup_mikado_get_side_area_title() {

		$parameters = array(
			'side_area_title' => medigroup_mikado_options()->getOptionValue('side_area_title')
		);

		medigroup_mikado_get_module_template_part('templates/parts/title', 'sidearea', '', $parameters);

	}

}

if(!function_exists('medigroup_mikado_get_side_menu_icon_html')) {
	/**
	 * Function that outputs html for side area icon opener.
	 * Uses $medigroup_IconCollections global variable
	 * @return string generated html
	 */
	function medigroup_mikado_get_side_menu_icon_html() {

		$icon_html                       = '';
		$sidearea_default_opener_enabled = medigroup_mikado_options()->getOptionValue('side_area_enable_default_opener') === 'yes';

		if($sidearea_default_opener_enabled) {
			$icon_html = '<span class="mkd-side-area-icon">
							<span class="mkd-sai-first-line"></span>
							<span class="mkd-sai-second-line"></span>
							<span class="mkd-sai-third-line"></span>
			              </span>';
		} elseif(medigroup_mikado_options()->getOptionValue('side_area_button_icon_pack') !== '') {
			$icon_pack = medigroup_mikado_options()->getOptionValue('side_area_button_icon_pack');

			$icons              = medigroup_mikado_icon_collections()->getIconCollection($icon_pack);
			$icon_options_field = 'side_area_icon_'.$icons->param;

			if(medigroup_mikado_options()->getOptionValue($icon_options_field) !== '') {

				$icon      = medigroup_mikado_options()->getOptionValue($icon_options_field);
				$icon_html = medigroup_mikado_icon_collections()->renderIcon($icon, $icon_pack);

			}

		}

		return $icon_html;
	}
}