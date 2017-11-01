<?php

if ( ! function_exists( 'mkd_action_send_booking_form' ) ) {
	
	function mkd_action_send_booking_form() {

		if ( isset($_POST['data']) ) {

			$error = false;
			$responseMessage = '';

			$email_data = $_POST['data'];
			$nonce = $email_data['nonce'];

			if ( wp_verify_nonce( $nonce, 'mkd_validate_booking_form' ) ) {

				//Validate

				if ( $email_data['contact'] ) {
					$phone = esc_html($email_data['contact']);
				} else {
					$error = true;
					$responseMessage = esc_html__('Please insert valid phone', 'medigroup');
				}

				if ( $email_data['name'] ) {
					$name = esc_html($email_data['name']);
				} else {
					$error = true;
					$responseMessage = esc_html__('Please insert valid name', 'medigroup');
				}

				if ( $email_data['time'] ) {
					$time = esc_html($email_data['time']);
				} else {
					$error = true;
					$responseMessage = esc_html__('Please choose a valid time', 'medigroup');
				}

				if ( $email_data['date'] ) {
					$date = esc_html($email_data['date']);
				} else {
					$error = true;
					$responseMessage = esc_html__('Please choose a valid date', 'medigroup');
				}

				/*if ( $email_data['doctor'] ) {
					$doctor = esc_html($email_data['doctor']);
				} else {
					$error = true;
					$responseMessage = esc_html__('Please select a doctor', 'medigroup');
				}

				if ( $email_data['department'] ) {
					$department = esc_html($email_data['department']);
				} else {
					$error = true;
					$responseMessage = esc_html__('Please select a department', 'medigroup');
				}*/

				if ( $email_data['message'] ) {
					$message = esc_html($email_data['message']);
				}

				//Send Mail and response
				if ( $error ) {

					wp_send_json_error( $responseMessage );

				} else {

					//Get email address
					$mail_to = medigroup_mikado_options()->getOptionValue('doctor_booking_email');
					if ($mail_to == '') {
						$mail_to = get_option('admin_email');
					}

					$headers = array();

					$messageTemplate = esc_html__('From', 'medigroup'). ': ' . $name . "\r\n";
					$messageTemplate .= esc_html__('Phone', 'medigroup') . ': ' . $phone . "\r\n\n";
					//$messageTemplate = esc_html__('Department', 'medigroup'). ': ' . $department . "\r\n";
					//$messageTemplate .= esc_html__('Doctor', 'medigroup') . ': ' . $doctor . "\r\n\n";
					$messageTemplate .= esc_html__('Requested date', 'medigroup'). ': ' . $date . "\r\n";
					$messageTemplate .= esc_html__('Requested time', 'medigroup') . ': ' . $time . "\r\n\n";
					$messageTemplate .= esc_html__('Message', 'medigroup') . ': ' . $message . "\r\n\n";

					$mail_sent = wp_mail(
						$mail_to, //Mail To
						esc_html__('New Booking Request', 'medigroup'), //Subject
						$messageTemplate, //Message
						$headers //Additional Headers
					);

					if ($mail_sent) {
						$responseMessage = esc_html__('Booking request sent successfully', 'medigroup');
						wp_send_json_success( $responseMessage );
					}
					else {
						$responseMessage = esc_html__('Booking request failed. Please try later.', 'medigroup');
						wp_send_json_error( $responseMessage );
					}
				}

			}


		} else {
			$message = esc_html__('Please review your enquiry and send again', 'medigroup');
			wp_send_json_error( $message );
		}

	}

	add_action( 'wp_ajax_mkd_action_send_booking_form', 'mkd_action_send_booking_form' );
	add_action( 'wp_ajax_nopriv_mkd_action_send_booking_form', 'mkd_action_send_booking_form' );

}