/**
 * DBFORGE TOOL : Helper/Blueprints
 * ======================================================================
 * Helper class for Blueprint creation, handling and field management.
 *
 * This is a static class!
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import libraries
import MD5 from "crypto-js/md5";

// Main helper class
export default class Blueprints {
    /**
     * Returns a list of all the available data types used for columns.
     *
     * @return {array}
     */
    static dataTypeList() {
        return [
            "INT",
            "VARCHAR",
            "TEXT",
            "REAL",
            "FLOAT",
            "DECIMAL",
            "BLOB",
            "BOOLEAN",
            "DATETIME"
        ];
    }
    
    /**
     * Generates a unique ID.
     *
     * @return {string}
     */
    static generateID() {
        // Get current RFC date
        let date = new Date().toISOString();
        
        // Create and format the hash, for returning
        let hash = MD5(date + "_DBFORGE").toString();
        return hash.replace(
            /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
            "$1-$2-$3-$4-$5"
        );
    }
    
    /**
     * Returns an empty, blank blueprint.
     *
     * @return {object}
     */
    static generateBlankBlueprint() {
        // Create a blank blueprint
        let blueprint_data = {
            id: this.generateID(),
            name: "",
            info: "",
            columns: [],
            date: new Date().toISOString()
        };
        return blueprint_data;
    }
    
    /**
     * Returns an empty, blank column item.
     *
     * @return {object}
     */
    static generateBlankColumn() {
        // All columns are, by default, VARCHAR(255)
        let column_data = {
            name: "",
            type: "VARCHAR",
            constraint: 255,
            unsigned: false,
            auto_increment: false,
            null: false,
            unique: false,
            default: null,
            meta: {
                label: "",
                description: "",
                placeholder: "",
                required: false,
                edit: false,
                is_primary: false,
                user_input: true
            }
        };
        return column_data;
    }
}
