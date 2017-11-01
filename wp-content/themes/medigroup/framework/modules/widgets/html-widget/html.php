<?php

class MedigroupMikadoHtmlWidget extends MedigroupMikadoWidget {
    public function __construct() {
        parent::__construct(
            'mkd_html_widget', // Base ID
            esc_html__('Mikado Raw HTML', 'medigroup') // Name
        );

        $this->setParams();
    }

    protected function setParams() {
        $this->params = array(
            array(
                'name'  => 'html',
                'type'  => 'textarea',
                'title' => esc_html__('Raw HTML', 'medigroup')
            )
        );
    }

    public function widget($args, $instance) {
        print $args['before_widget']; ?>
        <div class="mkd-html-widget">
            <?php print $instance['html']; ?>
        </div>
        <?php print $args['after_widget'];
    }

}