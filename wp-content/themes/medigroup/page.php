<?php $medigroup_sidebar = medigroup_mikado_sidebar_layout(); ?>
<?php get_header(); ?>
<?php medigroup_mikado_get_title(); ?>
<?php get_template_part('slider'); ?>
	<div class="mkd-container">
		<?php do_action('medigroup_mikado_after_container_open'); ?>
		<div class="mkd-container-inner clearfix">
			<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
				<div class="mkd-grid-row">
					<div <?php echo medigroup_mikado_get_content_sidebar_class(); ?>>
						<?php the_content(); ?>
						<?php do_action('medigroup_mikado_page_after_content'); ?>
					</div>

					<?php if(!in_array($medigroup_sidebar, array('default', ''))) : ?>
						<div <?php echo medigroup_mikado_get_sidebar_holder_class(); ?>>
							<?php get_sidebar(); ?>
						</div>
					<?php endif; ?>
				</div>
			<?php endwhile; endif; ?>
		</div>
		<?php do_action('medigroup_mikado_before_container_close'); ?>
	</div>
<?php get_footer(); ?>