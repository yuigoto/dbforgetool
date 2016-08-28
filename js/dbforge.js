/**
 * DBForge Tool :: A helper for CodeIgniter's DBForge
 * ======================================================================
 * A helper tool for building field arrays for CodeIgniter's DBForge tool.
 * 
 * Built for NW.js v0.16.1+.
 * 
 * Dependencies:
 * - jQuery;
 * - jQuery-UI (sortable);
 * - jQuery mousewheel;
 * - jQuery custom content scroller, by malihu;
 * - nestedSortable plugin;
 * ----------------------------------------------------------------------
 * @package     br.com.sixsided.dbforgetool
 * @author      Fabio Y. Goto <lab@sixsided.com.br>
 * @version     2.0.0
 * @license     MIT License
 * @copyright   (c) 2016 SIXSIDED Developments
 */
var DBForgeTool = function () 
{
    /**
     * Application name.
     * 
     * @var string
     */
    this.APP_NAME = "DBForge Tool";
    
    /**
     * Application version.
     * 
     * @var string
     */
    this.APP_VERSION = "1.0.0";
    
    /**
     * Close button for the about screen.
     * 
     * @var object
     */
    this.BTNS_ABOUT;
    
    /**
     * Add field button.
     * 
     * @var object
     */
    this.BTNS_FIELD;
    
    /**
     * Generate button.
     * 
     * @var object
     */
    this.BTNS_GENERATE;
    
    /**
     * File input handle (for saving).
     * 
     * @var object
     */
    this.DBFORGE_FILE;
    
    /**
     * Header handle.
     * 
     * @var object
     */
    this.DBFORGE_HEAD;
    
    /**
     * About screen handle.
     * 
     * @var object
     */
    this.DBFORGE_INFO;
    
    /**
     * Main screen handle.
     * 
     * @var object
     */
    this.DBFORGE_MAIN;
    
    /**
     * Main form list object.
     * 
     * @var object
     */
    this.DBFORGE_LIST;
    
    /**
     * Menu handle.
     * 
     * @var object
     */
    this.DBFORGE_MENU;
    
    /**
     * Output screen handle.
     * 
     * @var object
     */
    this.DBFORGE_OUTPUT;
    
    /**
     * Output screen textarea, must be declared separately for global access (?).
     * 
     * @var object
     */
    this.DBFORGE_TEXTAREA;
    
    /**
     * Wrapper handle.
     * 
     * @var object
     */
    this.DBFORGE_WRAP;
    
    /**
     * Contains the types of fields used in the form and, also, its values 
     * as an array.
     * 
     * @var object
     */
    this.TYPE_LIST = {
        type:           [ "INT", "VARCHAR", "TEXT", "REAL", "BLOB" ], 
        constraint:     10, 
        unsigned:       [ true, false ], 
        auto_increment: [ true, false ], 
        null:           [ true, false ], 
        unique:         [ true, false ], 
        default:        ""
    };
    
    // Execute this initializer
    this.init();
};

/**
 * Initializes the application.
 */
DBForgeTool.prototype.init = function() 
{
    // Set the titlet
    $( 'title' ).html( this.APP_NAME + ' | v' + this.APP_VERSION );
    // Build the main application body
    this.buildsMain();
    // Prepend application to the document body
    $('body').prepend( this.DBFORGE_WRAP );
    // Set sortable
    this.DBFORGE_LIST.nestedSortable( {
        listType:       'ul', 
        items:          'li', 
        handle:         'div', 
        maxLevels:      2, 
        placeholder:    'dbforge-placeholder', 
        protectRoot:    true, 
        expandOnHover:  200, 
        revert:         0
    } )
};

/**
 * Builds the base screens of the application.
 */
