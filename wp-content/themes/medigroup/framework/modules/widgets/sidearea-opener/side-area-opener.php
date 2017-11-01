<?php

class MedigroupMikadoSideAreaOpener extends MedigroupMikadoWidget {
	public function __construct() {
		parent::__construct(
			'mkd_side_area_opener', // Base ID
			esc_html__('Mikado Side Area Opener', 'medigroup') // Name
		);

		$this->setParams();
	}

	protected function setParams() {

		$this->params = array(
			array(
				'name'        => 'side_area_opener_icon_color',
				'type'        => 'textfield',
				'title'       => esc_html__('Icon Color', 'medigroup'),
				'description' => esc_html__('Define color for Side Area opener icon', 'medigroup')
			)
		);

	}


	public function widget($args, $instance) {

		$sidearea_icon_styles = array();

		if(!empty($instance['side_area_opener_icon_color'])) {
			$sidearea_icon_styles[] = 'color: '.$instance['side_area_opener_icon_color'];
		}

		print $args['before_widget'];

		$icon_size = '';
		if(medigroup_mikado_options()->getOptionValue('side_area_predefined_icon_size')) {
			$icon_size = medigroup_mikado_options()->getOptionValue('side_area_predefined_icon_size');
		}

		$default_sidearea_opener = medigroup_mikado_options()->getOptionValue('side_area_enable_default_opener') === 'yes';

		$default_sidearea_opener_class = $default_sidearea_opener ? 'mkd-side-menu-button-opener-default' : '';

		?>
		<a class="mkd-side-menu-button-opener <?php echo esc_attr($icon_size.' '.$default_sidearea_opener_class); ?>" <?php medigroup_mikado_inline_style($sidearea_icon_styles) ?> href="javascript:void(0)">
			<?php echo medigroup_mikado_get_side_menu_icon_html(); ?>
		</a>

		<?php print $args['after_widget']; ?>

	<?php }

}