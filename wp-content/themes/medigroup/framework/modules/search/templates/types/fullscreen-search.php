<div class="mkd-fullscreen-search-holder">
	<div class="mkd-fullscreen-search-close-container">
		<div class="mkd-search-close-holder">
			<a class="mkd-fullscreen-search-close" href="javascript:void(0)">
				<?php print $search_icon_close; ?>
			</a>
		</div>
	</div>
	<div class="mkd-fullscreen-search-table">
		<div class="mkd-fullscreen-search-cell">
			<div class="mkd-fullscreen-search-inner">
				<form action="<?php echo esc_url(home_url('/')); ?>" class="mkd-fullscreen-search-form" method="get">
					<div class="mkd-form-holder">
							<div class="mkd-field-holder">
								<input type="text" name="s" placeholder="<?php esc_html_e('Search on site...', 'medigroup'); ?>" class="mkd-search-field" autocomplete="off"/>

								<div class="mkd-line"></div>
								<input type="submit" class="mkd-search-submit" value="&#xf002;"/>
							</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>