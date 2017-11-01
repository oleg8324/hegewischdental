<div class="mkd-grid-row">
    <div <?php echo medigroup_mikado_get_content_sidebar_class(); ?>>
        <div class="mkd-blog-holder mkd-blog-single <?php echo esc_attr($single_template); ?>">
            <?php medigroup_mikado_get_single_html(); ?>
        </div>
    </div>

    <?php if(!in_array($sidebar, array('default', ''))) : ?>
        <div <?php echo medigroup_mikado_get_sidebar_holder_class(); ?>>
            <?php get_sidebar(); ?>
        </div>
    <?php endif; ?>
</div>