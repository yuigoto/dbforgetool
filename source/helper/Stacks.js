/**
 * DBFORGE TOOL : Helper/Stacks
 * ======================================================================
 * Helper class for managing the local storage.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Main Class
export default class Stacks {
    /**
     * Constructor.
     *
     * @param {string} name
     *      Name for the local storage position where the blueprint data will
     *      be stored
     */
    constructor(name) {
        // Check name
        this.storage = name || "dbforge_stack";
        
        // Bootstrapping storage
        let load = localStorage.getItem(this.storage);
        
        // Bootstrapping database data
        if (load) {
            // Set this database as the local storage content
            this.database = JSON.parse(load);
        } else {
            // Database is empty
            this.database = [];
            
            // Set empty space
            localStorage.setItem(this.storage, JSON.stringify(this.database));
        }
    }
    
    /**
     * Returns all the available blueprints.
     *
     * @param {boolean} by_date
     *      Optional, set to TRUE if you'd like to sort by Date, in descending
     *      order
     * @returns {array}
     */
    browse(by_date) {
        // Sorting
        if (this.database.length > 0) {
            if (true === by_date) {
                this.database.sort(this.sortByDate);
            } else {
                this.database.sort(this.sortByName);
            }
        }
        
        // Return
        return this.database;
    }
    
    /**
     * Returns a single entry from the storage.
     *
     * @param {string} id
     *      The item ID
     * @return {object}
     */
    select(id) {
        // Loop through all entries
        for (var i in this.database) {
            // Alias
            let item = this.database[i];
            
            // Returning
            if (item.id == id) return item;
        }
        return false;
    }
    
    /**
     * Adds an item to the database.
     *
     * @param {object} data
     *      Blueprint to be added to the database
     * @returns {boolean}
     */
    create(data) {
        // Only save if data has the ID attribute
        if (!data.id) {
            return false;
        } else {
            // Push into the database
            this.database.push(data);
            
            // Update local storage
            this.updateStorage();
        }
    }
    
    /**
     * Updates an entry in the database. The whole blueprint must be declared
     * in the `data` parameter, as this method overwrites entries.
     *
     * @param {object} data
     *      Object to be updated into the database
     * @returns {boolean}
     */
    update(data) {
        // Loop through all entries
        for (var i in this.database) {
            // Alias
            let item = this.database[i];
            
            if (item.id == data.id) {
                // Update database
                this.database[i] = data;
                
                // Update storage
                this.updateStorage();
                
                return true;
            }
        }
        // As a fallback, add the item to storage
        return this.create(data);
    }
    
    /**
     * Removes an entry from the database.
     *
     * @param {string} id
     *      Entry ID
     * @returns {boolean}
     */
    remove(id) {
        // Loop through all entries
        for (var i in this.database) {
            // Alias
            let item = this.database[i];
            
            // ID found, remove
            if (id == item.id) {
                // Splice the array
                this.database.splice(i, 1);
    
                // Update storage
                this.updateStorage();
    
                return true;
            }
        }
        return false;
    }
    
    /**
     * Exports the desired blueprint to a file, using the table name as the
     * file name.
     *
     * Files exported are JSON files with the `.dbforge` extension.
     *
     * @param {object} data
     *      Blueprint data (filtered)
     */
    makeFile(data) {
        // Set exported file name and extension
        let file_name = data.blueprint.name || "dummy";
        let file_extn = ".dbforge";
        
        // Create file blob
        const blob = new Blob(
            [JSON.stringify(data.blueprint)],
            {type: "text/text"}
        );
        
        // Checking IE10 specific methods
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // It's IE10, Congratulations! (Not really)
            window.navigator.msSaveOrOpenBlob(blob, file_name + file_extn);
        } else {
            // Create an event for a temporary anchor element
            let trig = document.createEvent("MouseEvents");
            let link = document.createElement("a");
            
            // Set download properties
            link.download = file_name + file_extn;
            link.href = window.URL.createObjectURL(blob);
            link.dataset.downloadurl = [
                "text/json",
                link.download,
                link.href
            ].join(":");
            
            // Set and dispatch event
            trig.initEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            link.dispatchEvent(trig);
        }
    }
    
    /**
     * Fires the file exporter.
     *
     * @param {string} id
     *      Blueprint ID
     * @returns {boolean}
     */
    saveFile(id) {
        // Loop through all entries
        for (var i in this.database) {
            // Alias
            let item = this.database[i];
            
            if (item.id == id) {
                // Make file
                this.makeFile(item);
                
                // Return OK
                return true;
            }
        }
        return false;
    }
    
    /**
     * Callback used to sort blueprints by name.
     *
     * @param {object} a
     *      Element A, for comparison
     * @param {object} b
     *      Element B, for comparison
     * @returns {number}
     */
    sortByName(a, b) {
        // Set values
        let val1 = a.blueprint.name.toLowerCase();
        let val2 = b.blueprint.name.toLowerCase();
        
        // Returning
        if (val1 < val2) return -1;
        if (val1 > val2) return 1;
        return 0;
    }
    
    /**
     * Callback used to sort blueprints by date, in descending order.
     *
     * @param {object} a
     *      Element A, for comparison
     * @param {object} b
     *      Element B, for comparison
     * @returns {number}
     */
    sortByDate(a, b) {
        // Set values
        let val1 = a.date;
        let val2 = b.date;
    
        // Returning
        if (val1 > val2) return -1;
        if (val1 < val2) return 1;
        return 0;
    }
    
    /**
     * Saves the current state of the database to localStorage.
     */
    updateStorage() {
        // Sort by Date on storage
        this.database.sort(this.sortByDate);
        
        // Save to local storage
        localStorage.setItem(this.storage, JSON.stringify(this.database));
    }
}