DBForgeTool.prototype.buildsMain = function() 
{
    // Initialize main wrapper
    this.DBFORGE_WRAP = $( '<div/>' ).attr({
        id: 'dbforge-wrap'
    });
    // Building header
    this.buildsHead();
    // Building menu
    this.buildsMenu();
    // Building info screen
    this.buildsInfo();
    // Building application form
    this.buildsForm();
    // Building output form
    this.buildsOutput();
    // Prepending everything
    this.DBFORGE_WRAP.prepend( 
        this.DBFORGE_HEAD, 
        this.DBFORGE_MENU, 
        this.DBFORGE_INFO, 
        this.DBFORGE_MAIN, 
        this.DBFORGE_OUTPUT
    ).ready(function() {
        // Set scrollbar
        $( '#dbforge-main' ).mCustomScrollbar({
            scrollInertia: 500
        });
        // Open links in external browser
        $( 'a[target=_blank]' ).on( "click", function() {
            // Open link in external browser
            require('nw.gui').Shell.openExternal( this.href );
            // Return
            return false;
        });
    });
};

/**
 * Builds the application header.
 */
DBForgeTool.prototype.buildsHead = function() 
{
    // Create header div
    this.DBFORGE_HEAD = $( '<div/>' ).attr({
        id: "dbforge-head"
    });
    // Create the "About..." button
    this.BTNS_ABOUT = $( '<button/>' ).attr({
        type:   "button", 
        class:  "about-show", 
        title:  "About..."
    });
    // Bind a click event to the about button
    this.BTNS_ABOUT.bind( 'click', this, this.actionsInfo );
    // Append button to the head object
    this.DBFORGE_HEAD.append( this.BTNS_ABOUT );
};

/**
 * Builds the foot menu and the buttons in it.
 */
DBForgeTool.prototype.buildsMenu = function() 
{
    // Generate menu div
    this.DBFORGE_MENU = $( '<div/>' ).attr({
        id: "dbforge-menu"
    });
    // Generate the add field button
    this.BTNS_FIELD = $( '<button/>' ).attr({
        class: 'dbforge-btns plus', 
        title: 'Add Field'
    }).html( "Add Field" );
    // Generate the generate button
    this.BTNS_GENERATE = $( '<button/>' ).attr({
        class: 'dbforge-btns make', 
        title: 'Generate'
    }).html( "Generate" );
    // Binds action to add field
    this.BTNS_FIELD.bind( 'click', this, this.actionsFields );
    // Binds action to generate field
    this.BTNS_GENERATE.bind( 'click', this, this.actionsSerialize );
    // Appends to menu
    this.DBFORGE_MENU.append( this.BTNS_FIELD, this.BTNS_GENERATE );
};

/**
 * Builds the about screen.
 */
DBForgeTool.prototype.buildsInfo = function() 
{
    // Defining the contents of the screen
    var contents = '<h4>' + this.APP_NAME + ' <small>(v' + this.APP_VERSION + ')</small></h4><h6><a href="http://github.com/yuigoto/dbforgetool" target="_blank">http://github.com/yuigoto/dbforgetool</a></h6><p>&nbsp;</p><p>A helper tool for building serialized data for use with <strong>CodeIgniter</strong>\'s <strong>DBForge</strong> database management module.</p><p>&nbsp;</p><p>This project came out of my need for a tool to help me plan some database structures for the CI module.</p><p>&nbsp;</p><h6>Author</h6><ul><li><strong>Fabio Y. Goto</strong><a href="mailto:lab@sixsided.com.br">lab@sixsided.com.br</a></li></ul><p>&nbsp;</p><p><small>&copy;2016 SIXSIDED Developments</small></p>';
    // Create the info screen and set the contents
    this.DBFORGE_INFO = $( '<div/>' ).attr({
        id: 'dbforge-about'
    }).html( contents );
};

/**
 * Builds the base wrappers for the app's form.
 */
DBForgeTool.prototype.buildsForm = function() 
{
    // Build form object
    this.DBFORGE_MAIN = $( '<form/>' ).attr({
        id: 'dbforge-main', 
        'data-mcs-theme': 'minimal-dark'
    });
    // Build form list
    this.DBFORGE_LIST = $( '<ul/>').attr({
        id: 'dbforge-list', 
        class: 'dbforge-list'
    });
    // Append list to form
    this.DBFORGE_MAIN.append( this.DBFORGE_LIST );
};

