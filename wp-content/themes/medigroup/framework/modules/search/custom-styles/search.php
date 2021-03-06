<?php

if(!function_exists('medigroup_mikado_search_covers_header_style')) {

	function medigroup_mikado_search_covers_header_style() {

		if(medigroup_mikado_options()->getOptionValue('search_height') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-header-bottom.mkd-animated .mkd-form-holder-outer, .mkd-search-slide-header-bottom .mkd-form-holder-outer, .mkd-search-slide-header-bottom', array(
				'height' => medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_height')).'px'
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_covers_header_style');

}

if(!function_exists('medigroup_mikado_search_opener_icon_size')) {

	function medigroup_mikado_search_opener_icon_size() {

		if(medigroup_mikado_options()->getOptionValue('header_search_icon_size')) {
			echo medigroup_mikado_dynamic_css('.mkd-search-opener', array(
				'font-size' => medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('header_search_icon_size')).'px'
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_opener_icon_size');

}

if(!function_exists('medigroup_mikado_search_opener_icon_colors')) {

	function medigroup_mikado_search_opener_icon_colors() {

		if(medigroup_mikado_options()->getOptionValue('header_search_icon_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-page-header .mkd-search-opener', array(
				'color' => medigroup_mikado_options()->getOptionValue('header_search_icon_color')
			));
		}

		if(medigroup_mikado_options()->getOptionValue('header_search_icon_hover_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-page-header .mkd-search-opener:hover', array(
				'color' => medigroup_mikado_options()->getOptionValue('header_search_icon_hover_color')
			));
		}

		if(medigroup_mikado_options()->getOptionValue('header_light_search_icon_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-light-header .mkd-page-header > div:not(.mkd-sticky-header) .mkd-search-opener,
			.mkd-light-header.mkd-header-style-on-scroll .mkd-page-header .mkd-search-opener,
			.mkd-light-header .mkd-top-bar .mkd-search-opener', array(
				'color' => medigroup_mikado_options()->getOptionValue('header_light_search_icon_color').' !important'
			));
		}

		if(medigroup_mikado_options()->getOptionValue('header_light_search_icon_hover_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-light-header .mkd-page-header > div:not(.mkd-sticky-header) .mkd-search-opener:hover,
			.mkd-light-header.mkd-header-style-on-scroll .mkd-page-header .mkd-search-opener:hover,
			.mkd-light-header .mkd-top-bar .mkd-search-opener:hover', array(
				'color' => medigroup_mikado_options()->getOptionValue('header_light_search_icon_hover_color').' !important'
			));
		}

		if(medigroup_mikado_options()->getOptionValue('header_dark_search_icon_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-dark-header .mkd-page-header > div:not(.mkd-sticky-header) .mkd-search-opener,
			.mkd-dark-header.mkd-header-style-on-scroll .mkd-page-header .mkd-search-opener,
			.mkd-dark-header .mkd-top-bar .mkd-search-opener', array(
				'color' => medigroup_mikado_options()->getOptionValue('header_dark_search_icon_color').' !important'
			));
		}
		if(medigroup_mikado_options()->getOptionValue('header_dark_search_icon_hover_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-dark-header .mkd-page-header > div:not(.mkd-sticky-header) .mkd-search-opener:hover,
			.mkd-dark-header.mkd-header-style-on-scroll .mkd-page-header .mkd-search-opener:hover,
			.mkd-dark-header .mkd-top-bar .mkd-search-opener:hover', array(
				'color' => medigroup_mikado_options()->getOptionValue('header_dark_search_icon_hover_color').' !important'
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_opener_icon_colors');

}

if(!function_exists('medigroup_mikado_search_opener_icon_background_colors')) {

	function medigroup_mikado_search_opener_icon_background_colors() {

		if(medigroup_mikado_options()->getOptionValue('search_icon_background_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-opener', array(
				'background-color' => medigroup_mikado_options()->getOptionValue('search_icon_background_color')
			));
		}

		if(medigroup_mikado_options()->getOptionValue('search_icon_background_hover_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-opener:hover', array(
				'background-color' => medigroup_mikado_options()->getOptionValue('search_icon_background_hover_color')
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_opener_icon_background_colors');
}

if(!function_exists('medigroup_mikado_search_opener_text_styles')) {

	function medigroup_mikado_search_opener_text_styles() {
		$text_styles = array();

		if(medigroup_mikado_options()->getOptionValue('search_icon_text_color') !== '') {
			$text_styles['color'] = medigroup_mikado_options()->getOptionValue('search_icon_text_color');
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_fontsize') !== '') {
			$text_styles['font-size'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_icon_text_fontsize')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_lineheight') !== '') {
			$text_styles['line-height'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_icon_text_lineheight')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_texttransform') !== '') {
			$text_styles['text-transform'] = medigroup_mikado_options()->getOptionValue('search_icon_text_texttransform');
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_google_fonts') !== '-1') {
			$text_styles['font-family'] = medigroup_mikado_get_formatted_font_family(medigroup_mikado_options()->getOptionValue('search_icon_text_google_fonts')).', sans-serif';
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_fontstyle') !== '') {
			$text_styles['font-style'] = medigroup_mikado_options()->getOptionValue('search_icon_text_fontstyle');
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_fontweight') !== '') {
			$text_styles['font-weight'] = medigroup_mikado_options()->getOptionValue('search_icon_text_fontweight');
		}

		if(!empty($text_styles)) {
			echo medigroup_mikado_dynamic_css('.mkd-search-icon-text', $text_styles);
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_text_color_hover') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-opener:hover .mkd-search-icon-text', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_icon_text_color_hover')
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_opener_text_styles');
}

if(!function_exists('medigroup_mikado_search_opener_spacing')) {

	function medigroup_mikado_search_opener_spacing() {
		$spacing_styles = array();

		if(medigroup_mikado_options()->getOptionValue('search_padding_left') !== '') {
			$spacing_styles['padding-left'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_padding_left')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_padding_right') !== '') {
			$spacing_styles['padding-right'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_padding_right')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_margin_left') !== '') {
			$spacing_styles['margin-left'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_margin_left')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_margin_right') !== '') {
			$spacing_styles['margin-right'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_margin_right')).'px';
		}

		if(!empty($spacing_styles)) {
			echo medigroup_mikado_dynamic_css('.mkd-search-opener', $spacing_styles);
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_opener_spacing');
}

if(!function_exists('medigroup_mikado_search_bar_background')) {

	function medigroup_mikado_search_bar_background() {

		if(medigroup_mikado_options()->getOptionValue('search_background_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-header-bottom, .mkd-search-cover, .mkd-search-fade .mkd-fullscreen-search-holder .mkd-fullscreen-search-table, .mkd-fullscreen-search-overlay, .mkd-search-slide-window-top, .mkd-search-slide-window-top input[type="text"]', array(
				'background-color' => medigroup_mikado_options()->getOptionValue('search_background_color')
			));
		}
	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_bar_background');
}

if(!function_exists('medigroup_mikado_search_text_styles')) {

	function medigroup_mikado_search_text_styles() {
		$text_styles = array();

		if(medigroup_mikado_options()->getOptionValue('search_text_color') !== '') {
			$text_styles['color'] = medigroup_mikado_options()->getOptionValue('search_text_color');
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_fontsize') !== '') {
			$text_styles['font-size'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_text_fontsize')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_texttransform') !== '') {
			$text_styles['text-transform'] = medigroup_mikado_options()->getOptionValue('search_text_texttransform');
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_google_fonts') !== '-1') {
			$text_styles['font-family'] = medigroup_mikado_get_formatted_font_family(medigroup_mikado_options()->getOptionValue('search_text_google_fonts')).', sans-serif';
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_fontstyle') !== '') {
			$text_styles['font-style'] = medigroup_mikado_options()->getOptionValue('search_text_fontstyle');
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_fontweight') !== '') {
			$text_styles['font-weight'] = medigroup_mikado_options()->getOptionValue('search_text_fontweight');
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_letterspacing') !== '') {
			$text_styles['letter-spacing'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_text_letterspacing')).'px';
		}

		if(!empty($text_styles)) {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-header-bottom input[type="text"], .mkd-search-cover input[type="text"], .mkd-fullscreen-search-holder .mkd-search-field, .mkd-search-slide-window-top input[type="text"]', $text_styles);
		}
		if(medigroup_mikado_options()->getOptionValue('search_text_disabled_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-header-bottom.mkd-disabled input[type="text"]::-webkit-input-placeholder, .mkd-search-slide-header-bottom.mkd-disabled input[type="text"]::-moz-input-placeholder', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_text_disabled_color')
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_text_styles');
}

if(!function_exists('medigroup_mikado_search_label_styles')) {

	function medigroup_mikado_search_label_styles() {
		$text_styles = array();

		if(medigroup_mikado_options()->getOptionValue('search_label_text_color') !== '') {
			$text_styles['color'] = medigroup_mikado_options()->getOptionValue('search_label_text_color');
		}
		if(medigroup_mikado_options()->getOptionValue('search_label_text_fontsize') !== '') {
			$text_styles['font-size'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_label_text_fontsize')).'px';
		}
		if(medigroup_mikado_options()->getOptionValue('search_label_text_texttransform') !== '') {
			$text_styles['text-transform'] = medigroup_mikado_options()->getOptionValue('search_label_text_texttransform');
		}
		if(medigroup_mikado_options()->getOptionValue('search_label_text_google_fonts') !== '-1') {
			$text_styles['font-family'] = medigroup_mikado_get_formatted_font_family(medigroup_mikado_options()->getOptionValue('search_label_text_google_fonts')).', sans-serif';
		}
		if(medigroup_mikado_options()->getOptionValue('search_label_text_fontstyle') !== '') {
			$text_styles['font-style'] = medigroup_mikado_options()->getOptionValue('search_label_text_fontstyle');
		}
		if(medigroup_mikado_options()->getOptionValue('search_label_text_fontweight') !== '') {
			$text_styles['font-weight'] = medigroup_mikado_options()->getOptionValue('search_label_text_fontweight');
		}
		if(medigroup_mikado_options()->getOptionValue('search_label_text_letterspacing') !== '') {
			$text_styles['letter-spacing'] = medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_label_text_letterspacing')).'px';
		}

		if(!empty($text_styles)) {
			echo medigroup_mikado_dynamic_css('.mkd-fullscreen-search-holder .mkd-search-label', $text_styles);
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_label_styles');
}

if(!function_exists('medigroup_mikado_search_icon_styles')) {

	function medigroup_mikado_search_icon_styles() {

		if(medigroup_mikado_options()->getOptionValue('search_icon_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-window-top > i, .mkd-search-slide-header-bottom .mkd-search-submit i, .mkd-fullscreen-search-holder .mkd-search-submit', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_icon_color')
			));
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_hover_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-window-top > i:hover, .mkd-search-slide-header-bottom .mkd-search-submit i:hover, .mkd-fullscreen-search-holder .mkd-search-submit:hover', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_icon_hover_color')
			));
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_disabled_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-header-bottom.mkd-disabled .mkd-search-submit i, .mkd-search-slide-header-bottom.mkd-disabled .mkd-search-submit i:hover', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_icon_disabled_color')
			));
		}
		if(medigroup_mikado_options()->getOptionValue('search_icon_size') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-window-top > i, .mkd-search-slide-header-bottom .mkd-search-submit i, .mkd-fullscreen-search-holder .mkd-search-submit', array(
				'font-size' => medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_icon_size')).'px'
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_icon_styles');
}

if(!function_exists('medigroup_mikado_search_close_icon_styles')) {

	function medigroup_mikado_search_close_icon_styles() {

		if(medigroup_mikado_options()->getOptionValue('search_close_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-window-top .mkd-search-close i, .mkd-search-cover .mkd-search-close i, .mkd-fullscreen-search-close i', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_close_color')
			));
		}
		if(medigroup_mikado_options()->getOptionValue('search_close_hover_color') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-window-top .mkd-search-close i:hover, .mkd-search-cover .mkd-search-close i:hover, .mkd-fullscreen-search-close i:hover', array(
				'color' => medigroup_mikado_options()->getOptionValue('search_close_hover_color')
			));
		}
		if(medigroup_mikado_options()->getOptionValue('search_close_size') !== '') {
			echo medigroup_mikado_dynamic_css('.mkd-search-slide-window-top .mkd-search-close i, .mkd-search-cover .mkd-search-close i, .mkd-fullscreen-search-close i', array(
				'font-size' => medigroup_mikado_filter_px(medigroup_mikado_options()->getOptionValue('search_close_size')).'px'
			));
		}

	}

	add_action('medigroup_mikado_style_dynamic', 'medigroup_mikado_search_close_icon_styles');
}

?>
