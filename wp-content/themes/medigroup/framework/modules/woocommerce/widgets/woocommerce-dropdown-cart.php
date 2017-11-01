<?php

class MedigroupMikadoWoocommerceDropdownCart extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'mkd_woocommerce_dropdown_cart', // Base ID
            esc_html__('Mikado Woocommerce Dropdown Cart', 'medigroup'), // Name
            array('description' => esc_html__('Mikado Woocommerce Dropdown Cart', 'medigroup'),) // Args
        );

        $this->setParams();
    }

    protected function setParams() {

        $this->params = array(
            array(
                'name'        => 'woocommerce_dropdown_cart_margin',
                'type'        => 'textfield',
                'title'       => esc_html__('Margin (top right bottom left)', 'medigroup'),
                'description' => esc_html__('Define margin for woocommerce dropdown cart icon', 'medigroup')
            ),
            array(
                'type'        => 'dropdown',
                'title'       => esc_html__('Enable Cart Info', 'medigroup'),
                'name'        => 'woocommerce_enable_cart_info',
                'options'     => array(
                    'no'  => 'No',
                    'yes' => 'Yes'
                ),
                'description' => esc_html__('Enabling this option will show cart info (products number and price) at the right side of dropdown cart icon', 'medigroup')
            ),
        );
    }

    /**
     * Generate widget form based on $params attribute
     *
     * @param array $instance
     *
     * @return null
     */
    public function form($instance) {
        if(is_array($this->params) && count($this->params)) {
            foreach($this->params as $param_array) {
                $param_name    = $param_array['name'];
                ${$param_name} = isset($instance[$param_name]) ? esc_attr($instance[$param_name]) : '';
            }

            foreach($this->params as $param) {
                switch($param['type']) {
                    case 'textfield':
                        ?>
                        <p>
                            <label for="<?php echo esc_attr($this->get_field_id($param['name'])); ?>"><?php echo
                                esc_html($param['title']); ?>:</label>
                            <input class="widefat" id="<?php echo esc_attr($this->get_field_id($param['name'])); ?>"
                                name="<?php echo esc_attr($this->get_field_name($param['name'])); ?>" type="text"
                                value="<?php echo esc_attr(${$param['name']}); ?>"/>
                            <?php if(!empty($param['description'])) : ?>
                                <span
                                    class="mkd-field-description"><?php echo esc_html($param['description']); ?></span>
                            <?php endif; ?>
                        </p>
                        <?php
                        break;
                    case 'dropdown':
                        ?>
                        <p>
                            <label for="<?php echo esc_attr($this->get_field_id($param['name'])); ?>"><?php echo
                                esc_html($param['title']); ?>:</label>
                            <?php if(isset($param['options']) && is_array($param['options']) && count($param['options'])) { ?>
                                <select class="widefat"
                                    name="<?php echo esc_attr($this->get_field_name($param['name'])); ?>"
                                    id="<?php echo esc_attr($this->get_field_id($param['name'])); ?>">
                                    <?php foreach($param['options'] as $param_option_key => $param_option_val) {
                                        $option_selected = '';
                                        if(${$param['name']} == $param_option_key) {
                                            $option_selected = 'selected';
                                        }
                                        ?>
                                        <option <?php echo esc_attr($option_selected); ?>
                                            value="<?php echo esc_attr($param_option_key); ?>"><?php echo esc_attr($param_option_val); ?></option>
                                    <?php } ?>
                                </select>
                            <?php } ?>
                            <?php if(!empty($param['description'])) : ?>
                                <span
                                    class="mkd-field-description"><?php echo esc_html($param['description']); ?></span>
                            <?php endif; ?>
                        </p>

                        <?php
                        break;
                }
            }
        } else { ?>
            <p><?php esc_html_e('There are no options for this widget.', 'medigroup'); ?></p>
        <?php }
    }

    /**
     * @param array $new_instance
     * @param array $old_instance
     *
     * @return array
     */
    public function update($new_instance, $old_instance) {
        $instance = array();
        foreach($this->params as $param) {
            $param_name = $param['name'];

            $instance[$param_name] = sanitize_text_field($new_instance[$param_name]);
        }

        return $instance;
    }

    public function widget($args, $instance) {
        global $post;
        extract($args);

        global $woocommerce;

        $icon_styles = array();

        if(!empty($instance['woocommerce_dropdown_cart_margin'])) {
            $icon_styles[] = 'padding: '.$instance['woocommerce_dropdown_cart_margin'];
        }

        $icon_class = 'mkd-cart-info-is-disabled';

        if(!empty($instance['woocommerce_enable_cart_info']) && $instance['woocommerce_enable_cart_info'] === 'yes') {
            $icon_class = 'mkd-cart-info-is-active';
        }

        $cart_description = medigroup_mikado_options()->getOptionValue('mkd_woo_dropdown_cart_description');
        ?>
        <div
            class="mkd-shopping-cart-holder <?php echo esc_html($icon_class); ?>" <?php medigroup_mikado_inline_style($icon_styles) ?>>
            <div class="mkd-shopping-cart-inner">
                <?php $cart_is_empty = sizeof($woocommerce->cart->get_cart()) <= 0; ?>
                <a class="mkd-header-cart"
                    href="<?php echo esc_url($woocommerce->cart->get_cart_url()); ?>">
					<span class="mkd-cart-icon icon-ecommerce-bag"><span
                            class="mkd-cart-number"><?php echo sprintf(_n('%d', '%d', WC()->cart->cart_contents_count, 'medigroup'), WC()->cart->cart_contents_count); ?></span></span>
					<span class="mkd-cart-info">
						<span
                            class="mkd-cart-info-number"><?php echo sprintf(_n('%d item', '%d items', WC()->cart->cart_contents_count, 'medigroup'), WC()->cart->cart_contents_count); ?></span>
						<span
                            class="mkd-cart-info-total"><?php echo wp_kses($woocommerce->cart->get_cart_subtotal(), array(
                                'span' => array(
                                    'class' => true,
                                    'id'    => true
                                )
                            )); ?></span>
					</span>
                </a>
                <?php if(!$cart_is_empty) : ?>
                    <div class="mkd-shopping-cart-dropdown">
                        <ul>
                            <?php foreach($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) :
                                $_product = $cart_item['data'];
                                // Only display if allowed
                                if(!$_product->exists() || $cart_item['quantity'] == 0) {
                                    continue;
                                }
                                // Get price
                                $product_price = get_option('woocommerce_tax_display_cart') == 'excl' ? $_product->get_price_excluding_tax() : $_product->get_price_including_tax();
                                ?>
                                <li>
                                    <div class="mkd-item-image-holder">
                                        <a
                                            href="<?php echo esc_url(get_permalink($cart_item['product_id'])); ?>">
                                            <?php echo wp_kses($_product->get_image(), array(
                                                'img' => array(
                                                    'src'    => true,
                                                    'width'  => true,
                                                    'height' => true,
                                                    'class'  => true,
                                                    'alt'    => true,
                                                    'title'  => true,
                                                    'id'     => true
                                                )
                                            )); ?>
                                        </a>
                                    </div>
                                    <div class="mkd-item-info-holder">
                                        <h5 class="mkd-product-title"><a
                                                href="<?php echo esc_url(get_permalink($cart_item['product_id'])); ?>"><?php echo apply_filters('medigroup_mikado_woo_widget_cart_product_title', $_product->get_title(), $_product); ?></a>
                                        </h5>
                                        <div class="mkd-quantity-pric">
											<span
                                                class="mkd-quantity"><?php echo esc_html($cart_item['quantity']); ?></span>
                                            <span> x </span>
                                            <?php echo apply_filters('medigroup_mikado_woo_cart_item_price_html', wc_price($product_price), $cart_item, $cart_item_key); ?>
                                        </div>
                                        <?php echo apply_filters('medigroup_mikado_woo_cart_item_remove_link', sprintf('<a href="%s" class="remove" title="%s"><span aria-hidden="true" class="mkd-icon-font-elegant icon_close mkd-icon-element"></span></a>', esc_url($woocommerce->cart->get_remove_url($cart_item_key)), esc_html__('Remove this item', 'medigroup')), $cart_item_key); ?>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                            <div class="mkd-cart-bottom">
                                <div class="mkd-subtotal-holder clearfix">
                                    <span class="mkd-total"><?php esc_html_e('Total:', 'medigroup'); ?></span>
									<span class="mkd-total-amount">
										<?php echo wp_kses($woocommerce->cart->get_cart_subtotal(), array(
                                            'span' => array(
                                                'class' => true,
                                                'id'    => true
                                            )
                                        )); ?>
									</span>
                                </div>
                                <?php if(!empty($cart_description)) { ?>
                                    <div class="mkd-cart-description">
                                        <div class="mkd-cart-description-inner">
                                            <span><?php echo esc_html($cart_description); ?></span>
                                        </div>
                                    </div>
                                <?php } ?>
                                <div class="mkd-btns-holder clearfix">
                                    <?php echo medigroup_mikado_get_button_html(array(
                                        'link'         => $woocommerce->cart->get_checkout_url(),
                                        'custom_class' => 'checkout',
                                        'text'         => esc_html__('Checkout', 'medigroup'),
                                        'size'         => 'small',
                                        'type'         => 'solid'
                                    )); ?>
                                    <?php echo medigroup_mikado_get_button_html(array(
                                        'link'         => $woocommerce->cart->get_cart_url(),
                                        'custom_class' => 'view-cart',
                                        'text'         => esc_html__('View Cart', 'medigroup'),
                                        'size'         => 'small',
                                        'type'         => 'solid'
                                    )); ?>
                                </div>
                            </div>
                        </ul>
                    </div>
                <?php else : ?>
                    <div class="mkd-shopping-cart-dropdown">
                        <ul>
                            <li class="mkd-empty-cart"><?php esc_html_e('No products in the cart.', 'medigroup'); ?></li>
                        </ul>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}