/**
 * Builds the output form for saving and/or copying the serialized data.
 */
DBForgeTool.prototype.buildsOutput = function() 
{
    // Build main output object
    this.DBFORGE_OUTPUT = $( '<div/>' ).attr({
        id: 'dbforge-output'
    });
    // Build the main output textarea
    this.DBFORGE_TEXTAREA = $( '<textarea/>' ).attr({
        readonly: 'readonly'
    }).click(function() {
        // Focus textarea
        this.focus();
        // Select everything
        this.select();
    });
    // Generating the output title
    var _name = $( '<h2/>' ).html( 'Serialized Output' );
    // Generating the output subtitle
    var _subs = $( '<h6/>' ).html( 'Click on the textarea to select the data, or click on \'Save to File...\' to save it as a text file' );
    // Generating the buttons
    var _btns_save = $( '<label/>' ).attr({
        class: 'dbforge-save',
        for: 'dbforge-save'
    }).html( 'Save to File...' );
    var _btns_return = $( '<label/>' ).attr({
        class: 'dbforge-save-exit'
    }).html( 'Cancel' );
    // Generating the file input
    this.DBFORGE_FILE = $( '<input/>' ).attr({
        type:       'file', 
        id:         'dbforge-save', 
        nwsaveas:   'data.dbforge', 
        accept:     '.dbforge'
    });
    // Appending everything to output screen
    this.DBFORGE_OUTPUT.append(
        _name, 
        _subs, 
        this.DBFORGE_TEXTAREA, 
        this.DBFORGE_FILE, 
        _btns_save, 
        _btns_return
    );
    // Set save to file action
    _btns_save.bind( 'click', this, this.saveToFile );
    // Cancel save action
    _btns_return.bind( 'click', this, function( dbforge ) {
        // Retrieve current instance
        dbforge = dbforge.data;
        // Close
        dbforge.DBFORGE_OUTPUT.removeClass( 'show' );
    } )
};

/**
 * Toggles about screen on/off.
 * 
 * @param DBForgeTool dbforge 
 *      Reference/instance of the current DBForge object
 */
DBForgeTool.prototype.actionsInfo = function( dbforge ) 
{
    // Retrieve main instance of object
    dbforge = dbforge.data;
    // Checks class and add/remove the 'show' class on objects.
    if ( dbforge.DBFORGE_INFO.hasClass( 'show' ) ) {
        $( this ).removeClass( 'show' );
        dbforge.DBFORGE_INFO.removeClass( 'show' );
    } else {
        $( this ).addClass( 'show' );
        dbforge.DBFORGE_INFO.addClass( 'show' );
    }
};

/**
 * Performs the "add field" action.
 * 
 * @param DBForgeTool dbforge 
 *      Reference/instance of the current DBForge object
 */
