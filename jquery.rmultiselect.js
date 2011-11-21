/// <reference path="jquery-1.7-vsdoc.js" />
/*
* jQuery RMultiSelect
*
* Copyright 2011, Renan A. Marks
* Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function ($) {
    $.fn.RMultiSelect = function (options) {
        var defaults = {
            Title: 'Please choose some items',
            NotSelectedTitle: 'Items',
            SelectedTitle: 'Selected Items'
        };
        var opts = $.extend(defaults, options);

        var $this = $(this);

        /* The hidden select witch will be sent by POST */
        var selectedPOST = $this.clone();

        /* The action buttons */
        var add = $('<button type="button" />').addClass('button add').html('&gt;');
        var addAll = $('<button type="button" />').addClass('button addAll').html('&gt;&gt;');
        var remove = $('<button type="button" />').addClass('button remove').html('&lt;');
        var removeAll = $('<button type="button" />').addClass('button removeAll').html('&lt;&lt;');
        
        /* The multiselects */
        var notSelectedElement = $('<select name="#" multiple="multiple" />')
            .append(selectedPOST.children(':not(:selected)').clone());

        var selectedElement = $('<select name="#" multiple="multiple" />')
            .append(selectedPOST.children(':selected').clone());

        /* The sub containers */
        var notSelectedContainer = $('<div class="notSelected" />');
        var selectedContainer = $('<div class="selected" />');
        var buttonContainer = $('<div/>').addClass('buttons');

        /* Assemble everything up */
        buttonContainer.append(add).append(addAll).append(removeAll).append(remove);
        notSelectedContainer.append('<div class="header">' + opts.NotSelectedTitle + '</div>').append(notSelectedElement);
        selectedContainer.append('<div class="header">' + opts.SelectedTitle + '</div>').append(selectedElement);

        /* Create the main container */
        var container = $('<div class="rmultiselect" />');

        if (opts.Title != '')
            container.append('<div class="header">'+ opts.Title +'</div>');

        /* Generate the main container */
        container.append(notSelectedContainer).append(buttonContainer).append(selectedContainer).append($(selectedPOST).hide());

        /* Put the new widget in the place of the old multiselect */
        $this.replaceWith(container);

        /**** Actions to (de)select items in the visible and hidden multiselects ****/
        remove.click(function () {
            console.log('remove');
            var selectedItems = selectedElement.children(':selected');
            notSelectedElement.append($(selectedItems));

            selectedItems.each(function (i) {
                var value = $(selectedItems[i]).attr('value');
                selectedPOST.children('option[value="' + value + '"]').attr('selected', false);
            });
        });

        add.click(function () {
            console.log('add');
            var notSelectedItems = notSelectedElement.children(':selected');
            selectedElement.append($(notSelectedItems));

            notSelectedItems.each(function (i) {
                var value = $(notSelectedItems[i]).attr('value');
                selectedPOST.children('option[value="' + value + '"]').attr('selected', true);
            });
        });

        removeAll.click(function () {
            console.log('removeAll');
            notSelectedElement.append(selectedElement.children());

            selectedPOST.children(':selected').attr('selected', false);
            selectedElement.empty();
        });

        addAll.click(function () {
            console.log('addAll');
            selectedElement.append(notSelectedElement.children());

            selectedPOST.children(':not(:selected)').attr('selected', true);
            notSelectedElement.empty();
        });
    }
})(jQuery);
