<?php

/*** Audio Post Format ***/

$audio_post_format_meta_box = medigroup_mikado_add_meta_box(
	array(
		'scope' => array('post'),
		'title' => esc_html__('Audio Post Format', 'medigroup'),
		'name'  => 'post_format_audio_meta'
	)
);

medigroup_mikado_add_meta_box_field(
	array(
		'name'        => 'mkd_post_audio_link_meta',
		'type'        => 'text',
		'label'       => esc_html__('Link', 'medigroup'),
		'description' => esc_html__('Enter audion link', 'medigroup'),
		'parent'      => $audio_post_format_meta_box,

	)
);
