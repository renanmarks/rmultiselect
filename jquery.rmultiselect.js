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

        $(this).each(function (i,e) {
            var $this = $(e);

            /* The hidden select witch will be sent by POST */
            var selectedPOST = $this.clone();

        /* The action buttons */
        var add = $('<button type="button" />').addClass('btn add').css('width', '30px !important').html('<i class="icon-chevron-right"></i>');
        var addAll = $('<button type="button" />').addClass('btn addAll').css('width', '30px !important').html('<i class="icon-forward"></i>');
        var remove = $('<button type="button" />').addClass('btn remove').css('width', '30px !important').html('<i class="icon-chevron-left"></i>');
        var removeAll = $('<button type="button" />').addClass('btn removeAll').css('width', '30px !important').html('<i class="icon-backward"></i>');

            /* The multiselects */
            var notSelectedElement = $('<select name="#" multiple="multiple" />')
            .append(selectedPOST.children(':not(:selected)').clone());

            var selectedElement = $('<select name="#" multiple="multiple" />')
            .append(selectedPOST.children(':selected').clone());

            var notSelectedSearchElement = $('<div class="search"> <input type="text" /> </div>');
            var selectedSearchElement = $('<div class="search"> <input type="text" /> </div>');

            /* The sub containers */
            var notSelectedContainer = $('<div/>').addClass('notSelected');
            var selectedContainer = $('<div/>').addClass('selected');
            var buttonContainer = $('<div/>').addClass('buttons');

            /* Assemble everything up */
            buttonContainer.append(add).append(addAll).append(removeAll).append(remove);

            notSelectedContainer.append('<div class="header">' + opts.NotSelectedTitle + '</div>')
            //.append(notSelectedSearchElement)
            .append(notSelectedElement);

            selectedContainer.append('<div class="header">' + opts.SelectedTitle + '</div>')
            //.append(selectedSearchElement)
            .append(selectedElement);

            /* Create the main container */
            var container = $('<div/>').addClass('rmultiselect');

            if (opts.Title != '')
                container.append('<div class="header">' + opts.Title + '</div>');

            /* Generate the main container */
            container.append(notSelectedContainer).append(buttonContainer).append(selectedContainer).append($(selectedPOST).hide());

            /* Put the new widget in the place of the old multiselect */
            $this.replaceWith(container);

            /**** Actions to search an item ****/
            $('input', notSelectedSearchElement).keyup(function (event) {
                if (event.which == 13) {
                    return false;
                }

                if ($(this).val().length == 0) {
                    $(notSelectedElement).children().show();
                } else {
                    var query = ":contains('" + $(this).val() + "')";
                    $(notSelectedElement).children().not(query).hide();
                    $(notSelectedElement).children(query).show();
                }
            });

            $('input', selectedSearchElement).keyup(function (event) {
                if (event.which == 13) {
                    return false;
                }

                if ($(this).val().length == 0) {
                    $(selectedElement).children().show();
                } else {
                    var query = ":contains('" + $(this).val() + "')";
                    $(selectedElement).children().not(query).hide();
                    $(selectedElement).children(query).show();
                }
            });

            /**** Actions to (de)select items in the visible and hidden multiselects ****/
            remove.click(function () {
                var selectedItems = selectedElement.children(':selected');
                notSelectedElement.append($(selectedItems));

                selectedItems.each(function (i) {
                    var value = $(selectedItems[i]).attr('value');
                    selectedPOST.children('option[value="' + value + '"]').attr('selected', false);
                });
            });

            add.click(function () {
                var notSelectedItems = notSelectedElement.children(':selected');
                selectedElement.append($(notSelectedItems));

                notSelectedItems.each(function (i) {
                    var value = $(notSelectedItems[i]).attr('value');
                    selectedPOST.children('option[value="' + value + '"]').attr('selected', true);
                });
            });

            removeAll.click(function () {
                notSelectedElement.append(selectedElement.children());

                selectedPOST.children(':selected').attr('selected', false);
                selectedElement.empty();
            });

            addAll.click(function () {
                selectedElement.append(notSelectedElement.children());

                selectedPOST.children(':not(:selected)').attr('selected', true);
                notSelectedElement.empty();
            });
        });
    }
})(jQuery);

