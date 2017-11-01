<?php
/**
* The base configuration for WordPress
*
* The wp-config.php creation script uses this file during the
* installation. You don't have to use the web site, you can
* copy this file to "wp-config.php" and fill in the values.
*
* This file contains the following configurations:
*
* * MySQL settings
* * Secret keys
* * Database table prefix
* * ABSPATH
*
* @link https://codex.wordpress.org/Editing_wp-config.php
*
* @package WordPress
*/
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'hegewischdentist');
/** MySQL database username */
define('DB_USER', 'hegewischdentist');
/** MySQL database password */
define('DB_PASSWORD', 'dimsdotbiz');
/** MySQL hostname */
define('DB_HOST', 'localhost');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
* Authentication Unique Keys and Salts.
*
* Change these to different unique phrases!
* You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
* You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
*
* @since 2.6.0
*/
define('AUTH_KEY',         'mH@^5*4A|3%/<7h!fty<7y$$!KxB=pY13}RqwhFLy*K[tM~@!s(Vp9+S#( %nV*,');
define('SECURE_AUTH_KEY',  'D]3m$s`-2%`^v.FG0x_| f,N-Q^Zb.r(EiM5dEFSna~-[~0Sx1jpqAz5wWYlAZ=>');
define('LOGGED_IN_KEY',    'ah;P3!vaCzF?AW(R^qp!<oW,g)^O^vpL-V}wId`WE.{e5?R-t@klK@W]yfp@elqC');
define('NONCE_KEY',        'fCg]8[(2?f:`mM/ YHQS6/xo>m^OtAVpTjA*@:]IZW,qUrg-!@l3N{ht|oyofnB8');
define('AUTH_SALT',        '&Mh*Q!49xQt@,ts@WAvDQz[8-t&!7F8CW`pFcz3eT DqxXNlV7|)S-*i11K42@<7');
define('SECURE_AUTH_SALT', 'x6I$Ld5zGn0bE v9Q{b$vfK}*0ia&tbGNfgrS_J.?wHMmXPv{NOs4[H(.eMTA^n!');
define('LOGGED_IN_SALT',   'tFq;mm^.i`t.?oYh}jn6CV:.C{LYq49JW@I3Z~+ZyR3l:o3+7egV M%ZL]aIK.Q9');
define('NONCE_SALT',       'qPnMDOW}T({b+tU=Uo)3 yf7y`]OYl@&UR1NM89-x[)rsvpc2UT|2pnR3v!7_O8v');
/**#@-*/
/**
* WordPress Database Table prefix.
*
* You can have multiple installations in one database if you give each
* a unique prefix. Only numbers, letters, and underscores please!
*/
$table_prefix  = 'wp_';
/**
* For developers: WordPress debugging mode.
*
* Change this to true to enable the display of notices during development.
* It is strongly recommended that plugin and theme developers use WP_DEBUG
* in their development environments.
*
* For information on other constants that can be used for debugging,
* visit the Codex.
*
* @link https://codex.wordpress.org/Debugging_in_WordPress
*/
define('WP_DEBUG', false);
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
