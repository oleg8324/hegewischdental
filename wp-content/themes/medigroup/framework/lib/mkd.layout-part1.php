<?php

/*
   Interface: iMedigroupMikadoLayoutNode
   A interface that implements Layout Node methods
*/

interface iMedigroupMikadoLayoutNode {
	public function hasChidren();

	public function getChild($key);

	public function addChild($key, $value);
}

/*
   Interface: iMedigroupMikadoRender
   A interface that implements Render methods
*/

interface iMedigroupMikadoRender {
	public function render($factory);
}

/*
   Class: MedigroupMikadoPanel
   A class that initializes Mikado Panel
*/

class MedigroupMikadoPanel implements iMedigroupMikadoLayoutNode, iMedigroupMikadoRender {

	public $children;
	public $title;
	public $name;
	public $hidden_property;
	public $hidden_value;
	public $hidden_values;

	function __construct($title = "", $name = "", $hidden_property = "", $hidden_value = "", $hidden_values = array()) {
		$this->children        = array();
		$this->title           = $title;
		$this->name            = $name;
		$this->hidden_property = $hidden_property;
		$this->hidden_value    = $hidden_value;
		$this->hidden_values   = $hidden_values;
	}

	public function hasChidren() {
		return (count($this->children) > 0) ? true : false;
	}

	public function getChild($key) {
		return $this->children[$key];
	}

	public function addChild($key, $value) {
		$this->children[$key] = $value;
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			if(medigroup_mikado_option_get_value($this->hidden_property) == $this->hidden_value) {
				$hidden = true;
			} else {
				foreach($this->hidden_values as $value) {
					if(medigroup_mikado_option_get_value($this->hidden_property) == $value) {
						$hidden = true;
					}

				}
			}
		}
		?>
		<div class="mkd-page-form-section-holder" id="mkd_<?php echo esc_attr($this->name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>
			<h3 class="mkd-page-section-title"><?php echo esc_html($this->title); ?></h3>
			<?php
			foreach($this->children as $child) {
				$this->renderChild($child, $factory);
			}
			?>
		</div>
		<?php
	}

	public function renderChild(iMedigroupMikadoRender $child, $factory) {
		$child->render($factory);
	}
}

/*
   Class: MedigroupMikadoContainer
   A class that initializes Mikado Container
*/

class MedigroupMikadoContainer implements iMedigroupMikadoLayoutNode, iMedigroupMikadoRender {

	public $children;
	public $name;
	public $hidden_property;
	public $hidden_value;
	public $hidden_values;

	function __construct($name = "", $hidden_property = "", $hidden_value = "", $hidden_values = array()) {
		$this->children        = array();
		$this->name            = $name;
		$this->hidden_property = $hidden_property;
		$this->hidden_value    = $hidden_value;
		$this->hidden_values   = $hidden_values;
	}

	public function hasChidren() {
		return (count($this->children) > 0) ? true : false;
	}

	public function getChild($key) {
		return $this->children[$key];
	}

	public function addChild($key, $value) {
		$this->children[$key] = $value;
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			if(medigroup_mikado_option_get_value($this->hidden_property) == $this->hidden_value) {
				$hidden = true;
			} else {
				foreach($this->hidden_values as $value) {
					if(medigroup_mikado_option_get_value($this->hidden_property) == $value) {
						$hidden = true;
					}

				}
			}
		}
		?>
		<div class="mkd-page-form-container-holder" id="mkd_<?php echo esc_attr($this->name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>
			<?php
			foreach($this->children as $child) {
				$this->renderChild($child, $factory);
			}
			?>
		</div>
		<?php
	}

	public function renderChild(iMedigroupMikadoRender $child, $factory) {
		$child->render($factory);
	}
}


/*
   Class: MedigroupMikadoContainerNoStyle
   A class that initializes Mikado Container without css classes
*/

class MedigroupMikadoContainerNoStyle implements iMedigroupMikadoLayoutNode, iMedigroupMikadoRender {

	public $children;
	public $name;
	public $hidden_property;
	public $hidden_value;
	public $hidden_values;

