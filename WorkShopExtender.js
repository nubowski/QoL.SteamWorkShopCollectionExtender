function createButton(id, symbol, positionRight) {
    const button = document.createElement('button');
    button.setAttribute('id', id);
    button.innerHTML = symbol;
    button.style.cssText = `
        position: absolute;
        top: 110px;
        right: ${positionRight}px;
        border-radius: 5px;
        color: white;
        font-size: 50px;
        width: 80px;
        height: 80px;
        text-decoration: none;
    `;
    return button;
}

function addToCollection(data, object) {
    jQuery.ajax({
        type: 'POST',
        url: 'https://steamcommunity.com/sharedfiles/addchild',
        data: data,
        success: function (response) {
            if (object && response.success == 1) {
                object.addClass('inCollection');
            }
        },
    });
}

setTimeout(function () {
    const collectionWindow = document.querySelector('div.collectionAddItemsSection');
    const addButton = createButton('ASCM_addall', '✓', 60);
    const removeButton = createButton('ASCM_removeall', '⚠', 150);

    addButton.style.background = '#002f06';
    removeButton.style.background = '#7e1a1a';

    collectionWindow.insertBefore(addButton, collectionWindow.firstChild);
    collectionWindow.insertBefore(removeButton, collectionWindow.firstChild);

    // Bind "Add" button
    jQuery('button#ASCM_addall').click(function () {
        const items = [];
        const collectionName = jQuery('div.manageCollectionHeader div.breadcrumbs a').eq(2).text().trim();
        const url = new URL(document.location.href);
        const collectionId = url.searchParams.get('id');

        jQuery('div#MySubscribedItems div.itemChoice:not(.inCollection)').each(function () {
            const data = {
                id: collectionId,
                sessionid: window.g_sessionID,
                childid: jQuery(this).attr('id').replace('choice_MySubscribedItems_', ''),
                activeSection: collectionName,
            };
            addToCollection(data, jQuery(this));
        });
    });

    // Bind "Remove" button
    jQuery('button#ASCM_removeall').click(function () {
        jQuery('div#MySubscribedItems div.itemChoice.inCollection').each(function () {
            window.RemoveChildFromCollection(jQuery(this).attr('id').replace('choice_MySubscribedItems_', ''));
        });
    });
}, 0);