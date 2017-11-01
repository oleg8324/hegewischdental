<?php

if ( ! function_exists('medigroup_mikado_like') ) {
	/**
	 * Returns MedigroupMikadoLike instance
	 *
	 * @return MedigroupMikadoLike
	 */
	function medigroup_mikado_like() {
		return MedigroupMikadoLike::get_instance();
	}

}

function medigroup_mikado_get_like() {

	echo wp_kses(medigroup_mikado_like()->add_like(), array(
		'span' => array(
			'class' => true,
			'aria-hidden' => true,
			'style' => true,
			'id' => true
		),
		'i' => array(
			'class' => true,
			'style' => true,
			'id' => true
		),
		'a' => array(
			'href' => true,
			'class' => true,
			'id' => true,
			'title' => true,
			'style' => true
		)
	));
}

if ( ! function_exists('medigroup_mikado_like_latest_posts') ) {
	/**
	 * Add like to latest post
	 *
	 * @return string
	 */
	function medigroup_mikado_like_latest_posts() {
		return medigroup_mikado_like()->add_like();
	}

}

if ( ! function_exists('medigroup_mikado_like_portfolio_list') ) {
	/**
	 * Add like to portfolio project
	 *
	 * @param $portfolio_project_id
	 * @return string
	 */
	function medigroup_mikado_like_portfolio_list($portfolio_project_id) {
		return medigroup_mikado_like()->add_like_portfolio_list($portfolio_project_id);
	}

}