	function __construct($name = "", $hidden_property = "", $hidden_value = "", $hidden_values = array()) {
		$this->children        = array();
		$this->name            = $name;
		$this->hidden_property = $hidden_property;
		$this->hidden_value    = $hidden_value;
		$this->hidden_values   = $hidden_values;
	}

	public function hasChidren() {
		return (count($this->children) > 0) ? true : false;
	}

	public function getChild($key) {
		return $this->children[$key];
	}

	public function addChild($key, $value) {
		$this->children[$key] = $value;
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			if(medigroup_mikado_option_get_value($this->hidden_property) == $this->hidden_value) {
				$hidden = true;
			} else {
				foreach($this->hidden_values as $value) {
					if(medigroup_mikado_option_get_value($this->hidden_property) == $value) {
						$hidden = true;
					}

				}
			}
		}
		?>
		<div id="mkd_<?php echo esc_attr($this->name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>
			<?php
			foreach($this->children as $child) {
				$this->renderChild($child, $factory);
			}
			?>
		</div>
		<?php
	}

	public function renderChild(iMedigroupMikadoRender $child, $factory) {
		$child->render($factory);
	}
}

/*
   Class: MedigroupMikadoGroup
   A class that initializes Mikado Group
*/

class MedigroupMikadoGroup implements iMedigroupMikadoLayoutNode, iMedigroupMikadoRender {

	public $children;
	public $title;
	public $description;

	function __construct($title = "", $description = "") {
		$this->children    = array();
		$this->title       = $title;
		$this->description = $description;
	}

	public function hasChidren() {
		return (count($this->children) > 0) ? true : false;
	}

	public function getChild($key) {
		return $this->children[$key];
	}

	public function addChild($key, $value) {
		$this->children[$key] = $value;
	}

	public function render($factory) {
		?>

		<div class="mkd-page-form-section">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($this->title); ?></h4>

				<p><?php echo esc_html($this->description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->

			<div class="mkd-section-content">
				<div class="container-fluid">
					<?php
					foreach($this->children as $child) {
						$this->renderChild($child, $factory);
					}
					?>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php
	}

	public function renderChild(iMedigroupMikadoRender $child, $factory) {
		$child->render($factory);
	}
}

/*
   Class: MedigroupMikadoNotice
   A class that initializes Mikado Notice
*/

class MedigroupMikadoNotice implements iMedigroupMikadoRender {

	public $children;
	public $title;
	public $description;
	public $notice;
	public $hidden_property;
	public $hidden_value;
	public $hidden_values;

	function __construct($title = "", $description = "", $notice = "", $hidden_property = "", $hidden_value = "", $hidden_values = array()) {
		$this->children        = array();
		$this->title           = $title;
		$this->description     = $description;
		$this->notice          = $notice;
		$this->hidden_property = $hidden_property;
		$this->hidden_value    = $hidden_value;
		$this->hidden_values   = $hidden_values;
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			if(medigroup_mikado_option_get_value($this->hidden_property) == $this->hidden_value) {
				$hidden = true;
			} else {
				foreach($this->hidden_values as $value) {
					if(medigroup_mikado_option_get_value($this->hidden_property) == $value) {
						$hidden = true;
					}

				}
			}
		}
		?>

		<div class="mkd-page-form-section"<?php if($hidden) { ?> style="display: none"<?php } ?>>


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($this->title); ?></h4>

				<p><?php echo esc_html($this->description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->

			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="alert alert-warning">
						<?php echo esc_html($this->notice); ?>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php
	}
}

/*
   Class: MedigroupMikadoRow
   A class that initializes Mikado Row
*/

class MedigroupMikadoRow implements iMedigroupMikadoLayoutNode, iMedigroupMikadoRender {

	public $children;
	public $next;

	function __construct($next = false) {
		$this->children = array();
		$this->next     = $next;
	}

	public function hasChidren() {
		return (count($this->children) > 0) ? true : false;
	}

	public function getChild($key) {
		return $this->children[$key];
	}

	public function addChild($key, $value) {
		$this->children[$key] = $value;
	}

	public function render($factory) {
		?>
		<div class="row<?php if($this->next) {
			echo " next-row";
		} ?>">
			<?php
			foreach($this->children as $child) {
				$this->renderChild($child, $factory);
			}
			?>
		</div>
		<?php
	}

