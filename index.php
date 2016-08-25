<?php
/** 
 * SIXSIDED Developments :: DBForge Query Builder
 * ======================================================================
 * 
 * ----------------------------------------------------------------------
 * @package     br.com.sixsided.dbforgetool
 * @author      Fabio Y. Goto <lab@sixsided.com.br>
 * @copyright   (c) 2016 SIXSIDED Developments
 * @version     1.0.0
 * @license     MIT License
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SX :: DBForge Tool</title>
    <!-- STYLESHEET -->
    <link rel="stylesheet" href="css/dbforge.css">
</head>
<body>
    <!-- JAVASCRIPT -->
    <script src="libs/libs.js"></script>
    <script src="js/dbforgetool.min.js"></script>
    <script>
        // Initialize DBForgeTool
        var DBForge = new DBForgeTool( true );
        
        // Execute everyting when the document's ready
        $( document ).ready( function() {
            // Starts 
            DBForge.init();
            
            // Define nested sortable
            DBForge.TOOL_LIST.nestedSortable( {
                listType:       'ul', 
                items:          'li', 
                handle:         'span', 
                maxLevels:      2, 
                placeholder:    'dbforge-placeholder', 
                protectRoot:    true, 
                expandOnHover:  200, 
                revert:         200
            } );
        } );
    </script>
</body>
</html>