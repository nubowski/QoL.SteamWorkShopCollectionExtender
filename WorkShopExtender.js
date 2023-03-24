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