DBForgeTool.prototype.actionsFields = function( dbforge ) 
{
    // Retrieve main instance of object
    dbforge = dbforge.data;
    // Initialize field object
    var _field = $( '<li/>' ).attr({
        class: new Date().getTime()
    }).addClass( 'hide' );
    // Define object ID
    var _id = 'item-' + new Date().getTime();
    // Initialize the checkbox trigger
    var _check = $( '<input/>' ).attr({
        id: _id, 
        type: 'checkbox'
    });
    // Initialize the maximize button
    var _btn_maxi = $( '<label/>' ).attr({
        for: _id, 
        class: 'item-btns maxi'
    });
    // Initialize the remove button
    var _btn_wipe = $( '<label/>' ).attr({
        class: 'item-btns wipe'
    });
    // Initialize the handle
    var _handle = $( '<div/>' ).attr({
        class: 'item-handle'
    });
    // Initialize the handle's contents
    var _handle_name = $( '<span/>' ).html( '--' );
    // Building the title field
    var _title = $( '<div/>' ).addClass( "item-name" );
    var _title_span = $( '<span/>' ).html( 'Field Name:' );
    var _title_field = $( '<input/>' ).attr({
        type:       'text', 
        name:       'title', 
        maxlength:   40
    });
    // Binding title change to handle change
    _title_field.bind( "keyup change", _handle_name, function( handle ) {
        // Pulling the data
        handle = handle.data;
        // Setting value
        handle.html( $( this ).val() );
    });
    // Building the list content
    var _forms = $( '<ul/>' );
    // Building every item for every type
    for ( i in dbforge.TYPE_LIST ) {
        // Declare button (resets every loop)
        var $btns;
        // Generate list item
        var $item = $( '<li/>' );
        // Define name
        var $name = i;
        // Make display name
        var $span = $name.charAt( 0 ).toUpperCase() + $name.slice( 1 );
        // Declare form item (resets every loop)
        var $temp;
        // Define button, if $name isn't type
        if ( $name != 'type' ) {
            $btns = $( '<button/>' ).attr({
                type: 'button'
            });
        }
        // Building field types
        switch ( $name ) {
            case 'default': 
                // Build input field
                $temp = $( '<input/>' ).attr( {
                    type:           'text', 
                    name:           $name, 
                    placeholder:    'Default value...', 
                    maxlength:      30
                } );
                break;
            case 'constraint': 
                // Build input field
                $temp = $( '<input/>' ).attr( {
                    type:           'number', 
                    name:           $name, 
                    placeholder:    '0, 1, 2, ...'
                } );
                break;
            default:
                $temp = $( '<select/>' ).attr( {
                    name:           $name
                } );
                // Temporary option values
                var _tempOpts, 
                    _k, 
                    _v;
                // Building options
                for ( j in dbforge.TYPE_LIST[i] ) {
                    // Builds the option
                    _tempOpts = $( '<option/>' );
                    // If value is boolean...
                    if ( typeof( dbforge.TYPE_LIST[i][j] ) == 'boolean' ) {
                        // Define key
                        _k = ( dbforge.TYPE_LIST[i][j] === true ) ? 'TRUE' : 'FALSE';
                        // Define value
                        _v = dbforge.TYPE_LIST[i][j];
                    } else {
                        // Define key and value
                        _k = _v = dbforge.TYPE_LIST[i][j].trim().toUpperCase();
                    }
                    // Add attributes and value to the option
                    _tempOpts.attr( 'value', _v ).html( _k );
                    // Add option to the field
                    $temp.append( _tempOpts );
                }
                break;
        }
        // Append everything
        $item.append( $span, $temp );
        // If button isn't undefined, add
        if ( $btns != undefined ) {
            // Append
            $item.append( $btns );
            // Binding remove item action
            $btns.bind( "click", $item, function( item_data ) {
                // References item data
                item_data = item_data.data;
                // Removes
                item_data.remove();
            } );
        }
        // Append to form
        _forms.append( $item );
    }
    // Appends handle name to the field
    _handle.append( _handle_name );
    // Appends span and input to title
    _title.append( _title_span, _title_field );
    // Append everything to the field
    _field.append(
        _check, 
        _btn_maxi, 
        _btn_wipe, 
        _handle, 
        _title, 
        _forms
    );
    // Append field to the form
    dbforge.DBFORGE_LIST.append( _field ).ready( function() {
        // Shows the field
        _field.removeClass( 'hide' );
    });
    // Binding removal action
    _btn_wipe.bind( "click", [ _field, _check ], function( data ) {
        // Extracting the event data
        data = data.data;
        // Get field data
        field = data[0];
        // Get checkbox data
        check = data[1];
        // Check if checkbox is checked or not
        if ( check.prop( 'checked' ) ) {
            // Unchecks checkbox
            check.prop( 'checked', false );
            // Removes
            setTimeout( function() {
                // Hides
                $( field ).css( 'z-index', 10 ).addClass( 'hide' );
            }, 300);
            // Removes
            setTimeout( function() {
                // Remove after fading
                field.remove();
            }, 600);
        } else {
            // Hides
            $( field ).css( 'z-index', 10 ).addClass( 'hide' );
            // Removes
            setTimeout( function() {
                // Remove after fading
                field.remove();
            }, 300);
        }
    });
}

