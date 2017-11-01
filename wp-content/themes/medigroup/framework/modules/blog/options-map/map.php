<?php

if(!function_exists('medigroup_mikado_blog_options_map')) {

    function medigroup_mikado_blog_options_map() {

        medigroup_mikado_add_admin_page(
            array(
                'slug'  => '_blog_page',
                'title' => esc_html__('Blog', 'medigroup'),
                'icon'  => 'fa fa-pencil-square-o'
            )
        );

        /**
         * Blog Lists
         */

        $custom_sidebars = medigroup_mikado_get_custom_sidebars();

        $panel_blog_lists = medigroup_mikado_add_admin_panel(
            array(
                'page'  => '_blog_page',
                'name'  => 'panel_blog_lists',
                'title' => esc_html__('Blog Lists', 'medigroup')
            )
        );

        medigroup_mikado_add_admin_field(array(
            'name'          => 'blog_list_type',
            'type'          => 'select',
            'label'         => esc_html__('Blog Layout for Archive Pages', 'medigroup'),
            'description'   => 'Choose a default blog layout',
            'default_value' => 'standard',
            'parent'        => $panel_blog_lists,
            'options'       => array(
                'standard'              => esc_html__('Blog: Standard', 'medigroup'),
                'split-column'          => esc_html__('Blog: Split Column', 'medigroup'),
                'masonry'               => esc_html__('Blog: Masonry', 'medigroup'),
                'masonry-full-width'    => esc_html__('Blog: Masonry Full Width', 'medigroup'),
                'standard-whole-post'   => esc_html__('Blog: Standard Whole Post', 'medigroup'),
            )
        ));

        medigroup_mikado_add_admin_field(array(
            'name'        => 'archive_sidebar_layout',
            'type'        => 'select',
            'label'       => esc_html__('Archive and Category Sidebar', 'medigroup'),
            'description' => esc_html__('Choose a sidebar layout for archived Blog Post Lists and Category Blog Lists', 'medigroup'),
            'parent'      => $panel_blog_lists,
            'options'     => array(
                'default'          => esc_html__('No Sidebar', 'medigroup'),
                'sidebar-33-right' => esc_html__('Sidebar 1/3 Right', 'medigroup'),
                'sidebar-25-right' => esc_html__('Sidebar 1/4 Right', 'medigroup'),
                'sidebar-33-left'  => esc_html__('Sidebar 1/3 Left', 'medigroup'),
                'sidebar-25-left'  => esc_html__('Sidebar 1/4 Left', 'medigroup'),
            )
        ));


        if(count($custom_sidebars) > 0) {
            medigroup_mikado_add_admin_field(array(
                'name'        => 'blog_custom_sidebar',
                'type'        => 'selectblank',
                'label'       => esc_html__('Sidebar to Display', 'medigroup'),
                'description' => esc_html__('Choose a sidebar to display on Blog Post Lists and Category Blog Lists. Default sidebar is "Sidebar Page"', 'medigroup'),
                'parent'      => $panel_blog_lists,
                'options'     => medigroup_mikado_get_custom_sidebars()
            ));
        }

        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'pagination',
                'default_value' => 'yes',
                'label'         => esc_html__('Pagination', 'medigroup'),
                'parent'        => $panel_blog_lists,
                'description'   => esc_html__('Enabling this option will display pagination links on bottom of Blog Post List', 'medigroup'),
                'args'          => array(
                    'dependence'             => true,
                    'dependence_hide_on_yes' => '',
                    'dependence_show_on_yes' => '#mkd_mkd_pagination_container'
                )
            )
        );

        $pagination_container = medigroup_mikado_add_admin_container(
            array(
                'name'            => 'mkd_pagination_container',
                'hidden_property' => 'pagination',
                'hidden_value'    => 'no',
                'parent'          => $panel_blog_lists,
            )
        );

        medigroup_mikado_add_admin_field(
            array(
                'parent'        => $pagination_container,
                'type'          => 'text',
                'name'          => 'blog_page_range',
                'default_value' => '',
                'label'         => esc_html__('Pagination Range limit', 'medigroup'),
                'description'   => esc_html__('Enter a number that will limit pagination to a certain range of links', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

        medigroup_mikado_add_admin_field(array(
            'name'        => 'masonry_pagination',
            'type'        => 'select',
            'label'       => esc_html__('Pagination on Masonry', 'medigroup'),
            'description' => esc_html__('Choose a pagination style for Masonry Blog List', 'medigroup'),
            'parent'      => $pagination_container,
            'options'     => array(
                'standard'        => esc_html__('Standard', 'medigroup'),
                'load-more'       => esc_html__('Load More', 'medigroup'),
                'infinite-scroll' => esc_html__('Infinite Scroll', 'medigroup')
            ),

        ));
        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'enable_load_more_pag',
                'default_value' => 'no',
                'label'         => esc_html__('Load More Pagination on Other Lists', 'medigroup'),
                'parent'        => $pagination_container,
                'description'   => esc_html__('Enable Load More Pagination on other lists', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'masonry_filter',
                'default_value' => 'no',
                'label'         => esc_html__('Masonry Filter', 'medigroup'),
                'parent'        => $panel_blog_lists,
                'description'   => esc_html__('Enabling this option will display category filter on Masonry and Masonry Full Width Templates', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );
        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'text',
                'name'          => 'number_of_chars',
                'default_value' => '',
                'label'         => esc_html__('Number of Words in Excerpt', 'medigroup'),
                'parent'        => $panel_blog_lists,
                'description'   => esc_html__('Enter a number of words in excerpt (article summary)', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );
        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'text',
                'name'          => 'standard_number_of_chars',
                'default_value' => '45',
                'label'         => esc_html__('Standard Type Number of Words in Excerpt', 'medigroup'),
                'parent'        => $panel_blog_lists,
                'description'   => esc_html__('Enter a number of words in excerpt (article summary)', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );
        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'text',
                'name'          => 'masonry_number_of_chars',
                'default_value' => '45',
                'label'         => esc_html__('Masonry Type Number of Words in Excerpt', 'medigroup'),
                'parent'        => $panel_blog_lists,
                'description'   => esc_html__('Enter a number of words in excerpt (article summary)', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );
        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'text',
                'name'          => 'split_column_number_of_chars',
                'default_value' => '45',
                'label'         => esc_html__('Split Column Type Number of Words in Excerpt', 'medigroup'),
                'parent'        => $panel_blog_lists,
                'description'   => esc_html__('Enter a number of words in excerpt (article summary)', 'medigroup'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

        /**
         * Blog Single
         */
        $panel_blog_single = medigroup_mikado_add_admin_panel(
            array(
                'page'  => '_blog_page',
                'name'  => 'panel_blog_single',
                'title' => esc_html__('Blog Single', 'medigroup')
            )
        );

        medigroup_mikado_add_admin_field(array(
            'name'          => 'blog_single_sidebar_layout',
            'type'          => 'select',
            'label'         => esc_html__('Sidebar Layout', 'medigroup'),
            'description'   => esc_html__('Choose a sidebar layout for Blog Single pages', 'medigroup'),
            'parent'        => $panel_blog_single,
            'options'       => array(
                'default'          => esc_html__('No Sidebar', 'medigroup'),
                'sidebar-33-right' => esc_html__('Sidebar 1/3 Right', 'medigroup'),
                'sidebar-25-right' => esc_html__('Sidebar 1/4 Right', 'medigroup'),
                'sidebar-33-left'  => esc_html__('Sidebar 1/3 Left', 'medigroup'),
                'sidebar-25-left'  => esc_html__('Sidebar 1/4 Left', 'medigroup'),
            ),
            'default_value' => 'default'
        ));


        if(count($custom_sidebars) > 0) {
            medigroup_mikado_add_admin_field(array(
                'name'        => 'blog_single_custom_sidebar',
                'type'        => 'selectblank',
                'label'       => esc_html__('Sidebar to Display', 'medigroup'),
                'description' => esc_html__('Choose a sidebar to display on Blog Single pages. Default sidebar is "Sidebar"', 'medigroup'),
                'parent'      => $panel_blog_single,
                'options'     => medigroup_mikado_get_custom_sidebars()
            ));
        }
        medigroup_mikado_add_admin_field(array(
            'name'          => 'blog_single_comments',
            'type'          => 'yesno',
            'label'         => esc_html__('Show Comments', 'medigroup'),
            'description'   => esc_html__('Enabling this option will show comments on your page.', 'medigroup'),
            'parent'        => $panel_blog_single,
            'default_value' => 'yes'
        ));

        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'blog_single_navigation',
                'default_value' => 'no',
                'label'         => esc_html__('Enable Prev/Next Single Post Navigation Links', 'medigroup'),
                'parent'        => $panel_blog_single,
                'description'   => esc_html__('Enable navigation links through the blog posts (left and right arrows will appear)', 'medigroup'),
                'args'          => array(
                    'dependence'             => true,
                    'dependence_hide_on_yes' => '',
                    'dependence_show_on_yes' => '#mkd_mkd_blog_single_navigation_container'
                )
            )
        );

        $blog_single_navigation_container = medigroup_mikado_add_admin_container(
            array(
                'name'            => 'mkd_blog_single_navigation_container',
                'hidden_property' => 'blog_single_navigation',
                'hidden_value'    => 'no',
                'parent'          => $panel_blog_single,
            )
        );

        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'blog_navigation_through_same_category',
                'default_value' => 'no',
                'label'         => esc_html__('Enable Navigation Only in Current Category', 'medigroup'),
                'description'   => esc_html__('Limit your navigation only through current category', 'medigroup'),
                'parent'        => $blog_single_navigation_container,
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

        medigroup_mikado_add_admin_field(array(
            'type'          => 'yesno',
            'name'          => 'blog_enable_single_tags',
            'default_value' => 'yes',
            'label'         => esc_html__('Enable Tags on Single Post', 'medigroup'),
            'description'   => esc_html__('Enabling this option will display posts\s tags on single post page', 'medigroup'),
            'parent'        => $panel_blog_single
        ));


        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'blog_author_info',
                'default_value' => 'no',
                'label'         => esc_html__('Show Author Info Box', 'medigroup'),
                'parent'        => $panel_blog_single,
                'description'   => esc_html__('Enabling this option will display author name and descriptions on Blog Single pages', 'medigroup'),
                'args'          => array(
                    'dependence'             => true,
                    'dependence_hide_on_yes' => '',
                    'dependence_show_on_yes' => '#mkd_mkd_blog_single_author_info_container'
                )
            )
        );

        $blog_single_author_info_container = medigroup_mikado_add_admin_container(
            array(
                'name'            => 'mkd_blog_single_author_info_container',
                'hidden_property' => 'blog_author_info',
                'hidden_value'    => 'no',
                'parent'          => $panel_blog_single,
            )
        );

        medigroup_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'blog_author_info_email',
                'default_value' => 'no',
                'label'         => esc_html__('Show Author Email', 'medigroup'),
                'description'   => esc_html__('Enabling this option will show author email', 'medigroup'),
                'parent'        => $blog_single_author_info_container,
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

    }

    add_action('medigroup_mikado_options_map', 'medigroup_mikado_blog_options_map', 12);

}











