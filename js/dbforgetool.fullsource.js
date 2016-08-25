/**
 * DBForge Query Tool
 * ======================================================================
 * A helper tool for building field arrays for CodeIgniter's DBForge tool.
 * 
 * Dependencies:
 * - jQuery;
 * - jQuery-UI (sortable);
 * ----------------------------------------------------------------------
 * @package     br.com.sixsided.dbforgetool
 * @author      Fabio Y. Goto <lab@sixsided.com.br>
 * @copyright   (c) 2016 SIXSIDED Developments
 * @version     1.0.0
 * @license     MIT License
 */
var DBForgeTool = function( DEBUG = false ) 
{
    /**
     * Debug mode toggle.
     * 
     * @var boolean
     */
    this.DEBUG_MODE = ( DEBUG === true ) ? true : false;
    
    /**
     * Main external wrapper of the application.
     * 
     * @var object
     */
    this.MAIN_WRAP = $( '<div/>' );
    
    /**
     * Tool name.
     * 
     * @var object
     */
    this.NAME = $( '<h1/>' );
    
    /**
     * Handles the main wrapper of the application.
     * 
     * @var object
     */
    this.TOOL_WRAP = $( '<div/>' );
    
    /**
     * Handles the main form of the application.
     * 
     * @var object 
     */
    this.TOOL_FORM = $( '<form/>' );
    
    /**
     * Handles the field listing.
     * 
     * @var object 
     */
    this.TOOL_LIST = $( '<ul/>' );

    /**
     * The "add-field" button.
     * 
     * @var object
     */
    this.TOOL_PLUS = $( '<button/>' );
    
    /**
     * Submit button.
     * 
     * @var object
     */
    this.TOOL_SEND = $( '<button/>' );
    
    /**
     * Debug textarea.
     * 
     * @var object
     */
    this.TOOL_OUTPUT = $( '<textarea/>' );
    
    /**
     * Contains all the types of fields and its values as arrays.
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
};



/**
 * Main constructor of the application.
 */
DBForgeTool.prototype.init = function() 
{
    // Initializes the form
    this.initWrap();
    
    // Add everything to the external wrapper
    this.MAIN_WRAP.append( this.NAME, this.TOOL_WRAP );
    
    // Prepend external wrapper to the body
    $( 'body' ).prepend( this.MAIN_WRAP );
    
    // If debug mode is on, append the textarea
    if ( this.DEBUG_MODE ) {
        // Add ID
        this.TOOL_OUTPUT.attr( 'id', 'dbforge-output' );
        
        // Append output
        this.TOOL_WRAP.after( this.TOOL_OUTPUT );
    }
};



/**
 * Builds the base wrapper structure.
 */
DBForgeTool.prototype.initWrap = function() 
{
    /**
     * Adds the ID of the main external wrapper.
     */
    this.MAIN_WRAP.attr( 'id', 'dbforge-wrap' );
    
    /**
     * Adds ID and content to tool name.
     */
    this.NAME.attr( {
        id:     'dbforge-name', 
        class:  'dbforge-title'
    } ).html( 'SX :: DBForge Query Builder' );
    
    /**
     * Adds the ID of the main wrapper.
     */
    this.TOOL_WRAP.attr( 'id', 'dbforge-main' );
    
    /**
     * Adds the ID of the form.
     */
    this.TOOL_FORM.attr( 'id', 'dbforge-form' );
    
    /**
     * Builds the initial list.
     */
    this.TOOL_LIST.attr( 'id', 'dbforge-list' );
    
    /**
     * Initializes the button.
     */
    this.TOOL_PLUS.attr( 'id', 'dbforge-plus' ).html( '&plus; Add Field' );
    
    /**
     * Initializes the submit.
     */
    this.TOOL_SEND.attr( {
        id:     'dbforge-send', 
        type:   'submit'
    } ).html( 'Serialize Data' );
    
    // Appends list to form
    this.TOOL_FORM.append( this.TOOL_LIST );
    
    // Appends everything to the wrapper
    this.TOOL_WRAP.append( this.TOOL_FORM, this.TOOL_PLUS, this.TOOL_SEND );
    
    // Binds click to the button (passing the main class as reference)
    this.TOOL_PLUS.bind( "click", this, this.plusAction );
    
    // Binds the submit event
    this.TOOL_SEND.bind( "click", this, this.submitAction );
};



/**
 * Handles submit event of the tool.
 * 
 * @param DBForgeTool dbforge 
 *      This is a reference to the main DBForgeTool instance
 */
DBForgeTool.prototype.submitAction = function( dbforge ) 
{
    // Retrieve main class object from data
    dbforge = dbforge.data;
    
    // If debug mode is on
    if ( dbforge.DEBUG_MODE !== false ) {
        // Pull content from the form
        var contents = dbforge.TOOL_FORM.serializeArray();
        
        // Building the output
        contents = dbforge.serializeOutput( contents );
        
        console.log( contents );
        
        // Set content of textarea
        dbforge.TOOL_OUTPUT.html( contents );
    } else {
        
    }
};



/**
 * Handles the "add field" event.
 * 
 * @param DBForgeTool dbforge 
 *      This is a reference to the main DBForgeTool instance
 */
DBForgeTool.prototype.plusAction = function( dbforge ) 
{
    // Retrieve main class object from data
    dbforge = dbforge.data;
    
    // Generate field
    field = dbforge.fieldMaker();
    
    // Append field
    dbforge.TOOL_LIST.append( field );
};



/**
 * 
 * @param 
 */
DBForgeTool.prototype.serializeOutput = function( data ) 
{
    /**
     * Return array.
     * 
     * @var array 
     */
    var returnData = {};
    
    /**
     * Current node iterating.
     * 
     * @var string 
     */
    var currentItem;
    
    // Looping through data
    for ( i in data ) {
        // Extracting the name and values
        var currName = data[i].name;
        var currVals = data[i].value;
        
        // If the value isn't empty
        if ( currVals !== '' ) {
            // If the current field is title
            if ( currName == 'title' ) {
                // Defines current item as the value (title of the field)
                currentItem = currVals.replace( /(\s)/g, '_' ).toLowerCase();
                
                // Create new object for the field
                returnData[currentItem] = {};
            } else {
                // Is current item set?
                if ( currentItem !== undefined ) {
                    // Add value to the current field
                    if ( currVals == "true" || currVals == "false" ) {
                        returnData[currentItem][currName] = ( currVals == "true" ) 
                                                        ? true : false;
                    } else {
                        returnData[currentItem][currName] = currVals;
                    }
                }
            }
        } else {
            // Clears current item, if field is title
            if ( currName == 'title' ) currentItem = undefined;
        }
    }
    
    // Return data
    return JSON.stringify( returnData );
};



/**
 * Generates a field for the array.
 */
DBForgeTool.prototype.fieldMaker = function() 
{
    // Declaring all variables
    var _field, _class, _handl, _title, _param, _remove;
    
    // Init field
    _field = $( '<li/>' );
    
    // Define class
    _field.addClass( new Date().getTime() );
    
    // Build the Handles
    _handl = $( '<span/>' ).addClass( 'dbforge-handle' ).html( '&udarr;' );
    
    // Build the field title field
    _title = $( '<input/>' ).attr( {
        type:           "text", 
        name:           "title", 
        placeholder:    "Field Name"
    } );
    
    // Generate main remove field button
    _remove = $( '<button/>' ).addClass( 'dbforge-delete' ).attr( {
        type: 'button'
    } ).html( '&times;' );
    
    // Building the "sublist"
    _param = $( '<ul/>' );
    
    // Building the list items
    for ( i in this.TYPE_LIST ) {
        // Declarando todas as variáveis
        var _name, _item, _temp, _span, _btns;
        
        // Define field name
        _name = i;
        
        // Creates list item
        _item = $( '<li/>' );
        
        // Make visible name
        _span = _name.charAt( 0 ).toUpperCase() + _name.slice( 1 );
        
        // If the name isn't "type", generate a remove field button
        if ( _name != 'type' ) {
            _btns = $( '<button/>' ).addClass( 'dbforge-subs-delete' ).attr( {
                type: 'button'
            } ).html( '-' );
        }
        
        // Building field types
        switch ( _name ) {
            case 'default': 
            case 'constraint': 
                // Build input field
                _temp = $( '<input/>' ).attr( {
                    type:           'text', 
                    name:           _name, 
                    placeholder:    ( _name == 'default' ) 
                                    ? 'Default value...' : '0, 1, 2, ...'
                } );
                break;
            default:
                _temp = $( '<select/>' ).attr( {
                    name:           _name
                } );
                
                // Temporary option values
                var _tempOpts, 
                    _k, 
                    _v;
                
                // Building options
                for ( j in this.TYPE_LIST[i] ) {
                    // Builds the option
                    _tempOpts = $( '<option/>' );
                    
                    // If value is boolean...
                    if ( typeof( this.TYPE_LIST[i][j] ) == 'boolean' ) {
                        // Define key
                        _k = ( this.TYPE_LIST[i][j] === true ) ? 'TRUE' : 'FALSE';
                        // Define value
                        _v = this.TYPE_LIST[i][j];
                    } else {
                        // Define key and value
                        _k = _v = this.TYPE_LIST[i][j].trim().toUpperCase();
                    }
                
                    // Add attributes and value to the option
                    _tempOpts.attr( 'value', _v ).html( _k );
                    
                    // Add option to the field
                    _temp.append( _tempOpts );
                }
                break;
        }
        
        // Adds everything
        _item.append( _span, _temp );
        
        // If button isn't undefined, add
        if ( _btns != undefined ) {
            // Append
            _item.append( _btns );
            
            // Binding remove item action
            _btns.bind( "click", _item, function( item_data ) {
                // References item data
                item_data = item_data.data;
                
                // Removes
                item_data.remove();
            } );
        }
        
        // Adds item to the params list
        _param.append( _item );
    }
    
    // Adding everything to the field
    _field.append( _handl, _remove, _title, _param );
    
    // Binds remove field action into button
    _remove.bind( "click", _field, function( item_data ) {
        // References item data
        item_data = item_data.data;
        
        // Removes field
        item_data.remove();
    } );
    
    // Return
    return _field;
};
