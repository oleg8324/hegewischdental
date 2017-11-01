<?php
namespace Medigroup\Modules\SocialShare;

use Medigroup\Modules\Shortcodes\Lib\ShortcodeInterface;

class SocialShare implements ShortcodeInterface {

	private $base;
	private $socialNetworks;

	function __construct() {
		$this->base           = 'mkd_social_share';
		$this->socialNetworks = array(
			'google_plus',
			'facebook',
			'twitter',
			'linkedin',
			'tumblr',
			'pinterest',
			'vk'
		);
		add_action('vc_before_init', array($this, 'vcMap'));
	}

	/**
	 * Returns base for shortcode
	 * @return string
	 */
	public function getBase() {
		return $this->base;
	}

	public function getSocialNetworks() {
		return $this->socialNetworks;
	}

	/**
	 * Maps shortcode to Visual Composer. Hooked on vc_before_init
	 */
	public function vcMap() {

		vc_map(array(
			'name'                      => esc_html__('Social Share', 'medigroup'),
			'base'                      => $this->getBase(),
			'icon'                      => 'icon-wpb-social-share extended-custom-icon',
			'category'                  => esc_html__('by MIKADO', 'medigroup'),
			'allowed_container_element' => 'vc_row',
			'params'                    => array(
				array(
					'type'        => 'dropdown',
					'heading'     => esc_html__('Type', 'medigroup'),
					'param_name'  => 'type',
					'admin_label' => true,
					'description' => esc_html__('Choose type of Social Share', 'medigroup'),
					'value'       => array(
						esc_html__('List', 'medigroup')     => 'list',
						esc_html__('Dropdown', 'medigroup') => 'dropdown'
					),
					'save_always' => true
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
			'type'      => 'list'
		);

		//Shortcode Parameters
		$params = shortcode_atts($args, $atts);

		//Is social share enabled
		$params['enable_social_share'] = (medigroup_mikado_options()->getOptionValue('enable_social_share') == 'yes') ? true : false;

		//Is social share enabled for post type
		$post_type         = get_post_type();
		$params['enabled'] = (medigroup_mikado_options()->getOptionValue('enable_social_share_on_'.$post_type)) ? true : false;

		//Social Networks Data
		$params['networks'] = $this->getSocialNetworksParams($params);

		$html = '';

		if($params['enable_social_share']) {
			if($params['enabled']) {
				$html .= medigroup_mikado_get_shortcode_module_template_part('templates/'.$params['type'], 'socialshare', '', $params);
			}
		}

		return $html;

	}

	/**
	 * Get Social Networks data to display
	 * @return array
	 */
	private function getSocialNetworksParams($params) {

		$networks   = array();

		foreach($this->socialNetworks as $net) {

			$html = '';
			if(medigroup_mikado_options()->getOptionValue('enable_'.$net.'_share') == 'yes') {

				$image                 = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full');
				$params                = array(
					'name' => $net
				);
				$params['link']        = $this->getSocialNetworkShareLink($net, $image);
				$params['icon']        = $this->getSocialNetworkIcon($net);
				$params['custom_icon'] = (medigroup_mikado_options()->getOptionValue($net.'_icon')) ? medigroup_mikado_options()->getOptionValue($net.'_icon') : '';
				$html                  = medigroup_mikado_get_shortcode_module_template_part('templates/parts/network', 'socialshare', '', $params);

			}

			$networks[$net] = $html;

		}

		return $networks;

	}

	/**
	 * Get share link for networks
	 *
	 * @param $net
	 * @param $image
	 *
	 * @return string
	 */
	private function getSocialNetworkShareLink($net, $image) {

		switch($net) {
			case 'facebook':
				$link = 'window.open(\'http://www.facebook.com/sharer.php?s=100&amp;p[title]='.urlencode(medigroup_mikado_addslashes(get_the_title())).'&amp;p[summary]='.urlencode(medigroup_mikado_addslashes(get_the_excerpt())).'&amp;p[url]='.urlencode(get_permalink()).'&amp;p[images][0]='.$image[0].'\', \'sharer\', \'toolbar=0,status=0,width=620,height=280\');';
				break;
			case 'twitter':
				$count_char  = (isset($_SERVER['https'])) ? 23 : 22;
				$twitter_via = (medigroup_mikado_options()->getOptionValue('twitter_via') !== '') ? ' via '.medigroup_mikado_options()->getOptionValue('twitter_via').' ' : '';
				$link        = 'window.open(\'http://twitter.com/home?status='.urlencode(medigroup_mikado_the_excerpt_max_charlength($count_char).$twitter_via).get_permalink().'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
				break;
			case 'google_plus':
				$link = 'popUp=window.open(\'https://plus.google.com/share?url='.urlencode(get_permalink()).'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
				break;
			case 'linkedin':
				$link = 'popUp=window.open(\'http://linkedin.com/shareArticle?mini=true&amp;url='.urlencode(get_permalink()).'&amp;title='.urlencode(get_the_title()).'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
				break;
			case 'tumblr':
				$link = 'popUp=window.open(\'http://www.tumblr.com/share/link?url='.urlencode(get_permalink()).'&amp;name='.urlencode(get_the_title()).'&amp;description='.urlencode(get_the_excerpt()).'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
				break;
			case 'pinterest':
				$link = 'popUp=window.open(\'http://pinterest.com/pin/create/button/?url='.urlencode(get_permalink()).'&amp;description='.medigroup_mikado_addslashes(get_the_title()).'&amp;media='.urlencode($image[0]).'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
				break;
			case 'vk':
				$link = 'popUp=window.open(\'http://vkontakte.ru/share.php?url='.urlencode(get_permalink()).'&amp;title='.urlencode(get_the_title()).'&amp;description='.urlencode(get_the_excerpt()).'&amp;image='.urlencode($image[0]).'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
				break;
			default:
				$link = '';
		}

		return $link;

	}

	private function getSocialNetworkIcon($net) {

		switch($net) {
			case 'facebook':
				$icon = 'fa fa-facebook';
				break;
			case 'twitter':
				$icon = 'fa fa-twitter';
				break;
			case 'google_plus':
				$icon = 'fa fa-google-plus';
				break;
			case 'linkedin':
				$icon = 'fa fa-linkedin';
				break;
			case 'tumblr':
				$icon = 'fa fa-tumblr';
				break;
			case 'pinterest':
				$icon = 'fa fa-pinterest-p';
				break;
			case 'vk':
				$icon = 'fa fa-vk';
				break;
			default:
				$icon = '';
		}

		return $icon;

	}

}