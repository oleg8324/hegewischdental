<?php
namespace MikadoCore\CPT\Portfolio\Shortcodes;

use MikadoCore\Lib;
use MikadoCore\CPT\Portfolio\Lib\PortfolioQuery;

/**
 * Class PortfolioSlider
 * @package MikadoCore\CPT\Portfolio\Shortcodes
 */
class PortfolioMarquee implements Lib\ShortcodeInterface {
	/**
	 * @var string
	 */
	private $base;

	public function __construct() {
		$this->base = 'mkd_portfolio_marquee';

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
	 * Maps shortcode to Visual Composer
	 *
	 * @see vc_map()
	 */
	public function vcMap() {
		if(function_exists('vc_map')) {
			vc_map(array(
					'name'                      => esc_html__('Portfolio Marquee', 'mkd_core'),
					'base'                      => $this->base,
					'category'                  => esc_html__('by MIKADO', 'mkd_core'),
					'icon'                      => 'icon-wpb-portfolio-marquee extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array_merge(
						array(
							array(
								'type'        => 'dropdown',
								'admin_label' => true,
								'heading'     => esc_html__('Image size', 'mkd_core'),
								'param_name'  => 'image_size',
								'value'       => array(
									esc_html__('Default', 'mkd_core')       => '',
									esc_html__('Original Size', 'mkd_core') => 'full',
									esc_html__('Square', 'mkd_core')        => 'square',
									esc_html__('Landscape', 'mkd_core')     => 'landscape',
									esc_html__('Portrait', 'mkd_core')      => 'portrait',
									esc_html__('Custom', 'mkd_core')        => 'custom'
								),
								'description' => '',
								'group'       => esc_html__('Layout Options', 'mkd_core')
							),
							array(
								'type'        => 'textfield',
								'admin_label' => true,
								'heading'     => esc_html__('Image Dimensions', 'mkd_core'),
								'param_name'  => 'custom_image_dimensions',
								'value'       => '',
								'description' => esc_html__('Enter custom image dimensions. Enter image size in pixels: 200x100 (Width x Height)', 'mkd_core'),
								'group'       => esc_html__('Layout Options', 'mkd_core'),
								'dependency'  => array('element' => 'image_size', 'value' => 'custom')
							),
							array(
								'type'        => 'dropdown',
								'heading'     => esc_html__('Number of Columns', 'mkd_core'),
								'param_name'  => 'columns',
								'admin_label' => true,
								'save_always' => true,
								'value'       => array(
									esc_html__('Two', 'mkd_core')   => '2',
									esc_html__('Three', 'mkd_core') => '3',
									esc_html__('Four', 'mkd_core')  => '4',
									esc_html__('Five', 'mkd_core')	=> '5'
								),
								'description' => esc_html__('Number of portfolios that are showing at the same time in full width (on smaller screens is responsive so there will be less items shown)', 'mkd_core'),
								'group'       => esc_html__('Layout Options', 'mkd_core')
							),
							array(
								'type'        => 'dropdown',
								'heading'     => esc_html__('Shift duration', 'mkd_core'),
								'admin_label' => true,
								'param_name'  => 'autoplay',
								'group'       => esc_html__('Layout Options', 'mkd_core'),
								'value'       => array(
									'3'       => '3',
									'5'       => '5',
									'10'      => '10',
									esc_html__('Disable', 'mkd_core') => 'disable'
								),
								'save_always' => true,
								'description' => esc_html__('Time in seconds between two shifts', 'mkd_core'),
							),
							array(
								'type'        => 'dropdown',
								'heading'     => esc_html__('Enable Overlay on Hover', 'mkd_core'),
								'param_name'  => 'overlay_on_hover',
								'group'       => esc_html__('Layout Options', 'mkd_core'),
								'value'       => array(
									esc_html__('Yes', 'mkd_core') => 'yes',
									esc_html__('No', 'mkd_core')  => 'no'
								),
								'admin_label' => true,
								'save_always' => true
							),
							array(
								'type'        => 'dropdown',
								'heading'     => esc_html__('Open Portfolio Single in New Page', 'mkd_core'),
								'param_name'  => 'target',
								'group'       => esc_html__('Layout Options', 'mkd_core'),
								'value'       => array(
									esc_html__('Yes', 'mkd_core') => '_blank',
									esc_html__('No', 'mkd_core')  => '_self'
								),
								'admin_label' => true,
								'save_always' => true
							),
						),
						PortfolioQuery::getInstance()->queryVCParams()
					)
				)
			);
		}
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
			'image_size'              => 'full',
			'columns'                 => '',
			'custom_image_dimensions' => '',
			'overlay_on_hover'		  => '',
			'autoplay'				  => '',
			'target'				  => '_blank'
		);

		$args   = array_merge($args, PortfolioQuery::getInstance()->getShortcodeAtts());
		$params = shortcode_atts($args, $atts);

		$query = PortfolioQuery::getInstance()->buildQueryObject($params);

		$params['query']          = $query;
		$params['holder_data']    = $this->getHolderData($params);
		$params['thumb_size']     = $this->getThumbSize($params);
		$params['caller']         = $this;
		$params['holder_classes'] = $this->getHolderClasses($params);

		$params['use_custom_image_size'] = false;
		if($params['thumb_size'] === 'custom' && !empty($params['custom_image_dimensions'])) {
			$params['use_custom_image_size'] = true;
			$params['custom_image_sizes']    = $this->getCustomImageSize($params['custom_image_dimensions']);
		}

		return mkd_core_get_shortcode_module_template_part('portfolio-marquee/templates/portfolio-marquee-holder', 'portfolio', '', $params);
	}

	private function getHolderData($params) {
		$data = array();

		$data['data-columns']           = $params['columns'];
		$data['data-autoplay']           = $params['autoplay'];

		return $data;
	}

	public function getThumbSize($params) {
		switch($params['image_size']) {
			case 'landscape':
				$thumbSize = 'medigroup_mikado_landscape';
				break;
			case 'portrait':
				$thumbSize = 'medigroup_mikado_portrait';
				break;
			case 'square':
				$thumbSize = 'medigroup_mikado_square';
				break;
			case 'full':
				$thumbSize = 'full';
				break;
			case 'custom':
				$thumbSize = 'custom';
				break;
			default:
				$thumbSize = 'full';
				break;
		}

		return $thumbSize;
	}

	private function getHolderClasses($params) {
		$classes = array(
			'mkd-portfolio-marquee'
		);

		if ($params['overlay_on_hover'] == 'yes') {
			$classes[] = 'mkd-ptfm-overlay';
		}

		return $classes;
	}

	private function getCustomImageSize($customImageSize) {
		$imageSize = trim($customImageSize);
		//Find digits
		preg_match_all('/\d+/', $imageSize, $matches);
		if(!empty($matches[0])) {
			return array(
				$matches[0][0],
				$matches[0][1]
			);
		}

		return false;
	}
}