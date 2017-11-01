<?php do_action('medigroup_mikado_before_site_logo'); ?>

	<div class="mkd-logo-wrapper">
		<a href="<?php echo esc_url(home_url('/')); ?>" style="height:90px;" <?php /* medigroup_mikado_inline_style($logo_styles); */ ?>>
			<img <?php echo medigroup_mikado_get_inline_attrs($logo_dimensions_attr); ?> class="mkd-normal-logo" src="<?php echo esc_url($logo_image); ?>" alt="logo"/>
			<?php if(!empty($logo_image_dark)) { ?>
				<img <?php echo medigroup_mikado_get_inline_attrs($logo_dimensions_attr); ?> class="mkd-dark-logo" src="<?php echo esc_url($logo_image_dark); ?>" alt="dark logo"/><?php } ?>
			<?php if(!empty($logo_image_light)) { ?>
				<img <?php echo medigroup_mikado_get_inline_attrs($logo_dimensions_attr); ?> class="mkd-light-logo" src="<?php echo esc_url($logo_image_light); ?>" alt="light logo"/><?php } ?>
		</a>
	</div>

<?php do_action('medigroup_mikado_after_site_logo'); ?>