	public function renderChild(iMedigroupMikadoRender $child, $factory) {
		$child->render($factory);
	}
}

/*
   Class: MedigroupMikadoTitle
   A class that initializes Mikado Title
*/

class MedigroupMikadoTitle implements iMedigroupMikadoRender {
	private $name;
	private $title;
	public $hidden_property;
	public $hidden_values = array();

	function __construct($name = "", $title = "", $hidden_property = "", $hidden_value = "") {
		$this->title           = $title;
		$this->name            = $name;
		$this->hidden_property = $hidden_property;
		$this->hidden_value    = $hidden_value;
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			if(medigroup_mikado_option_get_value($this->hidden_property) == $this->hidden_value) {
				$hidden = true;
			}
		}
		?>
		<h5 class="mkd-page-section-subtitle" id="mkd_<?php echo esc_attr($this->name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>><?php echo esc_html($this->title); ?></h5>
		<?php
	}
}

/*
   Class: MedigroupMikadoField
   A class that initializes Mikado Field
*/

class MedigroupMikadoField implements iMedigroupMikadoRender {
	private $type;
	private $name;
	private $default_value;
	private $label;
	private $description;
	private $options = array();
	private $args = array();
	public $hidden_property;
	public $hidden_values = array();


	function __construct($type, $name, $default_value = "", $label = "", $description = "", $options = array(), $args = array(), $hidden_property = "", $hidden_values = array()) {
		global $medigroup_Framework;
		$this->type            = $type;
		$this->name            = $name;
		$this->default_value   = $default_value;
		$this->label           = $label;
		$this->description     = $description;
		$this->options         = $options;
		$this->args            = $args;
		$this->hidden_property = $hidden_property;
		$this->hidden_values   = $hidden_values;
		
		$medigroup_Framework->mkdOptions->addOption($this->name, $this->default_value, $type);
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			foreach($this->hidden_values as $value) {
				if(medigroup_mikado_option_get_value($this->hidden_property) == $value) {
					$hidden = true;
				}

			}
		}
		$factory->render($this->type, $this->name, $this->label, $this->description, $this->options, $this->args, $hidden);
	}
}

/*
   Class: MedigroupMikadoMetaField
   A class that initializes Mikado Meta Field
*/

class MedigroupMikadoMetaField implements iMedigroupMikadoRender {
	private $type;
	private $name;
	private $default_value;
	private $label;
	private $description;
	private $options = array();
	private $args = array();
	public $hidden_property;
	public $hidden_values = array();


	function __construct($type, $name, $default_value = "", $label = "", $description = "", $options = array(), $args = array(), $hidden_property = "", $hidden_values = array()) {
		global $medigroup_Framework;
		$this->type            = $type;
		$this->name            = $name;
		$this->default_value   = $default_value;
		$this->label           = $label;
		$this->description     = $description;
		$this->options         = $options;
		$this->args            = $args;
		$this->hidden_property = $hidden_property;
		$this->hidden_values   = $hidden_values;
		$medigroup_Framework->mkdMetaBoxes->addOption($this->name, $this->default_value);
	}

	public function render($factory) {
		$hidden = false;
		if(!empty($this->hidden_property)) {
			foreach($this->hidden_values as $value) {
				if(medigroup_mikado_option_get_value($this->hidden_property) == $value) {
					$hidden = true;
				}

			}
		}
		$factory->render($this->type, $this->name, $this->label, $this->description, $this->options, $this->args, $hidden);
	}
}

abstract class MedigroupMikadoFieldType {

	abstract public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false);

}