/**
 * Performs the "generate"/serialize action with the form data.
 * 
 * @param DBForgeTool dbforge 
 *      Reference/instance of the current DBForge object
 */
DBForgeTool.prototype.actionsSerialize = function( dbforge ) 
{
    // Retrieve main instance of object
    dbforge = dbforge.data;
    // Pull form content
    var contents = dbforge.DBFORGE_MAIN.serializeArray();
    
    /**
     * Return array.
     * 
     * @var array
     */
    var _return = [];
    
    /**
     * Current node's name (so we can separate fields when it reaches a title).
     * 
     * @var string
     */
    var _curr;
    
    // Flag for adding items
    var _flag;
    // Builds data, only, if there are fields in the database
    if ( dbforge.DBFORGE_LIST.children().length > 0 ) {
        // Loops through data
        for ( i in contents ) {
            // Extract the name and value
            var _currName = contents[i].name;
            var _currVals = contents[i].value;
            // Checks if value isn't empty
            if ( _currVals !== '' ) {
                // If the current field is the title
                if ( _currName == 'title' ) {
                    // Check Flag
                    _flag = ( _flag == undefined ) ? 0 : _flag + 1;
                    // Defines current item as the value (title of the field)
                    _curr = _currVals.replace( /(\s)/g, '_' ).toLowerCase();
                    // Create new object for the field
                    _return[_flag] = {
                        title: _currVals, 
                        value: {}
                    };
                } else {
                    // Is current item set?
                    if ( _curr != undefined ) {
                        // Add value to the current field
                        if ( _currVals == "true" || _currVals == "false" ) {
                            // If boolean
                            _return[_flag].value[_currName] = ( _currVals == "true" ) 
                                                            ? true : false;
                        } else {
                            // Checks if it is numeric
                            if ( _currName == 'constraint' ) {
                                _return[_flag].value[_currName] = parseInt( _currVals );
                            } else {
                                _return[_flag].value[_currName] = _currVals;
                            }
                        }
                    }
                }
            } else {
                // Clears current item, if field is title
                if ( _currName == 'title' ) _curr = undefined;
            }
        }
        // Is return length > than 0?
        if ( _return.length > 0 ) {
            // Define textarea output content
            dbforge.DBFORGE_TEXTAREA.html( JSON.stringify( _return ) );
            // Show output content
            dbforge.DBFORGE_OUTPUT.addClass( 'show' );
        }
    }
};

/**
 * Saves the contents of the textarea on the output window into a file.
 * 
 * @param DBForgeTool dbforge 
 *      Reference/instance of the current DBForge object
 */
DBForgeTool.prototype.saveToFile = function( dbforge ) 
{
    // Retrieve main instance of object
    dbforge = dbforge.data;
    // Declaring the "path" and "filesystem" node modules
    var _path = require( "path" );
    var _fsys = require( "fs" );
    // Textarea handler
    var _text = dbforge.DBFORGE_TEXTAREA;
    // File input handler
    var _file = dbforge.DBFORGE_FILE;
    // Checking change
    _file.unbind( 'change' );
    _file.change( function( event ) {
        // Get path value
        var _path = $( this ).val();
        // Is file 
        _fsys.writeFile( _path, _text.html(), 'utf8', ( error ) => {
            if ( error ) {
                // Alerts file not saved
                alert( 'File couldn\'t be saved.' );
            } else {
                // Alerts file saved
                alert( 'File saved successfully.' );
                // Clears textarea
                dbforge.DBFORGE_TEXTAREA.html( '' );
                // Hides data
                dbforge.DBFORGE_OUTPUT.removeClass( 'show' );
                // Clear form
                dbforge.DBFORGE_LIST.empty();
            }
        } );
        // Reset value
        $( this ).val( '' );
    } );
};
