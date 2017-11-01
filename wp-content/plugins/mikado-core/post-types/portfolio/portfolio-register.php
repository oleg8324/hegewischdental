<?php
namespace MikadoCore\CPT\Portfolio;

use MikadoCore\Lib\PostTypeInterface;

/**
 * Class PortfolioRegister
 * @package MikadoCore\CPT\Portfolio
 */
class PortfolioRegister implements PostTypeInterface {
	/**
	 * @var string
	 */
	private $base;

	public function __construct() {
		$this->base    = 'portfolio-item';
		$this->taxBase = 'portfolio-category';

		add_filter('single_template', array($this, 'registerSingleTemplate'));
	}

	/**
	 * @return string
	 */
	public function getBase() {
		return $this->base;
	}

	/**
	 * Registers custom post type with WordPress
	 */
	public function register() {
		$this->registerPostType();
		$this->registerTax();
		$this->registerTagTax();
	}

	/**
	 * Registers portfolio single template if one does'nt exists in theme.
	 * Hooked to single_template filter
	 *
	 * @param $single string current template
	 *
	 * @return string string changed template
	 */
	public function registerSingleTemplate($single) {
		global $post;

		if($post->post_type == $this->base) {
			if(!file_exists(get_template_directory().'/single-portfolio-item.php')) {
				return MIKADO_CORE_CPT_PATH.'/portfolio/templates/single-'.$this->base.'.php';
			}
		}

		return $single;
	}

	/**
	 * Registers custom post type with WordPress
	 */
	private function registerPostType() {
		global $medigroup_Framework, $medigroup_options;

		$menuPosition = 5;
		$menuIcon     = 'dashicons-admin-post';
		$slug         = $this->base;

		if(mkd_core_theme_installed()) {
			$menuPosition = $medigroup_Framework->getSkin()->getMenuItemPosition('portfolio');
			$menuIcon     = $medigroup_Framework->getSkin()->getMenuIcon('portfolio');

			if(isset($medigroup_options['portfolio_single_slug'])) {
				if($medigroup_options['portfolio_single_slug'] != "") {
					$slug = $medigroup_options['portfolio_single_slug'];
				}
			}
		}

		register_post_type($this->base,
			array(
				'labels'        => array(
					'name'          => esc_html__('Portfolio', 'mkd_core'),
					'singular_name' => esc_html__('Portfolio Item', 'mkd_core'),
					'add_item'      => esc_html__('New Portfolio Item', 'mkd_core'),
					'add_new_item'  => esc_html__('Add New Portfolio Item', 'mkd_core'),
					'edit_item'     => esc_html__('Edit Portfolio Item', 'mkd_core')
				),
				'public'        => true,
				'has_archive'   => true,
				'rewrite'       => array('slug' => $slug),
				'menu_position' => $menuPosition,
				'show_ui'       => true,
				'supports'      => array(
					'author',
					'title',
					'editor',
					'thumbnail',
					'excerpt',
					'page-attributes',
					'comments'
				),
				'menu_icon'     => $menuIcon
			)
		);
	}

	/**
	 * Registers custom taxonomy with WordPress
	 */
	private function registerTax() {
		$labels = array(
			'name'              => esc_html__('Portfolio Categories', 'taxonomy general name'),
			'singular_name'     => esc_html__('Portfolio Category', 'taxonomy singular name'),
			'search_items'      => esc_html__('Search Portfolio Categories', 'mkd_core'),
			'all_items'         => esc_html__('All Portfolio Categories', 'mkd_core'),
			'parent_item'       => esc_html__('Parent Portfolio Category', 'mkd_core'),
			'parent_item_colon' => esc_html__('Parent Portfolio Category:', 'mkd_core'),
			'edit_item'         => esc_html__('Edit Portfolio Category', 'mkd_core'),
			'update_item'       => esc_html__('Update Portfolio Category', 'mkd_core'),
			'add_new_item'      => esc_html__('Add New Portfolio Category', 'mkd_core'),
			'new_item_name'     => esc_html__('New Portfolio Category Name', 'mkd_core'),
			'menu_name'         => esc_html__('Portfolio Categories', 'mkd_core'),
		);

		register_taxonomy($this->taxBase, array($this->base), array(
			'hierarchical' => true,
			'labels'       => $labels,
			'show_ui'      => true,
			'query_var'    => true,
			'rewrite'      => array('slug' => 'portfolio-category'),
		));
	}

	/**
	 * Registers custom tag taxonomy with WordPress
	 */
	private function registerTagTax() {
		$labels = array(
			'name'              => esc_html__('Portfolio Tags', 'taxonomy general name'),
			'singular_name'     => esc_html__('Portfolio Tag', 'taxonomy singular name'),
			'search_items'      => esc_html__('Search Portfolio Tags', 'mkd_core'),
			'all_items'         => esc_html__('All Portfolio Tags', 'mkd_core'),
			'parent_item'       => esc_html__('Parent Portfolio Tag', 'mkd_core'),
			'parent_item_colon' => esc_html__('Parent Portfolio Tags:', 'mkd_core'),
			'edit_item'         => esc_html__('Edit Portfolio Tag', 'mkd_core'),
			'update_item'       => esc_html__('Update Portfolio Tag', 'mkd_core'),
			'add_new_item'      => esc_html__('Add New Portfolio Tag', 'mkd_core'),
			'new_item_name'     => esc_html__('New Portfolio Tag Name', 'mkd_core'),
			'menu_name'         => esc_html__('Portfolio Tags', 'mkd_core'),
		);

		register_taxonomy('portfolio-tag', array($this->base), array(
			'hierarchical' => false,
			'labels'       => $labels,
			'show_ui'      => true,
			'query_var'    => true,
			'rewrite'      => array('slug' => 'portfolio-tag'),
		));
	}
}