class MedigroupMikadoFieldText extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		$col_width = 12;
		if(isset($args["col_width"])) {
			$col_width = $args["col_width"];
		}

		$suffix = !empty($args['suffix']) ? $args['suffix'] : false;

		?>

		<div class="mkd-page-form-section" id="mkd_<?php echo esc_attr($name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->

			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-<?php echo esc_attr($col_width); ?>">
							<?php if($suffix) : ?>
							<div class="input-group">
								<?php endif; ?>
								<input type="text"
									class="form-control mkd-input mkd-form-element"
									name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(htmlspecialchars(medigroup_mikado_option_get_value($name))); ?>"
									placeholder=""/>
								<?php if($suffix) : ?>
									<div class="input-group-addon"><?php echo esc_html($args['suffix']); ?></div>
								<?php endif; ?>
								<?php if($suffix) : ?>
							</div>
						<?php endif; ?>

						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldTextSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {

		$suffix = !empty($args['suffix']) ? $args['suffix'] : false;

		?>


		<div class="col-lg-3" id="mkd_<?php echo esc_attr($name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>
			<?php if($suffix) : ?>
			<div class="input-group">
				<?php endif; ?>
				<input type="text"
					class="form-control mkd-input mkd-form-element"
					name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(htmlspecialchars(medigroup_mikado_option_get_value($name))); ?>"
					placeholder=""/>
				<?php if($suffix) : ?>
					<div class="input-group-addon"><?php echo esc_html($args['suffix']); ?></div>
				<?php endif; ?>
				<?php if($suffix) : ?>
			</div>
		<?php endif; ?>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldTextArea extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		?>

		<div class="mkd-page-form-section">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->


			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-12">
							<textarea class="form-control mkd-form-element"
								name="<?php echo esc_attr($name); ?>"
								rows="5"><?php echo esc_html(htmlspecialchars(medigroup_mikado_option_get_value($name))); ?></textarea>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldTextAreaSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		?>

		<div class="col-lg-3">
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>
			<textarea class="form-control mkd-form-element"
				name="<?php echo esc_attr($name); ?>"
				rows="5"><?php echo esc_html(medigroup_mikado_option_get_value($name)); ?></textarea>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldColor extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		?>

		<div class="mkd-page-form-section" id="mkd_<?php echo esc_attr($name); ?>">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->

			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-12">
							<input type="text" name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>" class="my-color-field"/>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldColorSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		?>

		<div class="col-lg-3" id="mkd_<?php echo esc_attr($name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>
			<input type="text" name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>" class="my-color-field"/>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldImage extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		?>

		<div class="mkd-page-form-section">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->

			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-12">
							<div class="mkd-media-uploader">
								<div<?php if(!medigroup_mikado_option_has_value($name)) { ?> style="display: none"<?php } ?>
									class="mkd-media-image-holder">
									<img src="<?php if(medigroup_mikado_option_has_value($name)) {
										echo esc_url(medigroup_mikado_get_attachment_thumb_url(medigroup_mikado_option_get_value($name)));
									} ?>" alt=""
										class="mkd-media-image img-thumbnail"/>
								</div>
								<div style="display: none"
									class="mkd-media-meta-fields">
									<input type="hidden" class="mkd-media-upload-url"
										name="<?php echo esc_attr($name); ?>"
										value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>"/>
								</div>
								<a class="mkd-media-upload-btn btn btn-sm btn-primary"
									href="javascript:void(0)"
									data-frame-title="<?php esc_html_e('Select Image', 'medigroup'); ?>"
									data-frame-button-text="<?php esc_html_e('Select Image', 'medigroup'); ?>"><?php esc_html_e('Upload', 'medigroup'); ?></a>
								<a style="display: none;" href="javascript: void(0)"
									class="mkd-media-remove-btn btn btn-default btn-sm"><?php esc_html_e('Remove', 'medigroup'); ?></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldImageSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		?>


		<div class="col-lg-3" id="mkd_<?php echo esc_attr($name); ?>"<?php if($hidden) { ?> style="display: none"<?php } ?>>
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>

			<div class="mkd-media-uploader">
				<div<?php if(!medigroup_mikado_option_has_value($name)) { ?> style="display: none"<?php } ?>
					class="mkd-media-image-holder">
					<img src="<?php if(medigroup_mikado_option_has_value($name)) {
						echo esc_url(medigroup_mikado_get_attachment_thumb_url(medigroup_mikado_option_get_value($name)));
					} ?>" alt=""
						class="mkd-media-image img-thumbnail"/>
				</div>
				<div style="display: none"
					class="mkd-media-meta-fields">
					<input type="hidden" class="mkd-media-upload-url"
						name="<?php echo esc_attr($name); ?>"
						value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>"/>
				</div>
				<a class="mkd-media-upload-btn btn btn-sm btn-primary"
					href="javascript:void(0)"
					data-frame-title="<?php esc_html_e('Select Image', 'medigroup'); ?>"
					data-frame-button-text="<?php esc_html_e('Select Image', 'medigroup'); ?>"><?php esc_html_e('Upload', 'medigroup'); ?></a>
				<a style="display: none;" href="javascript: void(0)"
					class="mkd-media-remove-btn btn btn-default btn-sm"><?php esc_html_e('Remove', 'medigroup'); ?></a>
			</div>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldFont extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		global $medigroup_fonts_array;
		?>

		<div class="mkd-page-form-section">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->


			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-3">
							<select class="form-control mkd-form-element"
								name="<?php echo esc_attr($name); ?>">
								<option value="-1"><?php esc_html_e('Default', 'medigroup'); ?></option>
								<?php foreach($medigroup_fonts_array as $fontArray) { ?>
									<option <?php if(medigroup_mikado_option_get_value($name) == str_replace(' ', '+', $fontArray["family"])) {
										echo "selected='selected'";
									} ?> value="<?php echo esc_attr(str_replace(' ', '+', $fontArray["family"])); ?>"><?php echo esc_html($fontArray["family"]); ?></option>
								<?php } ?>
							</select>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldFontSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		global $medigroup_fonts_array;
		?>


		<div class="col-lg-3">
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>
			<select class="form-control mkd-form-element"
				name="<?php echo esc_attr($name); ?>">
				<option value="-1"><?php esc_html_e('Default', 'medigroup'); ?></option>
				<?php foreach($medigroup_fonts_array as $fontArray) { ?>
					<option <?php if(medigroup_mikado_option_get_value($name) == str_replace(' ', '+', $fontArray["family"])) {
						echo "selected='selected'";
					} ?> value="<?php echo esc_attr(str_replace(' ', '+', $fontArray["family"])); ?>"><?php echo esc_html($fontArray["family"]); ?></option>
				<?php } ?>
			</select>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldSelect extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$show = array();
		if(isset($args["show"])) {
			$show = $args["show"];
		}
		$hide = array();
		if(isset($args["hide"])) {
			$hide = $args["hide"];
		}
		?>

		<div class="mkd-page-form-section" id="mkd_<?php echo esc_attr($name); ?>" <?php if($hidden) { ?> style="display: none"<?php } ?>>


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->


			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-3">
							<select class="form-control mkd-form-element<?php if($dependence) {
								echo " dependence";
							} ?>"
								<?php foreach($show as $key => $value) { ?>
									data-show-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
								<?php } ?>
								<?php foreach($hide as $key => $value) { ?>
									data-hide-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
								<?php } ?>
								name="<?php echo esc_attr($name); ?>">
								<?php foreach($options as $key => $value) {
									if($key == "-1") {
										$key = "";
									} ?>
									<option <?php if(medigroup_mikado_option_get_value($name) == $key) {
										echo "selected='selected'";
									} ?> value="<?php echo esc_attr($key); ?>"><?php echo esc_html($value); ?></option>
								<?php } ?>
							</select>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldSelectBlank extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$show = array();
		if(isset($args["show"])) {
			$show = $args["show"];
		}
		$hide = array();
		if(isset($args["hide"])) {
			$hide = $args["hide"];
		}
		?>

		<div class="mkd-page-form-section"<?php if($hidden) { ?> style="display: none"<?php } ?>>


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->


			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-3">
							<select class="form-control mkd-form-element<?php if($dependence) {
								echo " dependence";
							} ?>"
								<?php foreach($show as $key => $value) { ?>
									data-show-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
								<?php } ?>
								<?php foreach($hide as $key => $value) { ?>
									data-hide-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
								<?php } ?>
								name="<?php echo esc_attr($name); ?>">
								<option <?php if(medigroup_mikado_option_get_value($name) == "") {
									echo "selected='selected'";
								} ?> value=""></option>
								<?php foreach($options as $key => $value) {
									if($key == "-1") {
										$key = "";
									} ?>
									<option <?php if(medigroup_mikado_option_get_value($name) == $key) {
										echo "selected='selected'";
									} ?> value="<?php echo esc_attr($key); ?>"><?php echo esc_html($value); ?></option>
								<?php } ?>
							</select>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}

class MedigroupMikadoFieldSelectSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$show = array();
		if(isset($args["show"])) {
			$show = $args["show"];
		}
		$hide = array();
		if(isset($args["hide"])) {
			$hide = $args["hide"];
		}
		?>


		<div class="col-lg-3">
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>
			<select class="form-control mkd-form-element<?php if($dependence) {
				echo " dependence";
			} ?>"
				<?php foreach($show as $key => $value) { ?>
					data-show-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
				<?php } ?>
				<?php foreach($hide as $key => $value) { ?>
					data-hide-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
				<?php } ?>
				name="<?php echo esc_attr($name); ?>">
				<option <?php if(medigroup_mikado_option_get_value($name) == "") {
					echo "selected='selected'";
				} ?> value=""></option>
				<?php foreach($options as $key => $value) {
					if($key == "-1") {
						$key = "";
					} ?>
					<option <?php if(medigroup_mikado_option_get_value($name) == $key) {
						echo "selected='selected'";
					} ?> value="<?php echo esc_attr($key); ?>"><?php echo esc_html($value); ?></option>
				<?php } ?>
			</select>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldSelectBlankSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$show = array();
		if(isset($args["show"])) {
			$show = $args["show"];
		}
		$hide = array();
		if(isset($args["hide"])) {
			$hide = $args["hide"];
		}
		?>


		<div class="col-lg-3">
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>
			<select class="form-control mkd-form-element<?php if($dependence) {
				echo " dependence";
			} ?>"
				<?php foreach($show as $key => $value) { ?>
					data-show-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
				<?php } ?>
				<?php foreach($hide as $key => $value) { ?>
					data-hide-<?php echo str_replace(' ', '', $key); ?>="<?php echo esc_attr($value); ?>"
				<?php } ?>
				name="<?php echo esc_attr($name); ?>">
				<option <?php if(medigroup_mikado_option_get_value($name) == "") {
					echo "selected='selected'";
				} ?> value=""></option>
				<?php foreach($options as $key => $value) {
					if($key == "-1") {
						$key = "";
					} ?>
					<option <?php if(medigroup_mikado_option_get_value($name) == $key) {
						echo "selected='selected'";
					} ?> value="<?php echo esc_attr($key); ?>"><?php echo esc_html($value); ?></option>
				<?php } ?>
			</select>
		</div>
		<?php

	}

}