add_action('widgets_init', create_function('', 'register_widget( "MedigroupMikadoWoocommerceDropdownCart" );'));

add_filter('add_to_cart_fragments', 'medigroup_mikado_woocommerce_header_add_to_cart_fragment');

function medigroup_mikado_woocommerce_header_add_to_cart_fragment($fragments) {
    global $woocommerce;

    $cart_description = medigroup_mikado_options()->getOptionValue('mkd_woo_dropdown_cart_description');

    ob_start();

    ?>

    <div class="mkd-shopping-cart-inner">
        <?php $cart_is_empty = sizeof($woocommerce->cart->get_cart()) <= 0; ?>
        <a class="mkd-header-cart" href="<?php echo esc_url($woocommerce->cart->get_cart_url()); ?>">
			<span class="mkd-cart-icon icon-ecommerce-bag"><span
                    class="mkd-cart-number"><?php echo sprintf(_n('%d', '%d', WC()->cart->cart_contents_count, 'medigroup'), WC()->cart->cart_contents_count); ?></span></span>
			<span class="mkd-cart-info">
				<span
                    class="mkd-cart-info-number"><?php echo sprintf(_n('%d item', '%d items', WC()->cart->cart_contents_count, 'medigroup'), WC()->cart->cart_contents_count); ?></span>
				<span
                    class="mkd-cart-info-total"><?php echo wp_kses($woocommerce->cart->get_cart_subtotal(), array(
                        'span' => array(
                            'class' => true,
                            'id'    => true
                        )
                    )); ?></span>
			</span>
        </a>
        <?php if(!$cart_is_empty) : ?>
            <div class="mkd-shopping-cart-dropdown">
                <ul>
                    <?php foreach($woocommerce->cart->get_cart() as $cart_item_key => $cart_item) :
                        $_product = $cart_item['data'];
                        // Only display if allowed
                        if(!$_product->exists() || $cart_item['quantity'] == 0) {
                            continue;
                        }
                        // Get price
                        $product_price = get_option('woocommerce_tax_display_cart') == 'excl' ? $_product->get_price_excluding_tax() : $_product->get_price_including_tax();
                        ?>
                        <li>
                            <div class="mkd-item-image-holder">
                                <a
                                    href="<?php echo esc_url(get_permalink($cart_item['product_id'])); ?>">
                                    <?php echo wp_kses($_product->get_image(), array(
                                        'img' => array(
                                            'src'    => true,
                                            'width'  => true,
                                            'height' => true,
                                            'class'  => true,
                                            'alt'    => true,
                                            'title'  => true,
                                            'id'     => true
                                        )
                                    )); ?>
                                </a>
                            </div>
                            <div class="mkd-item-info-holder">
                                <h5 class="mkd-product-title"><a
                                        href="<?php echo esc_url(get_permalink($cart_item['product_id'])); ?>"><?php echo apply_filters('medigroup_mikado_woo_widget_cart_product_title', $_product->get_title(), $_product); ?></a>
                                </h5>
                                <div class="mkd-quantity-price">
                                    <span class="mkd-quantity"><?php echo esc_html($cart_item['quantity']); ?></span>
                                    <span> x </span>
                                    <?php echo apply_filters('medigroup_mikado_woo_cart_item_price_html', wc_price($product_price), $cart_item, $cart_item_key); ?>
                                </div>
                                <?php echo apply_filters('medigroup_mikado_woo_cart_item_remove_link', sprintf('<a href="%s" class="remove" title="%s"><span aria-hidden="true" class="mkd-icon-font-elegant icon_close mkd-icon-element"></span></a>', esc_url($woocommerce->cart->get_remove_url($cart_item_key)), esc_html__('Remove this item', 'medigroup')), $cart_item_key); ?>
                            </div>
                        </li>
                    <?php endforeach; ?>
                    <div class="mkd-cart-bottom">
                        <div class="mkd-subtotal-holder clearfix">
                            <span class="mkd-total"><?php esc_html_e('Total:', 'medigroup'); ?></span>
							<span class="mkd-total-amount">
								<?php echo wp_kses($woocommerce->cart->get_cart_subtotal(), array(
                                    'span' => array(
                                        'class' => true,
                                        'id'    => true
                                    )
                                )); ?>
							</span>
                        </div>
                        <?php if(!empty($cart_description)) { ?>
                            <div class="mkd-cart-description">
                                <div class="mkd-cart-description-inner">
                                    <span><?php echo esc_html($cart_description); ?></span>
                                </div>
                            </div>
                        <?php } ?>
                        <div class="mkd-btns-holder clearfix">
                            <?php echo medigroup_mikado_get_button_html(array(
                                'link'         => $woocommerce->cart->get_cart_url(),
                                'custom_class' => 'view-cart',
                                'text'         => esc_html__('View Cart', 'medigroup'),
                                'size'         => 'small',
                                'type'         => 'solid'
                            )); ?>
                            <?php echo medigroup_mikado_get_button_html(array(
                                'link'         => $woocommerce->cart->get_checkout_url(),
                                'custom_class' => 'checkout',
                                'text'         => esc_html__('Checkout', 'medigroup'),
                                'size'         => 'small',
                                'type'         => 'solid'
                            )); ?>
                        </div>
                    </div>
                </ul>
            </div>
        <?php else : ?>
            <div class="mkd-shopping-cart-dropdown">
                <ul>
                    <li class="mkd-empty-cart"><?php esc_html_e('No products in the cart.', 'medigroup'); ?></li>
                </ul>
            </div>
        <?php endif; ?>
    </div>

    <?php
    $fragments['div.mkd-shopping-cart-inner'] = ob_get_clean();

    return $fragments;
}

?>