class MedigroupMikadoFieldYesNo extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$dependence_hide_on_yes = "";
		if(isset($args["dependence_hide_on_yes"])) {
			$dependence_hide_on_yes = $args["dependence_hide_on_yes"];
		}
		$dependence_show_on_yes = "";
		if(isset($args["dependence_show_on_yes"])) {
			$dependence_show_on_yes = $args["dependence_show_on_yes"];
		}
		?>

		<div class="mkd-page-form-section" id="mkd_<?php echo esc_attr($name); ?>">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->


			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-12">
							<p class="field switch">
								<label data-hide="<?php echo esc_attr($dependence_hide_on_yes); ?>" data-show="<?php echo esc_attr($dependence_show_on_yes); ?>"
									class="cb-enable<?php if(medigroup_mikado_option_get_value($name) == "yes") {
										echo " selected";
									} ?><?php if($dependence) {
										echo " dependence";
									} ?>"><span><?php esc_html_e('Yes', 'medigroup') ?></span></label>
								<label data-hide="<?php echo esc_attr($dependence_show_on_yes); ?>" data-show="<?php echo esc_attr($dependence_hide_on_yes); ?>"
									class="cb-disable<?php if(medigroup_mikado_option_get_value($name) == "no") {
										echo " selected";
									} ?><?php if($dependence) {
										echo " dependence";
									} ?>"><span><?php esc_html_e('No', 'medigroup') ?></span></label>
								<input type="checkbox" id="checkbox" class="checkbox"
									name="<?php echo esc_attr($name); ?>_yesno" value="yes"<?php if(medigroup_mikado_option_get_value($name) == "yes") {
									echo " selected";
								} ?>/>
								<input type="hidden" class="checkboxhidden_yesno" name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>"/>
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}
}

class MedigroupMikadoFieldYesNoSimple extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$dependence_hide_on_yes = "";
		if(isset($args["dependence_hide_on_yes"])) {
			$dependence_hide_on_yes = $args["dependence_hide_on_yes"];
		}
		$dependence_show_on_yes = "";
		if(isset($args["dependence_show_on_yes"])) {
			$dependence_show_on_yes = $args["dependence_show_on_yes"];
		}
		?>

		<div class="col-lg-3">
			<em class="mkd-field-description"><?php echo esc_html($label); ?></em>

			<p class="field switch">
				<label data-hide="<?php echo esc_attr($dependence_hide_on_yes); ?>" data-show="<?php echo esc_attr($dependence_show_on_yes); ?>"
					class="cb-enable<?php if(medigroup_mikado_option_get_value($name) == "yes") {
						echo " selected";
					} ?><?php if($dependence) {
						echo " dependence";
					} ?>"><span><?php esc_html_e('Yes', 'medigroup') ?></span></label>
				<label data-hide="<?php echo esc_attr($dependence_show_on_yes); ?>" data-show="<?php echo esc_attr($dependence_hide_on_yes); ?>"
					class="cb-disable<?php if(medigroup_mikado_option_get_value($name) == "no") {
						echo " selected";
					} ?><?php if($dependence) {
						echo " dependence";
					} ?>"><span><?php esc_html_e('No', 'medigroup') ?></span></label>
				<input type="checkbox" id="checkbox" class="checkbox"
					name="<?php echo esc_attr($name); ?>_yesno" value="yes"<?php if(medigroup_mikado_option_get_value($name) == "yes") {
					echo " selected";
				} ?>/>
				<input type="hidden" class="checkboxhidden_yesno" name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>"/>
			</p>
		</div>
		<?php

	}
}

class MedigroupMikadoFieldOnOff extends MedigroupMikadoFieldType {

	public function render($name, $label = "", $description = "", $options = array(), $args = array(), $hidden = false) {
		global $medigroup_options;
		$dependence = false;
		if(isset($args["dependence"])) {
			$dependence = true;
		}
		$dependence_hide_on_yes = "";
		if(isset($args["dependence_hide_on_yes"])) {
			$dependence_hide_on_yes = $args["dependence_hide_on_yes"];
		}
		$dependence_show_on_yes = "";
		if(isset($args["dependence_show_on_yes"])) {
			$dependence_show_on_yes = $args["dependence_show_on_yes"];
		}
		?>

		<div class="mkd-page-form-section" id="mkd_<?php echo esc_attr($name); ?>">


			<div class="mkd-field-desc">
				<h4><?php echo esc_html($label); ?></h4>

				<p><?php echo esc_html($description); ?></p>
			</div>
			<!-- close div.mkd-field-desc -->


			<div class="mkd-section-content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-12">

							<p class="field switch">
								<label data-hide="<?php echo esc_attr($dependence_hide_on_yes); ?>" data-show="<?php echo esc_attr($dependence_show_on_yes); ?>"
									class="cb-enable<?php if(medigroup_mikado_option_get_value($name) == "on") {
										echo " selected";
									} ?><?php if($dependence) {
										echo " dependence";
									} ?>"><span><?php esc_html_e('On', 'medigroup') ?></span></label>
								<label data-hide="<?php echo esc_attr($dependence_show_on_yes); ?>" data-show="<?php echo esc_attr($dependence_hide_on_yes); ?>"
									class="cb-disable<?php if(medigroup_mikado_option_get_value($name) == "off") {
										echo " selected";
									} ?><?php if($dependence) {
										echo " dependence";
									} ?>"><span><?php esc_html_e('Off', 'medigroup') ?></span></label>
								<input type="checkbox" id="checkbox" class="checkbox"
									name="<?php echo esc_attr($name); ?>_onoff" value="on"<?php if(medigroup_mikado_option_get_value($name) == "on") {
									echo " selected";
								} ?>/>
								<input type="hidden" class="checkboxhidden_onoff" name="<?php echo esc_attr($name); ?>" value="<?php echo esc_attr(medigroup_mikado_option_get_value($name)); ?>"/>
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- close div.mkd-section-content -->

		</div>
		<?php

	}

}